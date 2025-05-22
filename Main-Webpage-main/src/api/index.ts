import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contact form submission
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await api.post('/contact', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Support ticket submission
export const submitSupportTicket = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: string;
}) => {
  try {
    const response = await api.post('/support', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting support ticket:', error);
    throw error;
  }
};

// Internship application submission
export const submitInternshipApplication = async (formData: {
  name: string;
  email: string;
  phone?: string;
  education: string;
  experience?: string;
  message?: string;
  position: string;
  resumeUrl: string;
}) => {
  try {
    const response = await api.post('/internships/apply', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting internship application:', error);
    throw error;
  }
};

// Check internship application status
export const getApplicationStatus = async (applicationNumber: string) => {
  try {
    const response = await api.get(`/internships/status/${applicationNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error getting application status:', error);
    throw error;
  }
};

// Check support ticket status
export const getSupportTicketStatus = async (ticketNumber: string) => {
  try {
    const response = await api.get(`/support/ticket/${ticketNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error getting support ticket status:', error);
    throw error;
  }
};

export default api;