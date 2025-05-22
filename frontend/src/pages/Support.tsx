// import React, { useState } from 'react';
// import { MessageSquare, FileText, LifeBuoy, HelpCircle, Clock, Send, CheckCircle } from 'lucide-react';
// import { motion } from 'framer-motion';
// import PageHeader from '../components/common/PageHeader';
// import AnimatedSection from '../components/common/AnimatedSection';
// import Button from '../components/common/Button';

// // FAQ categories and questions
// const faqCategories = [
//   {
//     id: 'general',
//     name: 'General Questions',
//     icon: HelpCircle,
//     questions: [
//       {
//         question: 'What services does Edizo offer?',
//         answer: 'Edizo offers a comprehensive range of services including web development, mobile app development, UI/UX design, digital marketing, customer support, and business consulting tailored to meet the needs of businesses of all sizes.'
//       },
//       {
//         question: 'How can I get started with Edizo?',
//         answer: 'To get started with Edizo, simply contact us through our contact form or call our office. We\'ll schedule an initial consultation to discuss your needs and how we can help you achieve your business goals.'
//       },
//       {
//         question: 'What is your typical process for new clients?',
//         answer: 'Our process typically begins with an initial consultation to understand your needs, followed by a proposal and quotation. Once approved, we move to the planning and development phases, maintain open communication throughout the project, and provide ongoing support after launch.'
//       }
//     ]
//   },
//   {
//     id: 'technical',
//     name: 'Technical Support',
//     icon: LifeBuoy,
//     questions: [
//       {
//         question: 'How do I report a technical issue with my website?',
//         answer: 'You can report technical issues through our support ticket system, by emailing support@edizo.com, or by calling our technical support line at +1 (123) 456-7890. Please provide as much detail as possible about the issue you\'re experiencing.'
//       },
//       {
//         question: 'What is your response time for technical issues?',
//         answer: 'Our standard response time for technical issues is within 24 hours. For critical issues affecting website functionality, we aim to respond within 4 hours during business hours. Priority support with faster response times is available with our premium support packages.'
//       },
//       {
//         question: 'Do you offer maintenance packages for websites?',
//         answer: 'Yes, we offer various maintenance packages that include regular updates, security monitoring, performance optimization, and technical support. These packages are designed to keep your website secure, up-to-date, and performing optimally.'
//       }
//     ]
//   },
//   {
//     id: 'billing',
//     name: 'Billing & Payments',
//     icon: FileText,
//     questions: [
//       {
//         question: 'What payment methods do you accept?',
//         answer: 'We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and checks. For larger projects, we offer flexible payment schedules tailored to project milestones.'
//       },
//       {
//         question: 'How does your billing cycle work?',
//         answer: 'For project-based work, we typically require a deposit upfront, with the remaining balance due upon project completion or spread across milestones. For ongoing services, we bill monthly or annually, depending on the service and agreement.'
//       },
//       {
//         question: 'Do you offer refunds?',
//         answer: 'Our refund policy depends on the nature of the service. For custom development projects, we work on a milestone approval basis. For subscription services, refunds are generally available within the first 30 days if you\'re not satisfied with the service.'
//       }
//     ]
//   }
// ];

// const Support: React.FC = () => {
//   const [activeCategory, setActiveCategory] = useState('general');
//   const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//     priority: 'medium',
//   });
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
    
//     // Here would be an API call to the backend to save the support ticket
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       console.log('Support ticket submitted:', formData);
      
//       setFormSubmitted(true);
//       setFormData({
//         name: '',
//         email: '',
//         subject: '',
//         message: '',
//         priority: 'medium',
//       });
//     } catch (error) {
//       console.error('Error submitting support ticket:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleQuestion = (index: number) => {
//     if (activeQuestion === index) {
//       setActiveQuestion(null);
//     } else {
//       setActiveQuestion(index);
//     }
//   };

//   return (
//     <>
//       <PageHeader
//         title="Support Center"
//         subtitle="Find answers to your questions or contact our support team for assistance"
//         backgroundImage="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//       />

