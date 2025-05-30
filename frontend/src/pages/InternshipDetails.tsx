import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Calendar,
  Users,
  Wifi,
  Home,
  Check,
  Send,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Placeholder image URLs (to resolve compilation errors) ---
// These are used instead of local image imports.
const placeholderImage = (text: string | number | boolean) => `https://placehold.co/150x150/E0E0E0/666666?text=${encodeURIComponent(text)}`;

// --- Reusable Components (Simplified for this example) ---

// Button component
const Button = ({ children, onClick, type = 'button', variant = 'default', fullWidth = false, className = '', disabled = false }) => {
  const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
    default: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
  };
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className} ${disabledClasses}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// AnimatedSection component
const AnimatedSection = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

// Input Field styling (common class)
const inputFieldClasses = "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200";

// --- Internship Data (with placeholder images) ---
const internshipsData = {
  'ui-ux-design': {
    title: 'UI/UX Design Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    department: 'Computer Science',
    description:
      'Work alongside our design team to create beautiful, intuitive user interfaces and improve user experiences.',
    responsibilities: [
      'Create wireframes, mockups, and prototypes',
      'Conduct user research and usability testing',
      'Design responsive interfaces for web and mobile applications',
      'Create visual assets and design elements',
      'Collaborate with developers to implement designs',
      'Participate in design thinking workshops and brainstorming sessions',
    ],
    requirements: [
      'Currently pursuing a degree in Design, HCI, or related field',
      'Proficiency with Figma, Adobe XD, or Sketch',
      'Understanding of user-centered design principles',
      'Basic knowledge of HTML/CSS',
      'Strong visual design skills and attention to detail',
      'Ability to give and receive constructive feedback',
    ],
    benefits: [
      'Competitive stipend',
      'Flexible working hours',
      'Remote work options',
      'Mentorship from senior designers',
      'Portfolio-worthy projects',
      'Networking opportunities with industry professionals',
    ],
    priceINR: 4500,
    image: placeholderImage('UI/UX')
  },
  'frontend-development': {
    title: 'Frontend Development Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    department: 'Computer Science',
    description:
      'Develop responsive web applications using modern frontend technologies like React, Vue.js, and TypeScript.',
    responsibilities: [
      'Assist in developing responsive web applications',
      'Implement UI components using modern frontend frameworks',
      'Work with backend APIs and databases',
      'Participate in code reviews and team meetings',
      'Debug and fix issues in existing applications',
      'Collaborate with designers to implement UI/UX designs',
    ],
    requirements: [
      'Currently pursuing a degree in Computer Science or related field',
      'Knowledge of HTML, CSS, JavaScript',
      'Familiarity with React, Vue, or Angular',
      'Basic understanding of REST APIs',
      'Good problem-solving skills and attention to detail',
      'Strong communication and teamwork abilities',
    ],
    benefits: [
      'Competitive stipend',
      'Flexible working hours',
      'Remote work options',
      'Mentorship from experienced developers',
      'Opportunity to work on real projects',
      'Networking opportunities with industry professionals',
    ],
    priceINR: 4500,
    image: placeholderImage('Frontend')
  },
  'backend-development': {
    title: 'Backend Development Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    department: 'Computer Science',
    description:
      'Build scalable backend systems using Node.js, Django, or Spring Boot while working with databases and APIs.',
    responsibilities: [
      'Build scalable backend systems using Node.js, Django, or Spring Boot',
      'Work with databases and APIs',
      'Debug and fix backend issues',
      'Write clean, maintainable, and secure code',
      'Collaborate with frontend developers to integrate APIs',
      'Follow best practices for security and performance',
    ],
    requirements: [
      'Currently pursuing a degree in Computer Science or related field',
      'Knowledge of at least one backend language (Node.js, Python, Java)',
      'Experience with databases (SQL or NoSQL)',
      'Understanding of RESTful API development',
      'Problem-solving skills and attention to detail',
      'Team collaboration and communication abilities',
    ],
    benefits: [
      'Competitive stipend',
      'Flexible working hours',
      'Remote work options',
      'Mentorship from experienced engineers',
      'Real-world project experience',
      'Networking opportunities with tech leaders',
    ],
    priceINR: 4500,
    image: placeholderImage('Backend')
  },
  'web-development': {
    title: 'Web Development Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    department: 'Computer Science',
    description:
      'Get practical experience building full-stack web applications using modern frameworks and tools.',
    responsibilities: [
      'Build full-stack web applications',
      'Work with both frontend and backend technologies',
      'Implement responsive UI/UX designs',
      'Work with databases and cloud hosting platforms',
      'Debug and test applications',
      'Collaborate with designers and product managers',
    ],
    requirements: [
      'Currently pursuing a degree in Computer Science or related field',
      'Familiarity with web development basics (HTML, CSS, JS)',
      'Experience with frontend (React, Vue) or backend (Node, Python)',
      'Basic understanding of Git and version control',
      'Good problem-solving skills',
      'Strong communication and teamwork abilities',
    ],
    benefits: [
      'Competitive stipend',
      'Flexible working hours',
      'Remote work options',
      'Mentorship from experienced developers',
      'Hands-on experience with real clients',
      'Networking opportunities with engineering teams',
    ],
    priceINR: 4500,
    image: placeholderImage('WebDev')
  },
  'digital-marketing': {
    title: 'Digital Marketing Intern',
    category: 'paid',
    mode: 'Online',
    duration: '3 months',
    department: 'Computer Science',
    description:
      'Gain hands-on experience in SEO, content marketing, social media strategy, and campaign analytics.',
    responsibilities: [
      'Assist with social media content creation and scheduling',
      'Help develop and implement marketing campaigns',
      'Analyze campaign performance and create reports',
      'Conduct market research and competitor analysis',
      'Support email marketing initiatives',
      'Contribute to SEO and content marketing strategies',
    ],
    requirements: [
      'Currently pursuing a degree in Marketing, Communications, or related field',
      'Understanding of digital marketing principles',
      'Experience with social media platforms',
      'Basic knowledge of SEO and content marketing',
      'Analytical mindset and attention to detail',
      'Strong written and verbal communication skills',
    ],
    benefits: [
      'Competitive stipend',
      'Flexible working hours',
      'Remote work options',
      'Mentorship from marketing professionals',
      'Hands-on experience with marketing tools and platforms',
      'Networking opportunities with industry professionals',
    ],
    priceINR: 4500,
    image: placeholderImage('DigitalMarketing')
  },
  'java-development': {
    title: 'Java Development Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    department: 'Computer Science',
    description:
      'Learn enterprise-level Java development with frameworks like Spring Boot and Hibernate.',
    responsibilities: [
      'Work on enterprise Java applications using Spring Boot and Hibernate',
      'Assist in building and enhancing microservices',
      'Participate in debugging and fixing backend issues',
      'Collaborate with cross-functional teams',
      'Write unit tests and perform code reviews',
      'Follow agile methodologies and sprint planning',
    ],
    requirements: [
      'Currently pursuing a degree in Computer Science or related field',
      'Knowledge of Java and object-oriented programming',
      'Familiarity with Spring Boot or Hibernate is a plus',
      'Basic understanding of RESTful APIs',
      'Strong problem-solving skills',
      'Excellent written and verbal communication',
    ],
    benefits: [
      'Competitive stipend',
      'Flexible working hours',
      'Remote work options',
      'Mentorship from experienced Java developers',
      'Exposure to enterprise-level application architecture',
      'Networking opportunities with IT professionals',
    ],
    priceINR: 4500,
    image: placeholderImage('Java')
  },
  'python-development': {
    title: 'Python Development Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    department: 'Computer Science',
    description:
      'Explore scripting, automation, and backend development using Python and related libraries.',
    responsibilities: [
      'Develop scripts and automation tools',
      'Build backend services using Python frameworks (Django, Flask)',
      'Work with APIs and database integrations',
      'Test and debug Python-based applications',
      'Collaborate with data scientists and ML engineers',
      'Document processes and write clean code',
    ],
    requirements: [
      'Currently pursuing a degree in Computer Science or related field',
      'Proficiency in Python programming',
      'Familiarity with backend frameworks (e.g., Django, Flask)',
      'Understanding of RESTful APIs and JSON',
      'Strong logic and algorithmic thinking',
      'Good communication and teamwork abilities',
    ],
    benefits: [
      'Competitive stipend',
      'Flexible working hours',
      'Remote work options',
      'Mentorship from senior Python developers',
      'Real-world project exposure',
      'Networking opportunities with engineering teams',
    ],
    priceINR: 4500,
    image: placeholderImage('Python')
  },
  'hr-management': {
    title: 'HR Management Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    department: 'Computer Science',
    description:
      'Assist in recruitment, onboarding, employee engagement, and performance management tasks.',
    responsibilities: [
      'Assist in recruitment and interview scheduling',
      'Manage employee onboarding process',
      'Support internal employee engagement initiatives',
      'Maintain HR records and documentation',
      'Coordinate training programs and events',
      'Work with HR software and systems',
    ],
    requirements: [
      'Currently pursuing a degree in Human Resources, Business, or related field',
      'Basic knowledge of HR practices and procedures',
      'Strong organizational and communication skills',
      'Familiarity with Microsoft Office Suite',
      'Ability to handle confidential information professionally',
      'Detail-oriented and proactive attitude',
    ],
    benefits: [
      'Competitive stipend',
      'Flexible working hours',
      'Remote work options',
      'Mentorship from HR professionals',
      'Hands-on experience in human resources',
      'Networking opportunities within the company',
    ],
    priceINR: 4500,
    image: placeholderImage('HR')
  },
  'data-analytics': {
    title: 'Data Analytics Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    department: 'Computer Science',
    description:
      'Analyze real-world datasets, generate insights, and support business decision-making using tools like Python, SQL, and Tableau.',
    responsibilities: [
      'Collect and analyze data from various sources',
      'Create reports and visualizations to communicate findings',
      'Support data-driven decision making across departments',
      'Assist in implementing and maintaining data tracking systems',
      'Help identify trends and patterns in customer behavior',
      'Contribute to predictive modeling and forecasting',
    ],
    requirements: [
      'Currently pursuing a degree in Statistics, Data Science, or related field',
      'Experience with Python, R, Excel, or similar',
      'Basic understanding of SQL and database concepts',
      'Knowledge of data visualization techniques',
      'Strong analytical and problem-solving skills',
      'Attention to detail and ability to work with complex datasets',
    ],
    benefits: [
      'Competitive stipend',
      'Flexible working hours',
      'Remote work options',
      'Mentorship from experienced data analysts',
      'Access to cutting-edge data analysis tools',
      'Networking opportunities with industry professionals',
    ],
    priceINR: 4500,
    image: placeholderImage('DataAnalytics')
  },
  'ai-ml': {
    title: 'AI & Machine Learning Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    department: 'Computer Science',
    description:
      'Work on machine learning models, deep learning projects, and real-world AI use cases.',
    responsibilities: [
      'Build and train machine learning models',
      'Implement deep learning solutions',
      'Work with large datasets and preprocessing',
      'Collaborate with data science and engineering teams',
      'Research and apply latest AI algorithms and techniques',
      'Present findings and contribute to AI-powered products',
    ],
    requirements: [
      'Currently pursuing a degree in CS, Data Science, or related field',
      'Proficiency in Python and ML libraries (Pandas, Scikit-learn, TensorFlow)',
      'Understanding of supervised and unsupervised learning',
      'Experience with Jupyter Notebooks or similar environments',
      'Strong mathematical foundation and analytical thinking',
      'Curiosity and passion for AI and emerging technologies',
    ],
    benefits: [
      'Competitive stipend',
      'Flexible working hours',
      'Remote work options',
      'Mentorship from AI researchers',
      'Hands-on experience with AI models',
      'Networking opportunities with top AI professionals',
    ],
    priceINR: 4500,
    image: placeholderImage('AI/ML')
    },
  'ai-with-chatgpt': {
    title: 'AI with ChatGPT Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    department: 'Computer science',
    description:
      'Explore natural language processing, chatbot development, and prompt engineering using GPT-based models.',
    responsibilities: [
      'Develop chatbots and conversational agents',
      'Fine-tune LLMs and optimize prompts',
      'Integrate NLP models into applications',
      'Evaluate model performance and accuracy',
      'Collaborate with AI engineers and product teams',
      'Contribute to AI research and innovation',
    ],
    requirements: [
      'Currently pursuing a degree in CS, AI, or related field',
      'Understanding of NLP and LLMs',
      'Experience with Python and ML libraries',
      'Familiarity with Hugging Face or LangChain',
      'Strong analytical and technical skills',
      'Passion for AI and language models',
    ],
    benefits: [
      'Competitive stipend',
      'Flexible working hours',
      'Remote work options',
      'Mentorship from NLP experts',
      'Exposure to state-of-the-art AI',
      'Networking with AI and chatbot specialists',
    ],
    priceINR: 4500,
    image: placeholderImage('ChatGPT')
  },
  'Csharp': {
    title: 'C-Sharp Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    department: 'Computer Science',
    description:
      'Learn fundamental syntax, object-oriented programming concepts, and .NET framework fundamentals using C# and related libraries.',
    responsibilities: [
      'Assist in developing applications using C# and the .NET framework, both desktop and web-based',
      'Collaborate with the development team to design, develop, test, and deploy features',
      'Write clean, well-documented, and efficient code following best practices and OOP principles',
      'Work with databases (e.g., SQL Server) and implement data access logic using tools like Entity Framework',
      'Participate in team workflows, including version control (Git), Agile processes, and code reviews',
    ],
    requirements: [
      'Currently pursuing a degree in Computer Science or related field',
      'Familiarity with Visual Studio',
      'Strong logic and algorithmic thinking',
      'Good communication and teamwork abilities',
      'Prior experience in C# programming is appreciated',
      'Understanding of .NET framework is appreciated',
    ],
    benefits: [
      'Understand C# and set up a development environment',
      'Learn C#, including syntax, variables, data types, and operators',
      'Use control structures such as if statements, for loops, and while loops',
      'Understand and apply object-oriented programming (OOP) concepts: classes, objects, and inheritance',
      'Create and use methods to organize your code and make it easier to understand',
      'Handle errors in your code and write code to manage them properly',
      'Write and run C# programs',
    ],
    priceINR: 4500,
    image: placeholderImage('C#')
  },
};

