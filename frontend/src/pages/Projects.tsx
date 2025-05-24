import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {  ArrowRight, MapPin,  Shield, Eye, Gamepad } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import AnimatedSection from '../components/common/AnimatedSection';
import headerBackground from '../assets/background image/project.png';
import faceguard from '../assets/project/face-Guard.png';
import ransomware from '../assets/project/Ransomware.png';
import Epicnexus from '../assets/project/Epic-nexus.png';

export const projects = [
  {
    id: 'ai-ransomware-detection',
    title: 'AI-Based Ransomware Detection System',
    category: 'Cybersecurity',
    location: 'Remote / Bangalore, India',
    timeline: 'Q2 2025',
    shortDescription: 'An AI system for detecting and preventing ransomware attacks in real-time',
    fullDescription: 'This advanced cybersecurity solution uses machine learning to detect ransomware behavior patterns before encryption begins. The system combines LSTM networks for sequence analysis with Isolation Forest algorithms for anomaly detection, achieving 98.7% accuracy in our tests. It monitors file system activities, network traffic, and process behaviors to identify threats.',
    tech: ['Python', 'TensorFlow', 'LSTM', 'Isolation Forest', 'PyTorch'],
    features: [
      'Real-time monitoring of system activities',
      'Behavioral analysis of processes',
      'Early detection before encryption starts',
      'Automated threat containment',
      'Detailed threat reporting dashboard'
    ],
    image: ransomware,
    icon: <Shield className="text-blue-500" size={24} />,
    challenges: 'Developing a system that could detect ransomware with minimal false positives while maintaining system performance was our biggest challenge. We solved this by implementing a two-stage detection process.',
    results: 'Reduced ransomware infection risk by 95% for our client base, with less than 0.5% false positive rate in production environments.'
  },
  {
    id: 'faceguard-gan',
    title: 'FaceGuard-GAN Deepfake Detection',
    category: 'Computer Vision & AI',
    location: 'Remote / Singapore',
    timeline: 'Q3 2025',
    shortDescription: 'GAN-powered solution for detecting manipulated facial images and videos',
    fullDescription: 'FaceGuard-GAN is our proprietary deepfake detection system that uses generative adversarial networks to identify manipulated media. The system analyzes subtle facial micro-expressions, lighting inconsistencies, and texture patterns that are often missed by conventional detection methods. It integrates seamlessly with existing identity verification workflows.',
    tech: ['GAN', 'Vision Transformer', 'TensorFlow', 'OpenCV', 'PyTorch'],
    features: [
      'Real-time deepfake detection',
      'API for integration with eKYC systems',
      'Detailed manipulation analysis',
      'Continuous learning from new threats',
      'Multi-modal detection (images & video)'
    ],
    image: faceguard,
    icon: <Eye className="text-green-500" size={24} />,
    challenges: 'Keeping pace with rapidly evolving deepfake generation techniques required us to develop an adaptive learning system that updates its detection models weekly.',
    results: 'Achieved 99.2% accuracy in detecting state-of-the-art deepfakes during independent testing by Singapore\'s Cybersecurity Agency.'
  },
  {
    id: 'epic-nexus-platform',
    title: 'Epic Nexus Gaming Community Platform',
    category: 'Web Development',
    location: 'Remote / San Francisco, CA',
    timeline: 'Q1 2025',
    shortDescription: 'Comprehensive gaming community platform with social features and reviews',
    fullDescription: 'Epic Nexus is a feature-rich gaming platform that brings together gamers, content creators, and hardware enthusiasts. The platform includes forums, game libraries, hardware benchmarking tools, and content sharing capabilities. Our custom recommendation engine personalizes the experience for each user based on their gaming preferences and hardware setup.',
    tech: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'Redis'],
    features: [
      'Personalized game recommendations',
      'Hardware benchmarking tools',
      'Community forums and groups',
      'Content creator portals',
      'Integrated streaming support'
    ],
    image: Epicnexus,
    icon: <Gamepad className="text-purple-500" size={24} />,
    challenges: 'Handling real-time updates across a large user base while maintaining performance required innovative caching strategies and database optimizations.',
    results: 'Grew to 250,000 monthly active users within 6 months of launch, with 78% user retention rate.'
  }
];

const Projects: React.FC = () => {
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
        title={<span className="text-red-500">Our Projects</span>}
        subtitle={<span className="text-white">Innovative solutions delivering real business impact</span>}
        backgroundImage={headerBackground}
      />

      <section className="section bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From cybersecurity to gaming platforms, we build solutions that solve real problems with cutting-edge technology.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="mr-3">
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="mr-1" size={14} />
                      <span>{project.location.split('/')[0].trim()}</span>
                    </div>
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-red-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      Details <ArrowRight className="ml-1" size={16} />
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

export default Projects;