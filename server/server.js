import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // Mongoose for MongoDB

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001; // Define the port for the server

// Connect to MongoDB
// This uses the MONGODB_URI from your .env file to connect to your MongoDB instance (local or cloud)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new server discovery and monitoring engine
})
.then(() => console.log('Connected to MongoDB successfully!')) // Log success on connection
.catch((err) => console.error('MongoDB connection error:', err)); // Log error if connection fails

// Mongoose schema & model for contact/support messages
// Defines the structure of documents in the 'contactmessages' collection
const contactMessageSchema = new mongoose.Schema({
  name: String, // Name of the sender
  email: String, // Email of the sender
  phone: String, // Phone number of the sender (optional)
  subject: String, // Subject of the message
  message: String, // The actual message content
  createdAt: { type: Date, default: Date.now }, // Timestamp when the message was created
});
const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema); // Create the Mongoose model

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing for all routes
app.use(bodyParser.json()); // Parse incoming request bodies in JSON format
app.use(bodyParser.urlencoded({ extended: true })); // Parse incoming request bodies in URL-encoded format

// Dummy user store (not used in this version, but kept for potential future use)
const users = [];

// Unified application submission endpoint
// This endpoint currently only acknowledges receipt and does not save to any database.
app.post('/submit-application', async (req, res, next) => { // Added 'next' for error handling
  const applicationData = req.body; // Get application data from the request body
  console.log('Backend: Received application data:', applicationData); // Log received data

  try {
    // TODO: If you need to save applicationData to MongoDB, add your Mongoose model logic here.
    // Example: const newApplication = new ApplicationModel(applicationData);
    // await newApplication.save();

    res.status(200).json({
      success: true,
      message: 'Application data received successfully.',
    });
  } catch (error) {
    console.error('Backend: Error processing application data:', error); // Log any errors
    next(error); // Pass the error to the global error handler
  }
});

// Generic email sending function using Nodemailer
async function sendEmail(emailDetails) {
  // Create a Nodemailer transporter using Gmail service and credentials from .env
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail email address
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });

  let subject = ''; // Email subject
  let htmlContent = ''; // Email HTML body
  const recipient = emailDetails.recipientEmail || emailDetails.email; // Determine recipient email

  if (!recipient) {
    throw new Error('No recipient email provided.'); // Throw error if no recipient
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
          <p>Our team will review your application thoroughly and get in touch with you regarding the next steps.</p>
          <p style="margin-top: 20px;">Best regards,</p>
          <p>The E.D.I.Z.O Team</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 0.8em; color: #666;">This is an automated email, please do not reply directly to this message.</p>
        </div>
      `;
      break;
    }
    case 'contactForm': {
      const { name, email, phone, subject: contactSubject, message } = emailDetails;
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
      htmlContent = emailDetails.htmlContent || '<p>This is a generic email with no specific type defined.</p>';
      break;
    }
  }

  // Mail options for Nodemailer
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email
    to: recipient, // Recipient email
    subject, // Email subject
    html: htmlContent, // Email HTML content
  };

  await transporter.sendMail(mailOptions); // Send the email
  console.log(`Backend: Email sent to ${recipient} with subject: "${subject}".`);
}

// Main email sending endpoint
// This endpoint can be used for various email types (e.g., application confirmations)
app.post('/send-email', async (req, res, next) => { // Added 'next' for error handling
  try {
    console.log('Backend: Received request to send email:', req.body);
    await sendEmail(req.body); // Call the generic sendEmail function
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Backend: Error in /send-email endpoint:', error);
    next(error); // Pass the error to the global error handler
  }
});

// Contact form submission endpoint
// This endpoint saves the contact message to MongoDB and sends a notification email.
app.post('/send-contact-email', async (req, res, next) => { // Added 'next' for error handling
  try {
    console.log('Backend: Received contact form data:', req.body);
    const { name, email, phone, subject, message } = req.body;

    // Save contact message to MongoDB using the Mongoose model
    const newMessage = new ContactMessage({
      name,
      email,
      phone,
      subject,
      message,
    });
    const savedMessage = await newMessage.save(); // Save the new message to the database
    console.log('Contact message saved to MongoDB:', savedMessage);

    // Determine the recipient for the contact form notification email
    const recipientEmailForContact = process.env.CONTACT_FORM_RECIPIENT_EMAIL || process.env.EMAIL_USER;

    // Send a notification email about the new contact form submission
    await sendEmail({
      type: 'contactForm',
      recipientEmail: recipientEmailForContact,
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(200).json({ success: true, message: 'Contact message sent and saved successfully!' });
  } catch (error) {
    console.error('Backend: Error in /send-contact-email endpoint:', error);
    next(error); // Pass the error to the global error handler
  }
});

// Global Error Handling Middleware
// This middleware will catch any errors passed via next(error) from the routes
// and send a consistent JSON error response to the client.
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack); // Log the full error stack for debugging
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'An unexpected error occurred on the server.',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack // Provide stack in development
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
