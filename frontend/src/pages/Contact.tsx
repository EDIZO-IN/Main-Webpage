import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Placeholder components for demonstration if not provided
const PageHeader = ({ title, subtitle, backgroundImage }) => (
  <div className="relative h-64 bg-cover bg-center text-white flex items-center justify-center rounded-lg shadow-md" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
    <div className="relative z-10 text-center p-4">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-lg">{subtitle}</p>
    </div>
  </div>
);

const AnimatedSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="rounded-lg p-4"
  >
    {children}
  </motion.div>
);

const Button = ({ children, type = 'button', disabled = false, onClick, variant = 'primary' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 rounded-full font-semibold flex items-center justify-center transition-all duration-300
      ${variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
      ${variant === 'outline' ? 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    {children}
  </button>
);

// Contact info reusable component
const ContactInfo = ({ icon, title, lines }) => (
  <div className="flex items-start space-x-4">
    <div className="bg-red-500 rounded-full p-3 flex items-center justify-center"> {/* Using red-500 for edizo-red */}
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-lg text-gray-900 mb-1">{title}</h4>
      <div className="space-y-1 text-gray-700 text-sm">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleInputChange = (e) => { // Removed 'e' type annotation
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Define the API base URL.
  const API_BASE_URL = 'https://main-webpage-1.onrender.com'; // Render backend URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null); // Clear previous errors

    try {
      // Updated endpoint to use the directly applied API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Attempt to read error message from server response
        const errorData = await response.json();
        throw new Error(errorData.message || `Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);

      setFormSubmitted(true);
      // Reset form data after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError(error.message || 'Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
  title={<span className="text-red-500 ">Contact Us</span>} // Title in red
  subtitle={<span className="text-white">Get in touch with our team for any inquiries or assistance</span>} // Subtitle in white
  backgroundImage="https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
/>

      <section className="section bg-white p-8">
        <div className="max-w-6xl mx-auto px-4"> {/* Using container-custom equivalent with Tailwind */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">We'd Love to Hear From You</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Whether you have a question about our services, need a consultation, or just want to say hello, our team is ready to assist you.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <AnimatedSection delay={0.1}>
              <div className="bg-gray-100 p-6 rounded-lg h-full">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Contact Information</h3>
                <div className="space-y-6">
                  <ContactInfo
                    icon={<MapPin className="text-white" size={20} />}
                    title="Visit Us"
                    lines={['virtual address']}
                  />
                  <ContactInfo
                    icon={<Mail className="text-white" size={20} />}
                    title="Email Us"
                    lines={[
                      <a href="mailto:e.d.i.z.o.pvt.ltd@gmail.com" className="text-gray-700 hover:text-red-500">e.d.i.z.o.pvt.ltd@gmail.com</a>,
                      <span className="text-sm text-gray-600">For general inquiries</span>,
                      <a href="mailto:edizocorp@gmail.com" className="text-gray-700 hover:text-red-500 mt-2 block">edizocorp@gmail.com</a>,
                      <span className="text-sm text-gray-600">For technical support</span>,
                    ]}
                  />
                  <ContactInfo
                    icon={<Phone className="text-white" size={20} />}
                    title="Call Us"
                    lines={[
                      <a href="tel:+917339316924" className="text-gray-700 hover:text-red-500">+917092435729</a>,
                      <span className="text-sm text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM EST</span>
                    ]}
                  />
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold text-lg mb-3 text-gray-900">Connect With Us</h4>
                  <div className="flex space-x-4">
                    {/* Social media icons with actual URLs */}
                    {[
                      { platform: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61576742758066' },
                      { platform: 'Twitter', url: 'https://x.com/EdizoPvtLtd' },
                      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/edizo-pvt-ltd-149748367/' },
                      { platform: 'Instagram', url: 'https://www.instagram.com/e.d.i.z.o._official/' },
                      { platform: 'Youtube',  url: 'https://www.youtube.com/@team-edizo'}
                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.url}
                        aria-label={social.platform}
                        target="_blank" // Opens link in a new tab
                        rel="noopener noreferrer" // Recommended for security when using target="_blank"
                        className="bg-gray-200 hover:bg-red-500 hover:text-white transition-colors duration-300 w-10 h-10 rounded-full flex items-center justify-center"
                      >
                        {/* Using Font Awesome classes. Ensure Font Awesome is linked in the HTML */}
                        <i className={`fa-brands fa-${social.platform.toLowerCase()}`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2"> {/* Span 2 columns on large screens */}
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Send Us a Message</h3>
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-10"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
                    <p className="text-gray-700 mb-6">
                      Your message has been sent successfully. We will get back to you as soon as possible.
                    </p>
                    <Button variant="outline" onClick={() => setFormSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {formError && (
                      <p className="text-red-500 text-center">{formError}</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['name', 'email'].map(field => (
                        <div key={field}>
                          <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                            {field.replace(/^\w/, c => c.toUpperCase())} *
                          </label>
                          <input
                            type={field === 'email' ? 'email' : 'text'}
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            required
                            className="input-field border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter your ${field}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="input-field border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Subject of your message"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="input-field border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your message..."
                      />
                    </div>
                    <div className="text-right">
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            Sending... <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                          </>
                        ) : (
                          <>
                            Send Message <Send className="ml-2 w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

// Main App component to render the Contact page
const App = () => {
  return (
    <>
      {/* Link to Font Awesome for social media icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0V4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <main className="min-h-screen bg-gray-50 font-sans antialiased">
        <Contact />
      </main>
    </>
  );
};

export default App;