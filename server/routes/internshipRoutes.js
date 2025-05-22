import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/resumes/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Submit internship application
router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, education, experience, message, position } = req.body;
    const resumePath = req.file ? req.file.path : null;

    // Validate required fields
    if (!name || !email || !education || !position || !resumePath) {
      if (resumePath) fs.unlinkSync(resumePath); // Clean up uploaded file
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create resume URL (in production, this would be your actual file URL)
    const resumeUrl = process.env.NODE_ENV === 'production' 
      ? `${process.env.BASE_URL}/${resumePath}`
      : `${req.protocol}://${req.get('host')}/${resumePath}`;

    // Create new internship application
    const newApplication = new Internship({
      name,
      email,
      phone,
      education,
      experience,
      message,
      position,
      resumeUrl
    });

    // Save to database
    await newApplication.save();

    // Email templates
    const applicantMailOptions = {
      from: `"Edizo Internships" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Application Received for ${position}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank you for applying to Edizo!</h2>
          <p>We've received your application for the <strong>${position}</strong> internship position.</p>
          
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3 style="margin-top: 0;">Application Details</h3>
            <p><strong>Application Number:</strong> ${newApplication.applicationNumber}</p>
            <p><strong>Position:</strong> ${position}</p>
            <p><strong>Submitted:</strong> ${new Date(newApplication.createdAt).toLocaleDateString()}</p>
          </div>
          
          <p>Our team will review your application and get back to you within 2-3 weeks. In the meantime, you can check your application status anytime using your application number.</p>
          
          <p>If you have any questions, please reply to this email or contact our HR team at <a href="mailto:careers@edizo.com">careers@edizo.com</a>.</p>
          
          <p>Best regards,<br>The Edizo Team</p>
          
          <div style="margin-top: 32px; font-size: 12px; color: #6b7280;">
            <p>Edizo Inc.<br>123 Innovation Drive, Tech Park, Silicon Valley, CA 94024</p>
          </div>
        </div>
      `
    };

    const hrMailOptions = {
      from: `"Edizo Internships" <${process.env.EMAIL_USER}>`,
      to: process.env.HR_EMAIL || 'careers@edizo.com',
      subject: `New Application: ${position} (${newApplication.applicationNumber})`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color: #2563eb;">New Internship Application</h2>
          
          <h3>Position: ${position}</h3>
          <p><strong>Application Number:</strong> ${newApplication.applicationNumber}</p>
          
          <h4>Applicant Information</h4>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          
          <h4>Education</h4>
          <p>${education}</p>
          
          ${experience ? `<h4>Experience</h4><p>${experience}</p>` : ''}
          
          ${message ? `<h4>Cover Letter</h4><p>${message}</p>` : ''}
          
          <p><strong>Resume:</strong> <a href="${resumeUrl}" target="_blank">View PDF</a></p>
          
          <p><a href="${process.env.ADMIN_DASHBOARD_URL || '#'}" style="display: inline-block; padding: 8px 16px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 4px;">View in Dashboard</a></p>
        </div>
      `
    };

    // Send emails
    await transporter.sendMail(applicantMailOptions);
    await transporter.sendMail(hrMailOptions);

    res.status(201).json({
      success: true,
      message: 'Internship application submitted successfully',
      data: {
        applicationNumber: newApplication.applicationNumber,
        status: newApplication.status
      }
    });
  } catch (error) {
    // Clean up uploaded file if error occurred
    if (req.file?.path) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error('Internship application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit internship application',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});