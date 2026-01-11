# Deploy to Vercel - Complete Guide

Deploy your entire Softvex application (frontend + backend) to Vercel **100% FREE** with custom domain support.

## Why Vercel?

✅ Frontend + Backend in one place
✅ 100% Free (Hobby plan)
✅ Custom domain + FREE SSL
✅ Automatic deployments from Git
✅ No credit card required
✅ Serverless functions (no server management)

---

## Prerequisites

- GitHub account
- Vercel account (free)
- Your custom domain (optional)

**Total deployment time: ~15 minutes**

---

## Step 1: Prepare Backend for Vercel (5 minutes)

Vercel uses serverless functions instead of Express server. Let's convert your backend.

### Create API route for Vercel

Create this file: `api/contact.ts`

```typescript
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const data: ContactFormData = req.body;
        const timestamp = new Date().toISOString();
        const formData = { ...data, timestamp };

        console.log('Processing contact form:', formData);

        // Save to Google Sheets
        await saveToGoogleSheets(formData);
        
        // Send email notification
        await sendEmailNotification(formData);

        res.status(200).json({
            success: true,
            message: 'Contact form submitted successfully',
        });
    } catch (error: any) {
        console.error('Error processing contact form:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to process contact form',
        });
    }
}

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
        'app-dev': 'Mobile App Development',
        'crm-erp': 'CRM / ERP Solutions',
        'digital-marketing': 'Digital Marketing',
    };

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #dcfce7 0%, #e0f2fe 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #555; font-size: 12px; text-transform: uppercase; }
                .value { margin-top: 5px; color: #1a1a1a; font-size: 16px; }
                .message-box { background: #f9fafb; padding: 15px; border-left: 4px solid #22c55e; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚀 New Contact Form Submission</h1>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">Name</div>
                        <div class="value">${data.name}</div>
                    </div>
                    <div class="field">
                        <div class="label">Email</div>
                        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                    </div>
                    <div class="field">
                        <div class="label">Phone</div>
                        <div class="value">${data.phone || 'Not provided'}</div>
                    </div>
                    <div class="field">
                        <div class="label">Service</div>
                        <div class="value">${serviceNames[data.service] || data.service}</div>
                    </div>
                    <div class="field">
                        <div class="label">Message</div>
                        <div class="message-box">${data.message}</div>
                    </div>
                    <div class="field">
                        <div class="label">Timestamp</div>
                        <div class="value">${data.timestamp}</div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    await transporter.sendMail({
        from: `"Softvex Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `New Contact: ${data.name} - ${serviceNames[data.service]}`,
        html: htmlContent,
        text: `New Contact from ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${serviceNames[data.service]}\nMessage: ${data.message}`,
    });
}
```

### Create `vercel.json` configuration

Create this file in your **root directory**:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Install Vercel type definitions

```powershell
npm install --save-dev @vercel/node
```

### Update `firebase.ts`

Replace the `submitContactForm` function to use Vercel API:

```typescript
export const submitContactForm = async (data: any) => {
  try {
    // Use environment variable or default to Vercel API route
    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || '/api/contact';
    
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit form');
    }

    const result = await response.json();
    console.log("Contact form submitted successfully:", result);
    return result.id || 'success';
  } catch (e: any) {
    console.error("Error submitting contact form:", e);
    throw e;
  }
};
```

### Update `.env.production`

```env
# For Vercel, we use relative path since API is on same domain
VITE_API_ENDPOINT=/api/contact
VITE_ENV=production
```

### Commit changes

```powershell
git add .
git commit -m "Configure for Vercel deployment"
git push
```

---

## Step 2: Deploy to Vercel (5 minutes)

### Create Vercel Account

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Sign up with **GitHub** (recommended)
4. No credit card required!

### Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Select your **softvex** repository
4. Click **"Import"**

### Configure Project

Vercel will auto-detect Vite. Verify these settings:

- **Framework Preset**: Vite
- **Root Directory**: `./` (leave as root)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Add Environment Variables

Click **"Environment Variables"**

Add all these from your `.env` file:

| Name | Value |
|------|-------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | your-service-account@... |
| `GOOGLE_PRIVATE_KEY` | -----BEGIN PRIVATE KEY----- ... |
| `GOOGLE_SHEET_ID` | your-sheet-id |
| `EMAIL_HOST` | smtp.zoho.in |
| `EMAIL_PORT` | 587 |
| `EMAIL_SECURE` | false |
| `EMAIL_USER` | your-email@domain.com |
| `EMAIL_PASS` | your-password |
| `EMAIL_TO` | recipient@domain.com |

> **Tip**: For `GOOGLE_PRIVATE_KEY`, paste the entire key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

### Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. You'll get a URL like: `https://softvex.vercel.app`

🎉 **Your site is live!**

---

## Step 3: Add Custom Domain (5 minutes)

### Add Domain in Vercel

1. In your Vercel project, click **"Settings"**
2. Click **"Domains"** in sidebar
3. Enter your domain: `softvex.in`
4. Click **"Add"**

### Configure DNS

Vercel will show you which DNS records to add. Typically:

**For apex domain (`softvex.in`):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Update DNS at Your Registrar

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find **DNS Settings** / **DNS Management**
3. Add the A and CNAME records from Vercel
4. Save changes

### Verify Domain

1. Back in Vercel, click **"Verify"**
2. Wait for DNS propagation (5-60 minutes)
3. Vercel will automatically provision **FREE SSL certificate**

Once verified, your site will be live at:
- `https://softvex.in` ✓
- `https://www.softvex.in` ✓

---

## Step 4: Test Your Deployment (2 minutes)

### 1. Visit Your Site

Go to: `https://softvex.vercel.app` (or your custom domain)

### 2. Test Contact Form

1. Navigate to Contact page
2. Fill out the form
3. Submit

### 3. Verify Integrations

- ✅ Check Google Sheets for new entry
- ✅ Check your Zoho email for notification

### 4. Check Function Logs

In Vercel:
1. Go to your project
2. Click **"Deployments"** → Latest deployment
3. Click **"Functions"** tab
4. View logs for `/api/contact`

---

## Automatic Deployments

Every time you push to GitHub:
- ✅ Vercel automatically builds and deploys
- ✅ Preview deployments for pull requests
- ✅ Rollback to previous versions anytime

```powershell
# Make changes
git add .
git commit -m "Update homepage"
git push

# Vercel automatically deploys! 🚀
```

---

## Cost Breakdown 💰

| Feature | Vercel Free Plan |
|---------|------------------|
| Bandwidth | 100GB/month |
| Serverless Function Executions | 100GB-Hours |
| Build Time | 6000 minutes/month |
| Custom Domains | Unlimited |
| SSL Certificates | Free |
| **Total Cost** | **$0/month** |

Your contact form usage will easily fit in the free tier!

---

## Troubleshooting

### "Function timeout"
- Vercel free tier has 10s timeout for serverless functions
- Your email/sheets calls should complete in <5s
- If timeout occurs, optimize or upgrade to Pro ($20/mo)

### "Module not found"
- Make sure `googleapis` and `nodemailer` are in `dependencies` (not `devDependencies`)
- Check `package.json`

### CORS errors
- The API route includes CORS headers
- If issues persist, check browser console for specific error

### Environment variables not working
- Double-check spelling in Vercel dashboard
- Redeploy after adding/changing env vars
- View function logs in Vercel dashboard

---

## Comparing Deployment Options

| Feature | Vercel | Firebase + Render |
|---------|--------|-------------------|
| Setup Complexity | ⭐⭐⭐⭐⭐ Easiest | ⭐⭐⭐ Moderate |
| Frontend Hosting | ✅ Free | ✅ Free |
| Backend Hosting | ✅ Free Serverless | ✅ Free (with cold starts) |
| Custom Domain | ✅ Free | ✅ Free |
| Auto-Deployments | ✅ Yes | ⚠️ Render only |
| Edge Network | ✅ Global CDN | ✅ Firebase CDN |
| **Recommendation** | **Best for your use case** | Good alternative |

---

## Next Steps

1. ✅ Create Vercel account
2. ✅ Create `api/contact.ts` file
3. ✅ Create `vercel.json` file
4. ✅ Push to GitHub
5. ✅ Import project to Vercel
6. ✅ Add environment variables
7. ✅ Deploy
8. ✅ Add custom domain
9. ✅ Test everything

**Your professional website will be live on your custom domain in ~15 minutes!** 🎉

---

## Pro Tips

💡 **Use Vercel CLI for faster deployments:**
```powershell
npm i -g vercel
vercel login
vercel --prod
```

💡 **Preview deployments:**
Every branch gets a unique preview URL

💡 **Analytics:**
Enable Vercel Analytics (free) for visitor insights

💡 **Performance:**
Vercel automatically optimizes images and caching

**Happy deploying!** 🚀
