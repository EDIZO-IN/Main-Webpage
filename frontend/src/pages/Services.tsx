import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PenTool,
  Video,
  Image as ImageIcon,
  Code,
  ArrowRight
} from 'lucide-react';

import PageHeader from '../components/common/PageHeader';
import AnimatedSection from '../components/common/AnimatedSection';
import headerBackground from '../assets/background image/service.png';

// Import local service images
import webDevImg from '../assets/services/web development.png'; // Assuming this image exists
import uiuxImg from '../assets/services/Uiux.png'; // Assuming this image exists
import videoEditingImg from '../assets/services/Video editing.png'; // Assuming this image exists
import graphicDesignImg from '../assets/services/Graphics Design.png'; // Assuming this image exists


// Service data - Limited to 4 services as requested
const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom web solutions that drive business growth with responsive, performant websites and applications.',
    icon: Code,
    image: webDevImg, // Using local image
    primaryColor: 'bg-blue-600',
    secondaryColor: 'text-blue-600',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'User-centered design solutions that create intuitive, engaging interfaces for digital products.',
    icon: PenTool,
    image: uiuxImg, // Using local image
    primaryColor: 'bg-red-600',
    secondaryColor: 'text-red-600',
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Professional video editing services to bring your creative vision to polished final products.',
    icon: Video,
    image: videoEditingImg, // Using local image
    primaryColor: 'bg-indigo-600',
    secondaryColor: 'text-indigo-600',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Creative visual content for branding and marketing tailored to your business identity.',
    icon: ImageIcon,
    image: graphicDesignImg, // Using local image
    primaryColor: 'bg-pink-600',
    secondaryColor: 'text-pink-600',
  },
];

const Services: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <>
     
      <PageHeader
        title={<span className="text-red-500">Our Services</span>}
        subtitle={<span className="text-white">Comprehensive digital solutions tailored to your business needs</span>}
        backgroundImage={headerBackground}
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                High-quality services designed to elevate your digital presence and drive business growth.
              </p>
            </div>
          </AnimatedSection>

          {/* Adjusted grid for 4 items, ensuring responsiveness */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/600x400/CCCCCC/333333?text=${service.title.replace(/\s/g, '+')}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className={`${service.primaryColor} w-12 h-12 rounded-lg flex items-center justify-center mb-2`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Link
                      to={`/services/${service.id}`}
                      className={`inline-flex items-center ${service.secondaryColor} font-medium hover:underline`}
                    >
                      Learn more <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Custom Solution?</h2>
              <p className="text-xl mb-8 opacity-90">
                We specialize in creating tailored solutions that perfectly fit your business requirements.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
              >
                Get a Free Consultation
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
