import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../.env' });

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Interface for contact form data
interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend server is running' });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const data: ContactFormData = req.body;
        const timestamp = new Date().toISOString();
        const formData = { ...data, timestamp };

        console.log('Processing contact form submission:', formData);

        // 1. Save to Google Sheets
        await saveToGoogleSheets(formData);
        console.log('Saved to Google Sheets');

        // 2. Send email notification
        await sendEmailNotification(formData);
        console.log('Email notification sent');

        res.json({
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
});

/**
 * Append contact form data to Google Sheets
 */
async function saveToGoogleSheets(data: ContactFormData & { timestamp: string }) {
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!serviceAccountEmail || !privateKey || !sheetId) {
        console.error('Missing Google Sheets configuration');
        throw new Error('Google Sheets configuration is incomplete');
    }

    const auth = new google.auth.JWT({
        email: serviceAccountEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const values = [
        [
            data.timestamp,
            data.name,
            data.email,
            data.phone,
            data.service,
            data.message,
        ],
    ];

    await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'Contact Form!A:F',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values,
        },
    });
}

/**
 * Send email notification via Zoho SMTP
 */
async function sendEmailNotification(data: ContactFormData & { timestamp: string }) {
    const emailHost = process.env.EMAIL_HOST;
    const emailPort = parseInt(process.env.EMAIL_PORT || '587', 10);
    const emailSecure = process.env.EMAIL_SECURE === 'true';
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO;

    if (!emailHost || !emailUser || !emailPass || !emailTo) {
        console.error('Missing email configuration');
        throw new Error('Email configuration is incomplete');
    }

    const transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: emailSecure,
        auth: {
            user: emailUser,
            pass: emailPass,
        },
    });

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
            <div class="value">${data.phone || 'Not provided'}</div>
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
            <div class="value">${data.timestamp}</div>
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

    const textContent = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Service: ${getServiceName(data.service)}
Message: ${data.message}
Timestamp: ${data.timestamp}

---
This is an automated message from Softvex Contact Form
  `.trim();

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
        'web-dev': 'Web Development',
        'app-dev': 'App Development',
        'crm-erp': 'CRM / ERP Solutions',
        'digital-marketing': 'Digital Marketing',
    };
    return serviceMap[serviceId] || serviceId;
}

// Start server
app.listen(PORT, () => {
    console.log(`✅ Backend server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/contact`);
});
