import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Wifi, Home, ArrowRight } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import AnimatedSection from '../components/common/AnimatedSection';

import header from '../assets/background image/internship.png';

// Import local images
import webDesign from '../assets/images/web-design.png';
import responsiveDesign from '../assets/images/responsive-design.png';
import backEnd from '../assets/images/back-end.png';
import hrManager from '../assets/images/hr-manager.png';
import dataAnalytics from '../assets/images/data-Analystics.png';
import java from '../assets/images/java.png';
import python from '../assets/images/python.png';
import contentStrategy from '../assets/images/content-strategy.png';
import aiAssistant from '../assets/images/ai-assistant.png';
import aiChatgpt from '../assets/images/AI with CHATGPT.png';
import webDevelopment from '../assets/images/web-development.png';
import Csharp from '../assets/images/c-sharp.png';

// Internship opportunity data
const internships = [
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    description: 'Work alongside our design team to create beautiful, intuitive user interfaces and improve user experiences.',
    image: webDesign,
  },
  {
    id: 'frontend-development',
    title: 'Frontend Development Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    description: 'Develop responsive web applications using modern frontend technologies like React, Vue.js, and TypeScript.',
    image: responsiveDesign,
  },
  {
    id: 'backend-development',
    title: 'Backend Development Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    description: 'Build scalable backend systems using Node.js, Django, or Spring Boot while working with databases and APIs.',
    image: backEnd,
  },
  {
    id: 'hr-management',
    title: 'HR Management Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    description: 'Assist in recruitment, onboarding, employee engagement, and performance management tasks.',
    image: hrManager,
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    description: 'Analyze datasets to uncover insights and support data-driven decisions using tools like Excel, SQL, and Python.',
    image: dataAnalytics,
  },
  {
    id: 'java-development',
    title: 'Java Development Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    description: 'Learn enterprise-level Java development with frameworks like Spring Boot and Hibernate.',
    image: java,
  },
  {
    id: 'python-development',
    title: 'Python Development Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    description: 'Explore scripting, automation, and backend development using Python and related libraries.',
    image: python,
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    description: 'Gain hands-on experience in SEO, content marketing, social media strategy, and campaign analytics.',
    image: contentStrategy,
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    description: 'Work on machine learning models, deep learning projects, and real-world AI use cases.',
    image: aiAssistant,
  },
  {
    id: 'ai-with-chatgpt',
    title: 'AI with ChatGPT Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    description: 'Explore natural language processing, chatbot development, and prompt engineering using GPT-based models.',
    image: aiChatgpt,
  },
  {
    id: 'web-development',
    title: 'Web Development Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    description: 'Get practical experience building full-stack web applications using modern frameworks and tools.',
    image: webDevelopment,
  },
  {
    id: 'Csharp',
    title: 'C-Sharp Intern',
    category: 'Paid',
    mode: 'Online',
    duration: '3 months',
    description: 'Get practical experience building full-stack web applications using modern frameworks and tools.',
    image: Csharp,
  },
];

const Internships: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <>
      <PageHeader
        title={<span className="text-red-500">Internship Opportunities</span>}
        subtitle={<span className="text-white">Jumpstart your career with real-world experience in a dynamic, innovative environment,</span>}
        backgroundImage={header}
      />
      <section className="section bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Internships</h2>
              <p className="text-lg text-edizo-gray-600 max-w-2xl mx-auto">
                Apply for one of our internship programs and gain valuable experience working with industry experts on real projects.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={internship.image}
                    alt={internship.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-edizo-red text-white text-xs px-3 py-1 rounded-full">
                      {internship.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{internship.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{internship.description}</p>
                  <div className="flex space-x-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      {internship.mode === 'Online' ? (
                        <>
                          <Wifi className="mr-2 text-edizo-red" size={16} />
                          <span>Online</span>
                        </>
                      ) : (
                        <>
                          <Home className="mr-2 text-edizo-red" size={16} />
                          <span>Offline</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="mr-2 text-edizo-red" size={16} />
                      <span>{internship.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/internships/${internship.id}`}
                      className="text-edizo-red font-medium hover:underline flex items-center"
                    >
                      Details <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Internships;