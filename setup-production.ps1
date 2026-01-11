# Softvex Production Setup Script
# Run this after creating your Firebase project

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Softvex Production Setup Wizard" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Get Firebase Project ID
Write-Host "Step 1: Firebase Project Configuration" -ForegroundColor Yellow
Write-Host "---------------------------------------"
Write-Host ""
Write-Host "Please create a Firebase project at: https://console.firebase.google.com/" -ForegroundColor Green
Write-Host "Then enter your Firebase Project ID below:" -ForegroundColor Green
Write-Host ""
$projectId = Read-Host "Enter Firebase Project ID"

if ([string]::IsNullOrWhiteSpace($projectId)) {
    Write-Host "Error: Project ID cannot be empty!" -ForegroundColor Red
    exit 1
}

# Update .firebaserc
Write-Host ""
Write-Host "Updating .firebaserc..." -ForegroundColor Cyan
@"
{
  "projects": {
    "default": "$projectId"
  }
}
"@ | Out-File -FilePath ".\.firebaserc" -Encoding UTF8
Write-Host "✓ Updated .firebaserc" -ForegroundColor Green

# Step 2: Set Firebase project
Write-Host ""
Write-Host "Step 2: Linking Firebase Project" -ForegroundColor Yellow
Write-Host "---------------------------------------"
firebase use $projectId

# Step 3: Get Firebase Config
Write-Host ""
Write-Host "Step 3: Firebase Web App Configuration" -ForegroundColor Yellow
Write-Host "---------------------------------------"
Write-Host ""
Write-Host "Go to Firebase Console > Project Settings > Your apps" -ForegroundColor Green
Write-Host "Copy your Firebase config values:" -ForegroundColor Green
Write-Host ""

$apiKey = Read-Host "API Key"
$authDomain = Read-Host "Auth Domain (e.g., your-project.firebaseapp.com)"
$storageBucket = Read-Host "Storage Bucket (e.g., your-project.appspot.com)"
$messagingSenderId = Read-Host "Messaging Sender ID"
$appId = Read-Host "App ID"

# Update firebase.ts
Write-Host ""
Write-Host "Updating firebase.ts..." -ForegroundColor Cyan
$firebaseConfig = @"
/// <reference types="vite/client" />

// This file assumes the environment has process.env.API_KEY or similar
// For this demo context, we'll implement a Mock Firestore wrapper 
// if real config isn't provided, to ensure functionality.

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'firestore/firestore';
import { getAuth } from 'firebase/auth';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "$apiKey",
  authDomain: "$authDomain",
  projectId: "$projectId",
  storageBucket: "$storageBucket",
  messagingSenderId: "$messagingSenderId",
  appId: "$appId"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Helper for contacting
export const submitContactForm = async (data: any) => {
  try {
    // Use environment variable for API endpoint
    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3001/api/contact';
    
    // Call the API
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

    // Fallback: Try to save to Firestore directly
    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        ...data,
        createdAt: Date.now()
      });
      console.log("Saved to Firestore as fallback");
      return docRef.id;
    } catch (firestoreError) {
      console.error("Firestore fallback failed:", firestoreError);

      // Final fallback: LocalStorage
      const submissions = JSON.parse(localStorage.getItem('softvex_contacts') || '[]');
      submissions.push({ ...data, id: Date.now().toString(), createdAt: Date.now() });
      localStorage.setItem('softvex_contacts', JSON.stringify(submissions));
      console.log("Saved to LocalStorage as final fallback");
      return "demo-id";
    }
  }
};

export const getContactSubmissions = async () => {
  try {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    // Fallback
    const submissions = JSON.parse(localStorage.getItem('softvex_contacts') || '[]');
    return submissions.reverse();
  }
};
"@

$firebaseConfig | Out-File -FilePath ".\firebase.ts" -Encoding UTF8
Write-Host "✓ Updated firebase.ts" -ForegroundColor Green

# Step 4: Configure Environment Variables
Write-Host ""
Write-Host "Step 4: Configuring Firebase Functions Environment" -ForegroundColor Yellow
Write-Host "---------------------------------------"
Write-Host ""
Write-Host "Setting up environment variables for Cloud Functions..." -ForegroundColor Green
Write-Host "You'll need to enter your Google Sheets and Email credentials" -ForegroundColor Green
Write-Host ""

# Read from .env file
$envFile = Get-Content ".\.env" -Raw
$envVars = @{}
$envFile -split "`n" | ForEach-Object {
    if ($_ -match "^([^=]+)=(.*)$") {
        $envVars[$matches[1].Trim()] = $matches[2].Trim()
    }
}

# Set Firebase config
Write-Host "Configuring Google Sheets integration..." -ForegroundColor Cyan
firebase functions:config:set `
  google.service_account_email="$($envVars['GOOGLE_SERVICE_ACCOUNT_EMAIL'])" `
  google.private_key="$($envVars['GOOGLE_PRIVATE_KEY'])" `
  google.sheet_id="$($envVars['GOOGLE_SHEET_ID'])"

Write-Host "Configuring Email integration..." -ForegroundColor Cyan
firebase functions:config:set `
  email.host="$($envVars['EMAIL_HOST'])" `
  email.port="$($envVars['EMAIL_PORT'])" `
  email.secure="$($envVars['EMAIL_SECURE'])" `
  email.user="$($envVars['EMAIL_USER'])" `
  email.pass="$($envVars['EMAIL_PASS'])" `
  email.to="$($envVars['EMAIL_TO'])"

Write-Host "✓ Environment variables configured" -ForegroundColor Green

# Step 5: Update production environment file
Write-Host ""
Write-Host "Step 5: Updating Production Environment File" -ForegroundColor Yellow
Write-Host "---------------------------------------"
$cloudFunctionUrl = "https://us-central1-$projectId.cloudfunctions.net/submitContactForm"
Write-Host "Cloud Function URL will be: $cloudFunctionUrl" -ForegroundColor Cyan

@"
# Production Environment Variables
VITE_API_ENDPOINT=$cloudFunctionUrl
VITE_ENV=production
"@ | Out-File -FilePath ".\.env.production" -Encoding UTF8
Write-Host "✓ Updated .env.production" -ForegroundColor Green

# Step 6: Build and Deploy
Write-Host ""
Write-Host "Step 6: Ready to Deploy!" -ForegroundColor Yellow
Write-Host "---------------------------------------"
Write-Host ""
Write-Host "Your project is now configured!" -ForegroundColor Green
Write-Host ""
Write-Host "To deploy, run these commands:" -ForegroundColor Cyan
Write-Host "  1. npm run build          # Build frontend" -ForegroundColor White
Write-Host "  2. firebase deploy        # Deploy everything" -ForegroundColor White
Write-Host ""
Write-Host "Or deploy separately:" -ForegroundColor Cyan
Write-Host "  firebase deploy --only hosting    # Deploy frontend only" -ForegroundColor White
Write-Host "  firebase deploy --only functions  # Deploy backend only" -ForegroundColor White
Write-Host ""

$deploy = Read-Host "Would you like to deploy now? (Y/N)"
if ($deploy -eq "Y" -or $deploy -eq "y") {
    Write-Host ""
    Write-Host "Building frontend..." -ForegroundColor Cyan
    npm run build
    
    Write-Host ""
    Write-Host "Deploying to Firebase..." -ForegroundColor Cyan
    firebase deploy
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   Deployment Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your app is live at: https://$projectId.web.app" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Setup complete! Deploy when you're ready." -ForegroundColor Green
}
