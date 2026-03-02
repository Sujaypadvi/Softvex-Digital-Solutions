# Softvex Backend - Google Sheets & Email Integration

This backend handles contact form submissions by:
1. Saving to Firestore
2. Appending to Google Sheets
3. Sending email notifications via Zoho

## Prerequisites

- Node.js 18+
- Firebase CLI: `npm install -g firebase-tools`
- Google Cloud Project with Sheets API enabled
- Service Account with Google Sheets write permissions
- Zoho email account with SMTP access

## Environment Setup

### 1. Configure Firebase Project

```bash
# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init

# Select:
# - Functions (with TypeScript)
# - Hosting
# - Use existing project or create new one
```

### 2. Set Environment Variables

Firebase Functions use environment configuration. Set these in the Firebase console or via CLI:

```bash
# Navigate to backend folder
cd backend

# Set Google Sheets credentials
firebase functions:config:set \
  google.service_account_email="softvex-sheet-writer@softvex.iam.gserviceaccount.com" \
  google.private_key="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n" \
  google.sheet_id="1-wjQoAVgqNKQw-dYM0IIYajlNUC_UhTCeaAUwjTQICA"

# Set email credentials
firebase functions:config:set \
  email.host="smtp.zoho.in" \
  email.port="587" \
  email.secure="false" \
  email.user="info@softvex.in" \
  email.pass="Czvx05d6bAMU" \
  email.to="info@softvex.in"
```

**Alternative: Local Development with .env**

For local testing, the `.env` file in the project root is already configured. The Cloud Function will need to access these via `functions.config()` in production.

### 3. Install Dependencies

```bash
cd backend
npm install
```

## Google Sheets Setup

### 1. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Rename it to "Softvex Contact Submissions"
4. Note the Sheet ID from URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`

### 2. Share with Service Account

1. Open the Google Sheet
2. Click "Share" button
3. Add the service account email: `softvex-sheet-writer@softvex.iam.gserviceaccount.com`
4. Give "Editor" permissions
5. Uncheck "Notify people" and click "Share"

### 3. Set Up Headers (Optional)

Add these headers to Row 1 of Sheet1:
```
Timestamp | Name | Email | Phone | Service | Message
```

## Local Development

### Build and Test Locally

```bash
cd backend

# Build TypeScript
npm run build

# Start Firebase emulators
npm run serve

# In another terminal, test the function
firebase functions:shell
```

### Test the Cloud Function

```javascript
// In Firebase shell:
submitContactForm({
  name: "Test User",
  email: "test@example.com",
  phone: "1234567890",
  service: "web-dev",
  message: "This is a test message"
})
```

## Deployment

### Deploy Functions Only

```bash
# From project root
firebase deploy --only functions
```

### Deploy Everything (Functions + Hosting)

```bash
# Build frontend first
npm run build

# Deploy all
firebase deploy
```

## Frontend Integration

The frontend `firebase.ts` has been updated to call the Cloud Function:

```typescript
const result = await submitContactForm(formData);
// Automatically saves to Firestore, Google Sheets, and sends email
```

## Troubleshooting

### Issue: "Failed to process contact form"

**Cause**: Missing environment variables

**Solution**: Check Firebase Functions config
```bash
firebase functions:config:get
```

### Issue: "Google Sheets authentication failed"

**Cause**: Service account not shared with Sheet

**Solution**: 
1. Verify service account email in Firebase console
2. Share the Google Sheet with the service account
3. Ensure Sheets API is enabled in Google Cloud Console

### Issue: "Email sending failed"

**Cause**: Incorrect SMTP credentials

**Solution**:
1. Verify Zoho credentials
2. Enable "Allow less secure apps" in Zoho (if required)
3. Check SMTP settings: `smtp.zoho.in:587`

### Issue: "CORS error when calling function"

**Cause**: Function not deployed or wrong region

**Solution**:
```bash
# Ensure functions are deployed
firebase deploy --only functions

# Check your Firebase config in firebase.ts matches your project
```

## Monitoring

### View Logs

```bash
# Real-time logs
firebase functions:log

# Specific function logs
firebase functions:log --only submitContactForm
```

### View in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to Functions
4. Click on `submitContactForm` to view metrics and logs

## Cost Estimates

- **Firebase Functions**: Free tier includes 2M invocations/month
- **Firestore**: Free tier includes 50K reads, 20K writes per day
- **Google Sheets API**: Free (no quota for service accounts with proper sharing)
- **Email**: Limited by Zoho plan (typically 250 emails/day for free tier)

## Security Notes

- ✅ Environment variables stored securely in Firebase Functions config
- ✅ Service account with minimal permissions (Sheets only)
- ✅ Email credentials not exposed to frontend
- ⚠️ Add CAPTCHA to prevent spam (recommendation)
- ⚠️ Implement rate limiting in production

## Support

For issues, check:
1. Firebase Functions logs: `firebase functions:log`
2. Browser console for frontend errors
3. Firestore console to verify data storage
4. Google Sheet to verify data appending

## File Structure

```
backend/
├── src/
│   └── index.ts          # Main Cloud Function
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
└── .gitignore           # Ignore build artifacts

Project Root:
├── .env                  # Local environment variables (not committed)
├── .env.example          # Template for environment variables
├── firebase.json         # Firebase configuration
└── .firebaserc          # Firebase project alias
```