// --- Main InternshipDetails Component ---
const InternshipDetails = () => {
  const { id } = useParams();
  const internshipId = id && id in internshipsData ? id : 'web-development';
  const internship = internshipsData[internshipId];

  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle', 'processing', 'success', 'error'
  const [submissionMessage, setSubmissionMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    message: '',
  });

  // Handle input changes for text fields
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Define the API base URL.
  const API_BASE_URL = 'https://main-webpage-1.onrender.com'; // Render backend URL

  // Handle form submission (directly sends email notifications)
  const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Attempting to submit form with data:', formData);
    setSubmissionStatus('processing');
    setSubmissionMessage('Sending your application and confirmation email...');

    try {
      // 1. Send confirmation email to the applicant
      const applicantRes = await fetch(`${API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'applicationConfirmation',
          name: formData.name,
          email: formData.email,
          internshipTitle: internship?.title || 'Internship',
        }),
      });

      if (!applicantRes.ok) {
        const errorText = await applicantRes.text();
        console.warn('Failed to send confirmation email to applicant:', errorText);
        // Do not throw error here, as admin email might still succeed.
      } else {
        console.log('Confirmation email sent to applicant.');
      }

      // 2. Send application details notification email to the admin
      const adminRes = await fetch(`${API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'internshipApplicationNotification',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          education: formData.education, // Corrected from formData.experience
          experience: formData.experience, // Ensure experience is passed
          message: formData.message,
          internshipTitle: internship?.title || 'Internship',
        }),
      });

      if (!adminRes.ok) {
        const errorText = await adminRes.text();
        throw new Error(`Failed to notify admin: ${adminRes.status} - ${errorText}`);
      }
      console.log('Application notification email sent to admin.');
      setSubmissionStatus('success');
      setSubmissionMessage('Application submitted successfully! A confirmation email has been sent to you.');

      // Reset the form
      setFormData({
        name: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        message: '',
      });
    } catch (error) {
      console.error('Error in sending application emails:', error);
      setSubmissionStatus('error');
      setSubmissionMessage(`Application submission failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4 font-sans">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
        <span className="text-red-600">{internship.title}</span> Internship Application
      </h1>
      

      <section className="section bg-gray-100 w-full max-w-6xl">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Internship Details Section */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Internship Overview</h2>
                <p className="text-lg text-gray-700 mb-8">{internship.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                    <div className="flex items-center">
                      <Calendar className="text-red-500 mr-3" size={20} />
                      <div>
                        <h3 className="font-semibold text-gray-700">Duration</h3>
                        <p className="text-gray-600">{internship.duration}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                    <div className="flex items-center">
                      {internship.mode === 'Online' ? (
                        <>
                          <Wifi className="text-red-500 mr-3" size={20} />
                          <div>
                            <h3 className="font-semibold text-gray-700">Mode</h3>
                            <p className="text-gray-600">Online</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Home className="text-red-500 mr-3" size={20} />
                          <div>
                            <h3 className="font-semibold text-gray-700">Mode</h3>
                            <p className="text-gray-600">Offline</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                    <div className="flex items-center">
                      <Users className="text-red-500 mr-3" size={20} />
                      <div>
                        <h3 className="font-semibold text-gray-700">Department</h3>
                        <p className="text-gray-600">{internship.department}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Responsibilities</h3>
                  <ul className="space-y-3">
                    {internship.responsibilities.map((item: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <Check className="text-red-500 mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    {internship.requirements.map((item: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <Check className="text-red-500 mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Benefits</h3>
                  <ul className="space-y-3">
                    {internship.benefits.map((item: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <Check className="text-red-500 mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            {/* Application Form Section */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.2}>
                <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-24 shadow-md hover:shadow-lg transition-shadow duration-300">
                  {submissionStatus === 'idle' || submissionStatus === 'processing' ? (
                    <>
                      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Apply Now</h3>
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className={inputFieldClasses}
                            placeholder="Enter Name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className={inputFieldClasses}
                            placeholder="Example@gmail.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={inputFieldClasses}
                            placeholder="+1 (123) 456-7890"
                          />
                        </div>
                        <div>
                          <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                            Degree and Branch *
                          </label>
                          <input
                            type="text"
                            id="education"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            required
                            className={inputFieldClasses}
                            placeholder="e.g., B.Tech in Computer Science"
                          />
                        </div>
                        <div>
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                            Relevant Experience
                          </label>
                          <textarea
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            rows={3}
                            className={`${inputFieldClasses} resize-none`}
                            placeholder="Briefly describe your relevant experience..."
                          />
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Cover Letter
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className={`${inputFieldClasses} resize-none`}
                            placeholder="Why are you interested in this internship?"
                          />
                        </div>
                        <Button
                          type="submit"
                          variant="primary"
                          fullWidth
                          className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white"
                          disabled={submissionStatus === 'processing'}
                        >
                          {submissionStatus === 'processing' ? (
                            <Loader2 className="mr-2 animate-spin" size={18} />
                          ) : (
                            <Send className="mr-2" size={18} />
                          )}
                          Submit Application
                        </Button>
                      </form>
                      {submissionStatus === 'processing' && (
                        <div className="mt-4 text-center text-red-600 flex items-center justify-center">
                          <Loader2 className="mr-2 animate-spin" size={20} /> {submissionMessage}
                        </div>
                      )}
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-6"
                    >
                      <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                        {submissionStatus === 'success' ? (
                          <>
                            <CheckCircle className="inline-block mr-2 text-green-600" size={24} />
                            <p className="font-medium">Application Submitted Successfully!</p>
                            <p className="text-sm mt-2">
                              Thank you for applying. A confirmation email has been sent to <span className="font-semibold">{formData.email}</span>. Our team will contact you soon.
                            </p>
                          </>
                        ) : (
                          <>
                            <XCircle className="inline-block mr-2 text-red-600" size={24} />
                            <p className="font-medium">Application Submission Failed!</p>
                            <p className="text-sm mt-2">
                              {submissionMessage || "There was an issue submitting your application or sending the email. Please contact support."}
                            </p>
                          </>
                        )}
                      </div>
                      <Button variant="outline" onClick={() => {
                        setSubmissionStatus('idle');
                        setSubmissionMessage('');
                      }}>
                        Submit Another Application
                      </Button>
                    </motion.div>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternshipDetails;