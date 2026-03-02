# Deploy to Firebase FREE + Custom Domain

Complete guide to deploy your Softvex website **100% FREE** with your own domain name.

## Overview

- **Frontend**: Firebase Hosting (FREE) + your custom domain
- **Backend**: Render.com (FREE, no credit card needed)
- **Total Cost**: $0

---

## Part 1: Deploy Backend to Render.com (10 minutes)

### Step 1: Create Render Account

1. Go to **https://render.com**
2. Click **"Get Started"**
3. Sign up with GitHub (recommended) or email
4. No credit card required! ✓

### Step 2: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Click **"Build and deploy from a Git repository"**
3. Connect your GitHub account
4. If you haven't pushed to GitHub yet, do this first:

```powershell
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Create a new repo on GitHub.com
# Then push:
git remote add origin https://github.com/YOUR-USERNAME/softvex.git
git branch -M main
git push -u origin main
```

5. Select your **softvex** repository
6. Click **"Connect"**

### Step 3: Configure Web Service

**Settings:**
- **Name**: `softvex-backend` (or your choice)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `node lib/server.js`

> **Important**: We need to update the backend start command file first!

### Step 4: Add Environment Variables on Render

Click **"Advanced"** → **"Add Environment Variable"**

Add all these from your `.env` file:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-value-here
GOOGLE_PRIVATE_KEY=your-value-here
GOOGLE_SHEET_ID=your-value-here
EMAIL_HOST=smtp.zoho.in
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email
EMAIL_PASS=your-password
EMAIL_TO=your-email
NODE_ENV=production
```

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait 2-5 minutes for deployment
3. You'll get a URL like: `https://softvex-backend.onrender.com`
4. **Copy this URL** - you'll need it!

---

## Part 2: Deploy Frontend to Firebase Hosting (10 minutes)

### Step 1: Create Firebase Project

1. Go to **https://console.firebase.google.com/**
2. Click **"Create a project"**
3. Project name: `softvex` (or your choice)
4. **Disable Google Analytics** (not needed, speeds up setup)
5. Click **"Create Project"**
6. **Copy your Project ID** from the URL

### Step 2: Enable Firebase Hosting

1. In Firebase Console, click **"Hosting"** in left menu
2. Click **"Get started"**
3. Click through the wizard (we'll set up via CLI)

### Step 3: Configure Local Project

#### Update `.firebaserc`:

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

#### Update `.env.production`:

Replace with your Render backend URL:

```env
VITE_API_ENDPOINT=https://softvex-backend.onrender.com/api/contact
VITE_ENV=production
```

#### Update `firebase.ts`:

Get your Firebase config:
1. In Firebase Console → ⚙️ (Settings) → "Your apps"
2. Click `</>` to add web app
3. Register app, copy the config

Replace lines 12-19 in `firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 4: Build and Deploy

```powershell
# Link Firebase project
firebase use your-project-id

# Build frontend
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

You'll get a URL like: `https://your-project-id.web.app`

---

## Part 3: Connect Your Custom Domain (15 minutes)

### Step 1: Add Domain in Firebase

1. Go to Firebase Console → **Hosting**
2. Click **"Add custom domain"**
3. Enter your domain: `softvex.in` (or `www.softvex.in`)
4. Click **"Continue"**

### Step 2: Verify Domain Ownership

Firebase will show a TXT record. You need to add this to your domain's DNS:

**Example:**
```
Type: TXT
Name: @
Value: firebase=your-project-id
```

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find **DNS Settings** or **DNS Management**
3. Add the TXT record Firebase provided
4. Click **"Verify"** in Firebase Console

⏱️ DNS propagation can take 5-60 minutes

### Step 3: Add A Records

Once verified, Firebase will show you A records:

```
Type: A
Name: @
Value: 151.101.1.195

Type: A
Name: @
Value: 151.101.65.195
```

Add both A records to your DNS settings.

**For www subdomain**, also add:

```
Type: A
Name: www
Value: 151.101.1.195

Type: A
Name: www
Value: 151.101.65.195
```

### Step 4: Wait for SSL Certificate

- Firebase automatically provisions a **free SSL certificate**
- This can take 24 hours (usually faster)
- You'll get an email when it's ready
- Your site will be live at: `https://softvex.in`

---

## Part 4: Update Backend for Production (5 minutes)

We need to compile the Express server properly for Render.

### Update `backend/package.json` scripts:

```json
"scripts": {
  "build": "tsc",
  "dev": "ts-node src/server.ts",
  "start": "node lib/server.js",
  "serve": "npm run build && firebase emulators:start --only functions",
  "deploy": "firebase deploy --only functions"
}
```

### Create `backend/src/server-prod.ts`:

This is the production entry point for Render:

```typescript
import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: [
    'https://your-project-id.web.app',
    'https://your-project-id.firebaseapp.com',
    'https://softvex.in',
    'https://www.softvex.in',
    'http://localhost:3000'
  ]
}));
app.use(express.json());

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend server running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const data: ContactFormData = req.body;
        const timestamp = new Date().toISOString();
        const formData = { ...data, timestamp };

        console.log('Processing contact form:', formData);

        await saveToGoogleSheets(formData);
        await sendEmailNotification(formData);

        res.json({
            success: true,
            message: 'Contact form submitted successfully',
        });
    } catch (error: any) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to process contact form',
        });
    }
});

async function saveToGoogleSheets(data: ContactFormData & { timestamp: string }) {
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!serviceAccountEmail || !privateKey || !sheetId) {
        throw new Error('Google Sheets configuration incomplete');
    }

    const auth = new google.auth.JWT({
        email: serviceAccountEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'Contact Form!A:F',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[
                data.timestamp,
                data.name,
                data.email,
                data.phone,
                data.service,
                data.message,
            ]],
        },
    });
}

async function sendEmailNotification(data: ContactFormData & { timestamp: string }) {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const serviceNames: Record<string, string> = {
        'web-dev': 'Web Development',
        'app-dev': 'App Development',
        'crm-erp': 'CRM / ERP Solutions',
        'digital-marketing': 'Digital Marketing',
    };

    await transporter.sendMail({
        from: `"Softvex Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `New Contact: ${data.name}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Service:</strong> ${serviceNames[data.service] || data.service}</p>
            <p><strong>Message:</strong> ${data.message}</p>
            <p><strong>Time:</strong> ${data.timestamp}</p>
        `,
    });
}

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
```

### Push to GitHub:

```powershell
git add .
git commit -m "Add production backend server"
git push
```

Render will auto-deploy your updated backend!

---

## Testing Your Deployment

### 1. Test Backend
Visit: `https://softvex-backend.onrender.com/health`
Should see: `{"status":"ok","message":"Backend server running"}`

### 2. Test Frontend
Visit: `https://your-project-id.web.app`
Fill out contact form and submit

### 3. Test Custom Domain
Once DNS propagates: `https://softvex.in`

### 4. Verify Integrations
- Check Google Sheets for new entry
- Check Zoho email for notification

---

## Costs Summary 💰

| Service | Plan | Cost |
|---------|------|------|
| Firebase Hosting | Spark (Free) | $0 |
| Render.com | Free | $0 |
| Custom Domain SSL | Firebase (Free) | $0 |
| **Total** | | **$0/month** |

---

## Troubleshooting

**Backend takes time to respond?**
- Render free tier has "cold starts" (sleeps after inactivity)
- First request after sleep takes ~30 seconds
- Upgrade to $7/mo for always-on (optional)

**DNS not propagating?**
- Wait 24-48 hours
- Use https://dnschecker.org to check status

**CORS errors?**
- Make sure `server-prod.ts` includes your custom domain in CORS origins

---

## Next Steps

1. Create Render account and deploy backend
2. Create Firebase project and deploy frontend
3. Add custom domain in Firebase
4. Update DNS records at your registrar
5. Test everything!

**Your site will be live at your custom domain, 100% free!** 🎉
