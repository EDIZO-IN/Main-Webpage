import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Star,
  ArrowRight,
  PenTool,
  Video,
  ImageIcon,
  Code,
  Briefcase,
} from 'lucide-react';

// Custom Components
import AnimatedSection from '../components/common/AnimatedSection';
import Button from '../components/common/Button';

// Service Images
import uiuxImg from '../assets/services/Uiux.png';
import videoImg from '../assets/services/Video editing.png';
import graphicImg from '../assets/services/Graphics Design.png';
import webDevImg from '../assets/services/web development.png';

// Project Images
import faceguard from '../assets/project/face-Guard.png';
import ransomware from '../assets/project/Ransomware.png';
import Epicnexus from '../assets/project/Epic-nexus.png';

// Background Image
import backgroundimage from '../assets/background image/home.webp';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Hide loader after 1.2s
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.25 } },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 15 },
    },
    hover: {
      scale: 1.03,
      boxShadow: '0px 12px 30px rgba(0,0,0,0.15)',
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      {/* Loader */}
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ loop: Infinity, duration: 2, ease: 'linear' }}
            className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full"
          />
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${backgroundimage})`,
            filter: 'brightness(0.7) contrast(1.1)',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="container mx-auto px-4 relative z-10 text-white pt-24 md:pt-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
                Innovative <span className="text-red-500">Solutions</span> for Tomorrow's Challenges
              </h1>
              <p className="text-lg md:text-xl text-white mb-8 max-w-lg">
                We help businesses transform and grow through cutting-edge technology solutions and strategic consulting.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" to="/services">
                  Explore Services
                </Button>
                <Button variant="outline" size="lg" to="/contact">
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white hidden md:block"
          >
            <ChevronDown className="w-10 h-10" />
          </motion.div>
        </motion.div>
      </section>

{/* Services Section */}
<section className="section bg-white py-20">
  <div className="container mx-auto px-4">
    <AnimatedSection>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Our Premium Services
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
        We offer specialized services tailored to help your brand stand out visually and digitally.
      </p>
    </AnimatedSection>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {[
        {
          title: 'UI/UX Design',
          desc: 'Create intuitive and engaging digital experiences through user-centered design principles that enhance usability and aesthetics.',
          icon: <PenTool />,
          image: uiuxImg,
          link: '/services/ui-ux',
        },
        {
          title: 'Video Editing',
          desc: 'Professional video editing services to bring your creative vision to life — from raw footage to polished final product.',
          icon: <Video />,
          image: videoImg,
          link: '/services/video-editing',
        },
        {
          title: 'Graphic Design',
          desc: 'Creative visual content creation for branding, marketing, and digital media tailored to your business identity.',
          icon: <ImageIcon />,
          image: graphicImg,
          link: '/services/graphic-design',
        },
        {
          title: 'Web Development',
          desc: 'Building responsive, scalable, and secure websites and web applications tailored to your business needs and objectives.',
          icon: <Code />,
          image: webDevImg,
          link: '/services/web-development',
        },
      ].map((service, i) => (
        <div key={i} className="card p-6 rounded-xl hover:shadow-2xl transition-all duration-300 group">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md"
          />
          <div className="bg-red-500 rounded-full w-14 h-14 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300 mx-auto">
            {service.icon}
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center">{service.title}</h3>
          <p className="text-gray-700 mb-4 text-center">{service.desc}</p>
          <div className="text-center">
            <Link
              to={service.link}
              className="inline-flex items-center text-red-500 font-medium hover:underline"
            >
              Learn more <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>

    <AnimatedSection delay={0.4}>
      <div className="text-center mt-12">
        <Button variant="primary" to="/services">
          View All Services
        </Button>
      </div>
    </AnimatedSection>
  </div>
</section>

      {/* Projects Section */}
      <section className="section bg-white py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.h2
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 10 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-center"
            >
              Featured Projects
            </motion.h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
              A glimpse into some of our most impactful and innovative work, crafted to solve real-world challenges.
            </p>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            {[
              {
                title: 'AI-Based Ransomware Detection System',
                shortDescription: 'An AI system for detecting and preventing ransomware attacks in real-time',
                image: ransomware,
                link: '/projects/s',
              },
              {
                title: 'FaceGuard-GAN Deepfake Detection',
                shortDescription: 'GAN-powered solution for detecting manipulated facial images and videos',
                image: faceguard,
                link: '/projects/ecommerce-automation',
              },
              {
                title: 'Epic Nexus Gaming Community Platform',
                shortDescription: 'Comprehensive gaming community platform with social features and reviews',
                image: Epicnexus,
                link: '/projects/faceguard-gan',
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{
                  y: -10,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: { duration: 0.3 },
                }}
                className="rounded-xl overflow-hidden shadow-lg group transition-all duration-300 bg-white"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.shortDescription}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection delay={0.4}>
            <div className="text-center mt-12">
              <Button variant="primary" to="/projects">
                View All Projects
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Internship Section */}
      <section className="section bg-gradient-to-r from-gray-100 to-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Internship Program</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Gain real-world experience working with industry experts in a fast-paced, innovative environment.
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <Star className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Hands-on training with cutting-edge technologies</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Mentorship from industry professionals</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Opportunity to work on real client projects</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Potential for full-time employment</span>
                  </li>
                </ul>
                <Button variant="primary" to="/internships">
                  Browse Opportunities
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <motion.div
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 12px 30px rgba(0,0,0,0.2)',
                }}
                className="rounded-xl shadow-xl w-72 h-auto border border-gray-200 backdrop-blur-md bg-white/20 p-8 flex flex-col items-center justify-center text-center"
                style={{ perspective: 600, transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  whileHover={{ rotateY: 10, rotateX: -10 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="mb-4"
                >
                  <Briefcase className="h-12 w-12 text-orange-500" />
                </motion.div>
                <h3 className="font-bold text-xl text-orange-500 mb-2">Launch Your Career</h3>
                <p className="text-gray-700 text-sm">Explore internship roles.</p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section bg-gradient-to-r from-red-700 to-orange-800 text-white py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl mb-8">
                Let's discuss how Edizo can help you achieve your business goals through innovative solutions and strategic guidance.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="secondary" size="lg" to="/contact" className="text-black font-semibold">
                  Contact Us
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  to="/services"
                  className="text-white border-white hover:bg-white hover:text-red-500"
                >
                  Explore Services
                </Button>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Home;