//       {/* Support Options Section */}
//       <section className="section bg-white">
//         <div className="container-custom">
//           <AnimatedSection>
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">How Can We Help You?</h2>
//               <p className="text-lg text-edizo-gray-600 max-w-2xl mx-auto">
//                 Our support team is ready to assist you with any questions or issues you may have.
//               </p>
//             </div>
//           </AnimatedSection>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <AnimatedSection delay={0.1}>
//               <div className="bg-white p-6 rounded-lg shadow-md border border-edizo-gray-200 text-center">
//                 <div className="bg-edizo-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <MessageSquare className="text-edizo-red" size={28} />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
//                 <p className="text-edizo-gray-700 mb-4">
//                   Chat with our support team in real-time for immediate assistance with your questions.
//                 </p>
//                 <Button 
//                   variant="outline" 
//                   onClick={() => console.log('Live chat clicked')}
//                   fullWidth
//                 >
//                   Start Chat
//                 </Button>
//                 <p className="text-sm text-edizo-gray-500 mt-3 flex items-center justify-center">
//                   <Clock size={16} className="mr-1" /> Available 24/7
//                 </p>
//               </div>
//             </AnimatedSection>

//             <AnimatedSection delay={0.2}>
//               <div className="bg-white p-6 rounded-lg shadow-md border border-edizo-gray-200 text-center">
//                 <div className="bg-edizo-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FileText className="text-edizo-red" size={28} />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">Submit a Ticket</h3>
//                 <p className="text-edizo-gray-700 mb-4">
//                   Create a support ticket and our team will get back to you as soon as possible.
//                 </p>
//                 <Button 
//                   variant="primary" 
//                   onClick={() => document.getElementById('support-form')?.scrollIntoView({ behavior: 'smooth' })}
//                   fullWidth
//                 >
//                   Create Ticket
//                 </Button>
//                 <p className="text-sm text-edizo-gray-500 mt-3 flex items-center justify-center">
//                   <Clock size={16} className="mr-1" /> Response within 24 hours
//                 </p>
//               </div>
//             </AnimatedSection>

//             <AnimatedSection delay={0.3}>
//               <div className="bg-white p-6 rounded-lg shadow-md border border-edizo-gray-200 text-center">
//                 <div className="bg-edizo-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <LifeBuoy className="text-edizo-red" size={28} />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">Knowledge Base</h3>
//                 <p className="text-edizo-gray-700 mb-4">
//                   Browse our comprehensive knowledge base for guides, tutorials, and answers to common questions.
//                 </p>
//                 <Button 
//                   variant="outline" 
//                   onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}
//                   fullWidth
//                 >
//                   Explore Articles
//                 </Button>
//                 <p className="text-sm text-edizo-gray-500 mt-3 flex items-center justify-center">
//                   <Clock size={16} className="mr-1" /> Updated regularly
//                 </p>
//               </div>
//             </AnimatedSection>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section id="faq-section" className="section bg-edizo-gray-100">
//         <div className="container-custom">
//           <AnimatedSection>
//             <div className="text-center mb-12">
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
//               <p className="text-lg text-edizo-gray-600 max-w-2xl mx-auto">
//                 Find answers to the most common questions about our services and support.
//               </p>
//             </div>
//           </AnimatedSection>

//           <div className="max-w-4xl mx-auto">
//             <AnimatedSection delay={0.1}>
//               <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
//                 <div className="flex border-b border-edizo-gray-200">
//                   {faqCategories.map(category => {
//                     const Icon = category.icon;
//                     return (
//                       <button
//                         key={category.id}
//                         className={`flex-1 py-4 px-4 text-center focus:outline-none transition-colors duration-300 ${
//                           activeCategory === category.id
//                             ? 'bg-edizo-red text-white'
//                             : 'bg-white text-edizo-gray-800 hover:bg-edizo-gray-100'
//                         }`}
//                         onClick={() => setActiveCategory(category.id)}
//                       >
//                         <div className="flex flex-col items-center">
//                           <Icon className="mb-2" size={20} />
//                           <span className="font-medium">{category.name}</span>
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <div className="p-6">
//                   {faqCategories
//                     .filter(category => category.id === activeCategory)
//                     .map(category => (
//                       <div key={category.id}>
//                         <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
//                         <div className="space-y-4">
//                           {category.questions.map((item, index) => (
//                             <div key={index} className="border border-edizo-gray-200 rounded-lg overflow-hidden">
//                               <button
//                                 className="flex justify-between items-center w-full px-6 py-4 text-left font-medium focus:outline-none"
//                                 onClick={() => toggleQuestion(index)}
//                               >
//                                 <span>{item.question}</span>
//                                 <span className={`transform transition-transform duration-200 ${activeQuestion === index ? 'rotate-180' : ''}`}>
//                                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <polyline points="6 9 12 15 18 9"></polyline>
//                                   </svg>
//                                 </span>
//                               </button>
//                               <div
//                                 className={`px-6 py-0 overflow-hidden transition-all duration-300 ${
//                                   activeQuestion === index ? 'max-h-96 py-4' : 'max-h-0'
//                                 }`}
//                               >
//                                 <p className="text-edizo-gray-700">{item.answer}</p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             </AnimatedSection>

//             <AnimatedSection delay={0.3}>
//               <div className="text-center">
//                 <p className="text-lg mb-4">Can't find what you're looking for?</p>
//                 <Button 
//                   variant="primary" 
//                   onClick={() => document.getElementById('support-form')?.scrollIntoView({ behavior: 'smooth' })}
//                 >
//                   Contact Support
//                 </Button>
//               </div>
//             </AnimatedSection>
//           </div>
//         </div>
//       </section>

//       {/* Support Ticket Form */}
//       <section id="support-form" className="section bg-white">
//         <div className="container-custom">
//           <AnimatedSection>
//             <div className="text-center mb-12">
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">Submit a Support Ticket</h2>
//               <p className="text-lg text-edizo-gray-600 max-w-2xl mx-auto">
//                 Fill out the form below to create a support ticket. Our team will respond to your inquiry as soon as possible.
//               </p>
//             </div>
//           </AnimatedSection>

//           <div className="max-w-2xl mx-auto">
//             <AnimatedSection delay={0.2}>
//               <div className="bg-white p-8 rounded-lg shadow-md border border-edizo-gray-200">
//                 {formSubmitted ? (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="text-center py-8"
//                   >
//                     <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//                     <h4 className="text-xl font-semibold mb-2">Support Ticket Submitted!</h4>
//                     <p className="text-edizo-gray-700 mb-6">
//                       Thank you for reaching out. Your support ticket has been created successfully. Our team will review your inquiry and get back to you as soon as possible.
//                     </p>
//                     <p className="text-edizo-gray-700 mb-6">
//                       You will receive a confirmation email with your ticket number shortly.
//                     </p>
//                     <Button 
//                       variant="outline" 
//                       onClick={() => setFormSubmitted(false)}
//                     >
//                       Submit Another Ticket
//                     </Button>
//                   </motion.div>
//                 ) : (
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                       <label htmlFor="name" className="block text-sm font-medium text-edizo-gray-700 mb-1">
//                         Full Name *
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         required
//                         className="input-field"
//                         placeholder="John Doe"
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="email" className="block text-sm font-medium text-edizo-gray-700 mb-1">
//                         Email Address *
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         required
//                         className="input-field"
//                         placeholder="john@example.com"
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="subject" className="block text-sm font-medium text-edizo-gray-700 mb-1">
//                         Subject *
//                       </label>
//                       <input
//                         type="text"
//                         id="subject"
//                         name="subject"
//                         value={formData.subject}
//                         onChange={handleInputChange}
//                         required
//                         className="input-field"
//                         placeholder="Brief description of your issue"
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="priority" className="block text-sm font-medium text-edizo-gray-700 mb-1">
//                         Priority
//                       </label>
//                       <select
//                         id="priority"
//                         name="priority"
//                         value={formData.priority}
//                         onChange={handleInputChange}
//                         className="input-field"
//                       >
//                         <option value="low">Low - General question or non-urgent issue</option>
//                         <option value="medium">Medium - Issue affecting functionality but has workaround</option>
//                         <option value="high">High - Critical issue affecting business operations</option>
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label htmlFor="message" className="block text-sm font-medium text-edizo-gray-700 mb-1">
//                         Message *
//                       </label>
//                       <textarea
//                         id="message"
//                         name="message"
//                         value={formData.message}
//                         onChange={handleInputChange}
//                         required
//                         rows={6}
//                         className="input-field resize-none"
//                         placeholder="Please provide as much detail as possible about your issue..."
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-edizo-gray-700 mb-1">
//                         Attachments (Optional)
//                       </label>
//                       <div className="border-2 border-dashed border-edizo-gray-300 rounded-lg p-6 text-center">
//                         <input
//                           type="file"
//                           id="attachments"
//                           multiple
//                           className="hidden"
//                         />
//                         <label
//                           htmlFor="attachments"
//                           className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-edizo-gray-100 text-edizo-gray-700 rounded-md hover:bg-edizo-gray-200 transition-colors duration-300"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v4.586L7.707 7.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 8.586V4a1 1 0 00-1-1z" clipRule="evenodd" />
//                             <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
//                           </svg>
//                           Choose Files
//                         </label>
//                         <p className="text-sm text-edizo-gray-500 mt-2">
//                           Drag and drop files here or click to browse
//                         </p>
//                         <p className="text-xs text-edizo-gray-500 mt-1">
//                           Max file size: 10MB (JPG, PNG, PDF, DOC, DOCX)
//                         </p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         id="privacy"
//                         required
//                         className="h-4 w-4 text-edizo-red border-edizo-gray-300 rounded focus:ring-edizo-red"
//                       />
//                       <label htmlFor="privacy" className="ml-2 block text-sm text-edizo-gray-700">
//                         I agree to the <a href="#" className="text-edizo-red hover:underline">Privacy Policy</a> and consent to having my data processed.
//                       </label>
//                     </div>
                    
