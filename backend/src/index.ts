import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { google } from "googleapis";
import * as nodemailer from "nodemailer";

// Initialize Firebase Admin
admin.initializeApp();

// Interface for contact form data
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  timestamp?: string;
}

/**
 * HTTP Cloud Function to handle contact form submissions
 * This function:
 * 1. Saves data to Firestore
 * 2. Appends data to Google Sheets
 * 3. Sends email notification via Zoho
 */
export const submitContactForm = functions.https.onCall(
  async (data: ContactFormData, context) => {
    try {
      // Add timestamp
      const timestamp = new Date().toISOString();
      const formData = { ...data, timestamp };

      console.log("Processing contact form submission:", formData);

      // 1. Save to Firestore
      const firestoreResult = await saveToFirestore(formData);
      console.log("Saved to Firestore with ID:", firestoreResult.id);

      // 2. Save to Google Sheets
      await saveToGoogleSheets(formData);
      console.log("Saved to Google Sheets");

      // 3. Send email notification
      await sendEmailNotification(formData);
      console.log("Email notification sent");

      return {
        success: true,
        message: "Contact form submitted successfully",
        id: firestoreResult.id,
      };
    } catch (error: any) {
      console.error("Error processing contact form:", error);
      throw new functions.https.HttpsError(
        "internal",
        error.message || "Failed to process contact form"
      );
    }
  }
);

/**
 * Save contact form data to Firestore
 */
async function saveToFirestore(data: ContactFormData) {
  const db = admin.firestore();
  const docRef = await db.collection("contacts").add({
    ...data,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { id: docRef.id };
}

/**
 * Append contact form data to Google Sheets
 */
async function saveToGoogleSheets(data: ContactFormData) {
  // Get credentials from Firebase config or environment variables
  const config = functions.config();
  const serviceAccountEmail = config.google?.service_account_email || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = (config.google?.private_key || process.env.GOOGLE_PRIVATE_KEY)?.replace(/\\n/g, "\n");
  const sheetId = config.google?.sheet_id || process.env.GOOGLE_SHEET_ID;

  if (!serviceAccountEmail || !privateKey || !sheetId) {
    console.error("Missing Google Sheets configuration");
    throw new Error("Google Sheets configuration is incomplete");
  }

  // Create JWT client for authentication
  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  // Initialize Google Sheets API
  const sheets = google.sheets({ version: "v4", auth });

  // Prepare row data
  const values = [
    [
      data.timestamp || new Date().toISOString(),
      data.name,
      data.email,
      data.phone,
      data.service,
      data.message,
    ],
  ];

  // Append to sheet
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Sheet1!A:F", // Adjust sheet name if different
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values,
    },
  });
}

/**
 * Send email notification via Zoho SMTP
 */
async function sendEmailNotification(data: ContactFormData) {
  // Get email configuration from Firebase config or environment variables
  const config = functions.config();
  const emailHost = config.email?.host || process.env.EMAIL_HOST;
  const emailPort = parseInt(config.email?.port || process.env.EMAIL_PORT || "587", 10);
  const emailSecure = (config.email?.secure || process.env.EMAIL_SECURE) === "true";
  const emailUser = config.email?.user || process.env.EMAIL_USER;
  const emailPass = config.email?.pass || process.env.EMAIL_PASS;
  const emailTo = config.email?.to || process.env.EMAIL_TO;

  if (!emailHost || !emailUser || !emailPass || !emailTo) {
    console.error("Missing email configuration");
    throw new Error("Email configuration is incomplete");
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: emailSecure,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  // Email HTML template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dcfce7 0%, #e0f2fe 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; color: #1a1a1a; font-size: 24px; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #555; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
        .value { margin-top: 5px; color: #1a1a1a; font-size: 16px; }
        .message-box { background: #f9fafb; padding: 15px; border-left: 4px solid #22c55e; margin-top: 10px; }
        .footer { background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
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
            <div class="value">${data.phone || "Not provided"}</div>
          </div>
          <div class="field">
            <div class="label">Service Interested In</div>
            <div class="value">${getServiceName(data.service)}</div>
          </div>
          <div class="field">
            <div class="label">Message</div>
            <div class="message-box">${data.message}</div>
          </div>
          <div class="field">
            <div class="label">Timestamp</div>
            <div class="value">${data.timestamp || new Date().toLocaleString()}</div>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated message from Softvex Contact Form</p>
          <p>© ${new Date().getFullYear()} Softvex - Digital Tech Solutions</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Plain text version
  const textContent = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Service: ${getServiceName(data.service)}
Message: ${data.message}
Timestamp: ${data.timestamp || new Date().toLocaleString()}

---
This is an automated message from Softvex Contact Form
  `.trim();

  // Send email
  await transporter.sendMail({
    from: `"Softvex Contact Form" <${emailUser}>`,
    to: emailTo,
    subject: `New Contact Form Submission - ${data.name}`,
    text: textContent,
    html: htmlContent,
  });
}

/**
 * Helper function to get readable service name
 */
function getServiceName(serviceId: string): string {
  const serviceMap: Record<string, string> = {
    "web-dev": "Web Development",
    "app-dev": "App Development",
    "crm-erp": "CRM / ERP Solutions",
    "digital-marketing": "Digital Marketing",
  };
  return serviceMap[serviceId] || serviceId;
}
