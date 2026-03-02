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
