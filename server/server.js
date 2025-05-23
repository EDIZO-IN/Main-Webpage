// backend/server.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file.
// This is crucial for local development. On Render, environment variables
// are configured directly in the service settings.
dotenv.config();

const app = express();

// --- PORT Configuration (Already Optimal for Render and Local Development) ---
// Render automatically provides a PORT environment variable in production.
// Your application MUST listen on process.env.PORT when deployed to Render.
// The '|| 3001' is a fallback for local development, allowing the server to run
// on port 3001 if the PORT environment variable is not explicitly set (which it won't be locally).
const PORT = process.env.PORT || 3001;

// --- Middleware Setup ---

// CORS configuration is crucial for production.
// The 'origin' list should include your frontend's deployed Render URL.
// IMPORTANT: You need to add your GitHub Pages URL here!
const allowedOrigins = [
    'http://localhost:5173', // Keep this for local Vite development (Vite's default port)
    'https://main-webpage-1.onrender.com', // Your backend's own Render URL (if it also serves frontend)
    'https://edizo-in.github.io/Main-Webpage/' // <--- Your ACTUAL GitHub Pages URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (e.g., from Postman, curl, or same-origin if backend serves frontend)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies, authorization headers, etc. to be sent
    optionsSuccessStatus: 204 // For preflight requests, return 204 No Content
}));

app.use(bodyParser.json()); // Parse incoming request bodies in JSON format
app.use(bodyParser.urlencoded({ extended: true })); // Parse incoming request bodies in URL-encoded format

// --- Generic Email Sending Function using Nodemailer ---
async function sendEmail(emailDetails) {
  // EMAIL_USER and EMAIL_PASS will be environment variables set on Render.
  // Ensure EMAIL_PASS is an App Password if using Gmail with 2FA.
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Using Gmail service
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail email address (from Render env var)
      pass: process.env.EMAIL_PASS, // Your Gmail App Password (from Render env var)
    },
  });

  let subject = ''; // Email subject
  let htmlContent = ''; // Email HTML body
  let recipient = emailDetails.recipientEmail || emailDetails.email; // Determine recipient email

  if (!recipient) {
    throw new Error('No recipient email provided for sending email.'); // Throw error if no recipient
  }

  // Generate email content based on the email type
  switch (emailDetails.type) {
    case 'applicationConfirmation': {
      const { name, internshipTitle } = emailDetails;
      subject = `Application Confirmation - Your Application for ${internshipTitle || 'Internship'}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #d9534f;">Thank You for Your Application, ${name}!</h2>
          <p>Dear ${name},</p>
          <p>We have successfully received your application for the <strong>${internshipTitle || 'internship'}</strong> at E.D.I.Z.O.</p>
          <p style="margin-top: 20px;">Best regards,</p>
          <p>The E.D.I.Z.O Team</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 0.8em; color: #666;">This is an automated email, please do not reply directly to this message.</p>
        </div>
      `;
      break;
    }
    case 'internshipApplicationNotification': {
      // This email goes to the admin with the applicant's details
      const { name, email, phone, education, experience, message, internshipTitle } = emailDetails;
      // Set the recipient to the admin's email for this type of email
      recipient = process.env.INTERNSHIP_RECIPIENT_EMAIL || process.env.EMAIL_USER;
      subject = `New Internship Application for ${internshipTitle || 'Internship'}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1a73e8;">New Internship Application Received!</h2>
          <p>A new application has been submitted for the <strong>${internshipTitle || 'internship'}</strong> position.</p>
          <div style="background-color: #f0f8ff; padding: 15px; border-radius: 8px; border: 1px solid #cceeff;">
            <p><strong>Applicant Name:</strong> ${name || 'N/A'}</p>
            <p><strong>Applicant Email:</strong> ${email || 'N/A'}</p>
            <p><strong>Applicant Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Education:</strong> ${education || 'N/A'}</p>
            <p><strong>Experience:</strong></p>
            <p style="white-space: pre-wrap; margin-left: 20px;">${experience || 'No experience provided.'}</p>
            <p><strong>Cover Letter/Message:</strong></p>
            <p style="white-space: pre-wrap; margin-left: 20px;">${message || 'No message provided.'}</p>
          </div>
          <p style="margin-top: 20px;">Please review the application and take necessary action.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 0.8em; color: #666;">This is an automated notification from your website.</p>
        </div>
      `;
      break;
    }
    case 'contactForm': {
      const { name, email, phone, subject: contactSubject, message } = emailDetails;
      // Recipient for contact form is already handled by recipientEmail passed from endpoint
      subject = `New Contact Form Submission: ${contactSubject || 'No Subject'}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1a73e8;">New Message from Contact Form</h2>
          <p>You have received a new message from your website's contact form.</p>
          <div style="background-color: #f0f8ff; padding: 15px; border-radius: 8px; border: 1px solid #cceeff;">
            <p><strong>Name:</strong> ${name || 'N/A'}</p>
            <p><strong>Email:</strong> ${email || 'N/A'}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Subject:</strong> ${contactSubject || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; margin-left: 20px;">${message || 'No message provided.'}</p>
          </div>
          <p style="margin-top: 20px;">Please respond to the sender at ${email} as soon as possible.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 0.8em; color: #666;">This is an automated notification from your website.</p>
        </div>
      `;
      break;
    }
    case 'custom': {
      subject = emailDetails.subject || 'No Subject';
      htmlContent = emailDetails.htmlContent || '<p>No content provided.</p>';
      console.log(`Backend: Sending custom email with subject: "${subject}"`);
      break;
    }
    default: {
      console.warn('Unknown or unspecified email type:', emailDetails.type);
      subject = emailDetails.subject || 'Generic Email';
      htmlContent = '<p>This is a generic email with no specific type defined.</p>';
      break;
    }
  }

  // Mail options for Nodemailer
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email (from Render env var)
    to: recipient, // Recipient email (either applicant's or admin's)
    subject, // Email subject
    html: htmlContent, // Email HTML content
  };

  await transporter.sendMail(mailOptions); // Send the email
  console.log(`Backend: Email sent to ${recipient} with subject: "${subject}".`);
}

