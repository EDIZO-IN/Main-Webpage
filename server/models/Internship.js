import mongoose from 'mongoose';

const InternshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    trim: true
  },
  education: {
    type: String,
    required: [true, 'Education information is required'],
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Internship position is required'],
    trim: true
  },
  resumeUrl: {
    type: String,
    required: [true, 'Resume URL is required']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'interviewed', 'accepted', 'rejected'],
    default: 'pending'
  },
  applicationNumber: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate a unique application number before saving
InternshipSchema.pre('save', function(next) {
  if (!this.applicationNumber) {
    // Generate a random string for application number
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.applicationNumber = `INT-${timestamp}-${random}`;
  }
  next();
});

const Internship = mongoose.model('Internship', InternshipSchema);

export default Internship;