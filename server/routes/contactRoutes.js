import express from 'express';
import Contact from '../models/Contact.js';
import { transporter } from '../index.js';

const router = express.Router();

// Create a new contact submission
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Create new contact entry
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });

    // Save to database
    await newContact.save();

    // Send notification email to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'admin@edizo.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email (commented out for development)
    // await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: newContact
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: error.message
    });
  }
});

export default router;