// --- Main Email Sending Endpoint for Internship Applications ---
// This endpoint now directly handles email sending for internship applications
app.post('/send-email', async (req, res, next) => {
  try {
    console.log('Backend: Received request to send email:', req.body);
    // This endpoint will be used for both applicationConfirmation (to user)
    // and internshipApplicationNotification (to admin)
    await sendEmail(req.body); // Call the generic sendEmail function
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Backend: Error in /send-email endpoint:', error);
    next(error); // Pass the error to the global error handler
  }
});

// --- Contact Form Submission Endpoint ---
// This endpoint now only sends an email notification to the admin, without saving to DB.
app.post('/send-contact-email', async (req, res, next) => {
  try {
    console.log('Backend: Received contact form data:', req.body);
    const { name, email, phone, subject, message } = req.body;

    // CONTACT_FORM_RECIPIENT_EMAIL will be an environment variable set on Render.
    // This is the email address where you want to receive contact form notifications.
    const recipientEmailForContact = process.env.CONTACT_FORM_RECIPIENT_EMAIL || process.env.EMAIL_USER;

    await sendEmail({
      type: 'contactForm',
      recipientEmail: recipientEmailForContact, // Explicitly set recipient for admin notification
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(200).json({ success: true, message: 'Contact message sent successfully!' });
  } catch (error) {
    console.error('Backend: Error in /send-contact-email endpoint:', error);
    next(error); // Pass the error to the global error handler
  }
});

// --- Global Error Handling Middleware ---
// This middleware will catch any errors passed via next(error) from the routes
// and send a consistent JSON error response to the client.
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack); // Log the full error stack for debugging
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'An unexpected error occurred on the server.',
    // In production, avoid sending detailed error stacks to the client for security.
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

// --- Start the server ---
// The server will listen on the port provided by Render (process.env.PORT)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} (Render's assigned port)`);
});