//                     <Button 
//                       type="submit" 
//                       variant="primary" 
//                       className="flex items-center justify-center w-full"
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <span className="flex items-center">
//                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Submitting...
//                         </span>
//                       ) : (
//                         <span className="flex items-center">
//                           <Send className="mr-2" size={18} /> Submit Ticket
//                         </span>
//                       )}
//                     </Button>
//                   </form>
//                 )}
//               </div>
//             </AnimatedSection>
//           </div>
//         </div>
//       </section>

//       {/* Support Policy Section */}
//       <section className="section bg-edizo-gray-100">
//         <div className="container-custom">
//           <AnimatedSection>
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-3xl font-bold mb-6 text-center">Our Support Policy</h2>
              
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Support Hours</h3>
//                     <p className="text-edizo-gray-700">
//                       Our standard support hours are Monday to Friday, 9:00 AM to 6:00 PM EST. During these hours, we aim to respond to all inquiries as quickly as possible.
//                     </p>
//                   </div>
                  
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Response Times</h3>
//                     <p className="text-edizo-gray-700 mb-3">
//                       Our target response times based on ticket priority:
//                     </p>
//                     <ul className="space-y-2">
//                       <li className="flex items-start">
//                         <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-2 mt-1">High</span>
//                         <span>Critical issues: 1-4 business hours</span>
//                       </li>
//                       <li className="flex items-start">
//                         <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mr-2 mt-1">Medium</span>
//                         <span>Standard issues: 24 business hours</span>
//                       </li>
//                       <li className="flex items-start">
//                         <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2 mt-1">Low</span>
//                         <span>General inquiries: 48 business hours</span>
//                       </li>
//                     </ul>
//                   </div>
                  
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Premium Support</h3>
//                     <p className="text-edizo-gray-700">
//                       For clients with mission-critical applications, we offer premium support plans with extended hours, faster response times, and dedicated support staff. Contact our sales team for more information.
//                     </p>
//                   </div>
                  
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Support Channels</h3>
//                     <p className="text-edizo-gray-700">
//                       We offer support through various channels:
//                     </p>
//                     <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-edizo-gray-700">
//                       <li>Support ticket system (preferred for tracking)</li>
//                       <li>Email support at support@edizo.com</li>
//                       <li>Live chat during business hours</li>
//                       <li>Phone support for emergency issues</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </AnimatedSection>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Support;