import express from 'express';
import Support from '../models/Support.js';
import { transporter } from '../index.js';

const router = express.Router();

// Create a new support ticket
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, priority } = req.body;

    // Create new support ticket
    const newTicket = new Support({
      name,
      email,
      subject,
      message,
      priority: priority || 'medium'
    });

    // Save to database
    await newTicket.save();

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Support Ticket Received: ${newTicket.ticketNumber}`,
      html: `
        <h2>Thank you for contacting Edizo Support</h2>
        <p>Your support ticket has been received and will be addressed by our team.</p>
        <p><strong>Ticket Number:</strong> ${newTicket.ticketNumber}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Priority:</strong> ${priority || 'Medium'}</p>
        <p>We will respond to your inquiry as soon as possible.</p>
        <p>If you have any additional information to add to this ticket, please reply to this email.</p>
        <p>Thank you for choosing Edizo.</p>
      `
    };

    // Send notification email to support team
    const teamMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.SUPPORT_EMAIL || 'support@edizo.com',
      subject: `New Support Ticket: ${newTicket.ticketNumber} - ${priority || 'Medium'} Priority`,
      html: `
        <h2>New Support Ticket Received</h2>
        <p><strong>Ticket Number:</strong> ${newTicket.ticketNumber}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Priority:</strong> ${priority || 'Medium'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send emails (commented out for development)
    // await transporter.sendMail(userMailOptions);
    // await transporter.sendMail(teamMailOptions);

    res.status(201).json({
      success: true,
      message: 'Support ticket created successfully',
      data: {
        ticketNumber: newTicket.ticketNumber,
        status: newTicket.status
      }
    });
  } catch (error) {
    console.error('Support ticket creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create support ticket',
      error: error.message
    });
  }
});

// Get a support ticket by its number
router.get('/ticket/:ticketNumber', async (req, res) => {
  try {
    const { ticketNumber } = req.params;
    const ticket = await Support.findOne({ ticketNumber });
    
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Support ticket not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve support ticket',
      error: error.message
    });
  }
});

export default router;