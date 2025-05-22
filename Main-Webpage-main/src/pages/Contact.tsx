import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import AnimatedSection from '../components/common/AnimatedSection';
import Button from '../components/common/Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team for any inquiries or assistance"
        backgroundImage="https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-edizo-gray-900">We'd Love to Hear From You</h2>
              <p className="text-lg text-edizo-gray-600 max-w-2xl mx-auto">
                Whether you have a question about our services, need a consultation, or just want to say hello, our team is ready to assist you.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <AnimatedSection delay={0.1}>
              <div className="bg-edizo-gray-100 p-6 rounded-lg h-full">
                <h3 className="text-2xl font-semibold mb-6 text-edizo-gray-900">Contact Information</h3>
                <div className="space-y-6">
                  <ContactInfo
                    icon={<MapPin className="text-white" size={20} />}
                    title="Visit Us"
                    lines={['123 Innovation Drive', 'Tech Park, Silicon Valley', 'CA 94024, USA']}
                  />
                  <ContactInfo
                    icon={<Mail className="text-white" size={20} />}
                    title="Email Us"
                    lines={[
                      <a href="mailto:info@edizo.com" className="text-edizo-gray-700 hover:text-edizo-red">info@edizo.com</a>,
                      <span className="text-sm text-edizo-gray-600">For general inquiries</span>,
                      <a href="mailto:support@edizo.com" className="text-edizo-gray-700 hover:text-edizo-red mt-2 block">support@edizo.com</a>,
                      <span className="text-sm text-edizo-gray-600">For technical support</span>,
                    ]}
                  />
                  <ContactInfo
                    icon={<Phone className="text-white" size={20} />}
                    title="Call Us"
                    lines={[
                      <a href="tel:+11234567890" className="text-edizo-gray-700 hover:text-edizo-red">+1 (123) 456-7890</a>,
                      <span className="text-sm text-edizo-gray-600">Mon-Fri: 9:00 AM - 6:00 PM EST</span>
                    ]}
                  />
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold text-lg mb-3 text-edizo-gray-900">Connect With Us</h4>
                  <div className="flex space-x-4">
                    {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((platform, i) => (
                      <a
                        key={i}
                        href="#"
                        aria-label={platform}
                        className="bg-edizo-gray-200 hover:bg-edizo-red hover:text-white transition-colors duration-300 w-10 h-10 rounded-full flex items-center justify-center"
                      >
                        <i className={`fa-brands fa-${platform.toLowerCase()}`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-6 text-edizo-gray-900">Send Us a Message</h3>
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-10"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
                    <p className="text-edizo-gray-700 mb-6">
                      Your message has been sent successfully. We will get back to you as soon as possible.
                    </p>
                    <Button variant="outline" onClick={() => setFormSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['name', 'email'].map(field => (
                        <div key={field}>
                          <label htmlFor={field} className="block text-sm font-medium text-edizo-gray-700 mb-1 capitalize">
                            {field.replace(/^\w/, c => c.toUpperCase())} *
                          </label>
                          <input
                            type={field === 'email' ? 'email' : 'text'}
                            id={field}
                            name={field}
                            value={(formData as any)[field]}
                            onChange={handleInputChange}
                            required
                            className="input-field border border-edizo-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-edizo-red"
                            placeholder={`Enter your ${field}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-edizo-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field border border-edizo-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-edizo-red"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-edizo-gray-700 mb-1">Subject *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="input-field border border-edizo-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-edizo-red"
                        placeholder="Subject of your message"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-edizo-gray-700 mb-1">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="input-field border border-edizo-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-edizo-red"
                        placeholder="Write your message..."
                      />
                    </div>
                    <div className="text-right">
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Sending...' : (
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

export default Contact;

// Contact info reusable component
const ContactInfo = ({ icon, title, lines }: { icon: React.ReactNode, title: string, lines: React.ReactNode[] | string[] }) => (
  <div className="flex items-start">
    <div className="bg-edizo-red rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-lg mb-1 text-edizo-gray-900">{title}</h4>
      {lines.map((line, i) => (
        <p key={i} className="text-edizo-gray-700">{line}</p>
      ))}
    </div>
  </div>
);
