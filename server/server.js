// backend/server.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Allowed frontend origins (update if you host elsewhere)
const allowedOrigins = [
    'http://localhost:5173', // Local dev
    'https://edizo-in.github.io', // GitHub Pages root
    'https://edizo-in.github.io/Main-Webpage' // Specific subpath if needed
];

// --- Middleware ---
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('CORS policy does not allow access from this origin'), false);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- Email Sending Logic ---
async function sendEmail(emailDetails) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let subject = '';
    let htmlContent = '';
    let recipient = emailDetails.recipientEmail || emailDetails.email;

    if (!recipient) throw new Error('Recipient email not provided.');

    switch (emailDetails.type) {
        case 'applicationConfirmation': {
            const { name, internshipTitle } = emailDetails;
            subject = `Application Confirmation - ${internshipTitle || 'Internship'}`;
            htmlContent = `
                <div style="font-family: Arial; color: #333;">
                    <h2>Thank you for your Application, ${name}!</h2>
                    <p>We have successfully received your application for the <strong>${internshipTitle}</strong> at E.D.I.Z.O.</p>
                    <p>Our team will review your application throughly and get in touch with you regarding the next steps.</p>
                    <p> In the meantime,if you have any questions,please do not heasitate to contact us</p>
                    <p>Best regards,</p>
                    <p>The E.D.I.Z.O Team</p>
                </div>
            `;
            break;
        }
        case 'internshipApplicationNotification': {
            const {
                name, email, phone, education, experience,
                message, internshipTitle
            } = emailDetails;
            recipient = process.env.INTERNSHIP_RECIPIENT_EMAIL || process.env.EMAIL_USER;
            subject = `New Internship Application - ${internshipTitle}`;
            htmlContent = `
                <div style="font-family: Arial; color: #333;">
                    <h2>New Application for ${internshipTitle}</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Education:</strong> ${education}</p>
                    <p><strong>Experience:</strong></p>
                    <pre>${experience}</pre>
                    <p><strong>Message:</strong></p>
                    <pre>${message}</pre>
                </div>
            `;
            break;
        }
        case 'contactForm': {
            const { name, email, phone, subject: contactSubject, message } = emailDetails;
            subject = `Contact Form: ${contactSubject}`;
            htmlContent = `
                <div style="font-family: Arial; color: #333;">
                    <h2>New Contact Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Subject:</strong> ${contactSubject}</p>
                    <p><strong>Message:</strong></p>
                    <pre>${message}</pre>
                </div>
            `;
            break;
        }
        case 'custom': {
            subject = emailDetails.subject || 'No Subject';
            htmlContent = emailDetails.htmlContent || '<p>No content provided.</p>';
            break;
        }
        default:
            subject = emailDetails.subject || 'Generic Notification';
            htmlContent = '<p>This is a default fallback email.</p>';
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject,
        html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${recipient} with subject "${subject}"`);
}

// --- Routes ---

// Internship Email Handler
app.post('/send-email', async (req, res, next) => {
    try {
        await sendEmail(req.body);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('❌ Error sending email:', error);
        next(error);
    }
});

// Contact Form Handler
app.post('/send-contact-email', async (req, res, next) => {
    try {
        const recipient = process.env.CONTACT_FORM_RECIPIENT_EMAIL || process.env.EMAIL_USER;
        await sendEmail({
            ...req.body,
            type: 'contactForm',
            recipientEmail: recipient
        });
        res.status(200).json({ success: true, message: 'Contact email sent!' });
    } catch (error) {
        console.error('❌ Error sending contact email:', error);
        next(error);
    }
});

// --- Error Handler ---
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
