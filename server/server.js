// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Pool } from 'pg'; // Import the Pool from 'pg'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// --- PostgreSQL Database Connection ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Optional: Add SSL configuration if connecting to a remote database like Heroku Postgres
  // ssl: {
  //   rejectUnauthorized: false // Use this if your database requires SSL but you don't have a specific CA cert
  // }
});

// Test database connection
pool.connect((err, client, done) => {
  if (err) {
    console.error('Database connection error:', err.message);
    return;
  }
  console.log('Successfully connected to PostgreSQL database!');
  client.release(); // Release the client back to the pool
});

// --- Dummy Database for Users (Not used for direct application submission) ---
const users = [];

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Essential for parsing JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-x-www-form-urlencoded

// --- Unified Application Submission Endpoint ---
app.post('/submit-application', async (req, res) => {
  const applicationData = req.body;
  console.log('Backend: Received application data:', applicationData); // Log received data

  try {
    // In a real app, you would save applicationData to a database here.
    // For this example, we just acknowledge receipt.
    console.log('Backend: Application data processed successfully (simulated).');
    res.status(200).json({ success: true, message: 'Application data received successfully.' });
  } catch (error) {
    console.error('Backend: Error processing application data:', error);
    res.status(500).json({ success: false, message: 'Failed to process application data.', error: error.message });
  }
});

// --- Generic Email Sending Function ---
async function sendEmail(emailDetails) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let subject = '';
  let htmlContent = '';
  const recipient = emailDetails.recipientEmail || emailDetails.email; // Use recipientEmail or email from formData

  // Check if a specific email type is provided
  if (emailDetails.type === 'applicationConfirmation') {
    // Destructure all relevant fields from emailDetails
    const { name, email, phone, education, experience, message, internshipTitle } = emailDetails;

    subject = `Application Confirmation - Your Application for ${internshipTitle || 'Internship'}`;
    htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #d9534f;">Thank You for Your Application, ${name}!</h2>
        <p>Dear ${name},</p>
        <p>We have successfully received your application for the <strong>${internshipTitle || 'internship'}</strong> at E.D.I.Z.O.</p>
        <p>Our team will review your application thoroughly and get in touch with you regarding the next steps.</p>
        <p>In the meantime, here are the details of your submission for your reference:</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee;">
          <p><strong>Internship Applied For:</strong> ${internshipTitle || 'N/A'}</p>
          <p><strong>Full Name:</strong> ${name || 'N/A'}</p>
          <p><strong>Email Address:</strong> ${email || 'N/A'}</p>
          <p><strong>Phone Number:</strong> ${phone || 'N/A'}</p>
          <p><strong>Degree and Branch:</strong> ${education || 'N/A'}</p>
          <p><strong>Relevant Experience:</strong></p>
          <p style="white-space: pre-wrap; margin-left: 20px;">${experience || 'No experience provided.'}</p>
          <p><strong>Cover Letter/Message:</strong></p>
          <p style="white-space: pre-wrap; margin-left: 20px;">${message || 'No cover letter provided.'}</p>
        </div>

        <p style="margin-top: 20px;">Best regards,</p>
        <p>The E.D.I.Z.O Team</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 0.8em; color: #666;">This is an automated email, please do not reply directly to this message.</p>
      </div>
    `;
  } else if (emailDetails.type === 'contactForm') {
    // New email type for contact form submissions
    const { name, email, phone, subject: contactSubject, message } = emailDetails; // Renamed subject to contactSubject to avoid conflict
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
  } else if (emailDetails.type === 'custom') {
    // If type is 'custom', use the subject and htmlContent provided directly in emailDetails
    subject = emailDetails.subject || 'No Subject';
    htmlContent = emailDetails.htmlContent || '<p>No content provided.</p>';
    console.log(`Backend: Sending custom email with subject: "${subject}"`);
  } else {
    console.warn('Unknown or unspecified email type:', emailDetails.type);
    // Fallback: If no specific type, try to use subject and htmlContent directly
    subject = emailDetails.subject || 'Generic Email';
    htmlContent = emailDetails.htmlContent || '<p>This is a generic email with no specific type defined.</p>';
  }

  // Ensure a recipient is available
  if (!recipient) {
    console.error('Backend: No recipient email provided for sending email.');
    throw new Error('No recipient email provided.');
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient, // This will be the recipient of the contact form email (e.g., your business email)
    subject: subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Backend: Email sent to ${recipient} with subject: "${subject}".`); // Log successful email send
}

// --- Main Email Sending Endpoint (now uses the generic function) ---
app.post('/send-email', async (req, res) => {
  try {
    console.log('Backend: Received request to send email with details:', req.body); // Log email request
    // Pass all received body directly to sendEmail function
    await sendEmail(req.body);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Backend: Error in /send-email endpoint:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.', error: error.message });
  }
});

// --- New Endpoint for Contact Form Submissions ---
app.post('/send-contact-email', async (req, res) => {
  try {
    console.log('Backend: Received contact form data:', req.body);
    const { name, email, phone, subject, message } = req.body;

    // Save contact message to PostgreSQL
    const query = `
      INSERT INTO contact_messages(name, email, phone, subject, message)
      VALUES($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [name, email, phone, subject, message];
    
    await pool.query(query, values);
    console.log('Contact message saved to database.');

    // Send email notification
    const recipientEmailForContact = process.env.CONTACT_FORM_RECIPIENT_EMAIL || process.env.EMAIL_USER;

    await sendEmail({
      type: 'contactForm',
      recipientEmail: recipientEmailForContact, // Send to your designated contact email
      ...req.body, // Pass all form data (name, email, phone, subject, message)
    });
    res.status(200).json({ success: true, message: 'Contact message sent and saved successfully!' });
  } catch (error) {
    console.error('Backend: Error in /send-contact-email endpoint:', error);
    res.status(500).json({ success: false, message: 'Failed to send or save contact message.', error: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
