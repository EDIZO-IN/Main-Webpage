import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  
  ArrowLeft,
  Check,
  Users,
  BarChart2,
  Cpu,
  Clock
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import AnimatedSection from '../components/common/AnimatedSection';
import { projects } from './Projects';

const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Project Not Found</h2>
          <p className="text-lg text-gray-600 mb-6">
            The project you're looking for doesn't exist or may have been moved.
          </p>
          <Link 
            to="/projects" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  // Set dynamic page title
  React.useEffect(() => {
    document.title = `${project.title} | Our Projects`;
  }, [project.title]);

  return (
    <>
      <PageHeader
        title={project.title}
        subtitle={project.category}
        backgroundImage={project.image}
        className="bg-gradient-to-r from-blue-800 to-purple-900"
      />
     
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <AnimatedSection>
                <div className="mb-8">
                  <Link 
                    to="/projects" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
                  >
                    <ArrowLeft className="mr-1" size={18} />
                    Back to Projects
                  </Link>
                  
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      {project.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
                      <p className="text-lg text-gray-600">{project.shortDescription}</p>
                    </div>
                  </div>

                  <div className="prose max-w-none text-gray-700 mb-8">
                    <p>{project.fullDescription}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Users className="mr-2 text-blue-600" size={20} />
                        Project Highlights
                      </h3>
                      <ul className="space-y-3">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <BarChart2 className="mr-2 text-blue-600" size={20} />
                        Key Results
                      </h3>
                      <p className="text-gray-700">{project.results}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:w-1/3">
              <AnimatedSection delay={0.2}>
                <div className="bg-gray-50 rounded-xl p-6 sticky top-6 shadow-sm border border-gray-200">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 text-gray-500">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Location</h4>
                          <p className="text-gray-600">{project.location}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="mr-3 mt-1 text-gray-500">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Timeline</h4>
                          <p className="text-gray-600">{project.timeline}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="mr-3 mt-1 text-gray-500">
                          <Cpu size={18} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Technologies</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {project.tech.map((tech, i) => (
                              <span key={i} className="bg-white text-gray-800 text-xs px-2 py-1 rounded border">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="mr-3 mt-1 text-gray-500">
                          <Clock size={18} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Challenges</h4>
                          <p className="text-gray-600">{project.challenges}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-xl font-semibold mb-4">Project Gallery</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="aspect-w-1 aspect-h-1">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                        +2 More
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Have a Similar Project in Mind?</h2>
              <p className="text-xl opacity-90 mb-8">
                Let's discuss how we can help bring your vision to life with our expertise.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="inline-block bg-white text-blue-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
                >
                  Contact Our Team
                </Link>
                <Link 
                  to="/projects" 
                  className="inline-block border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold py-3 px-8 rounded-lg transition duration-300"
                >
                  View All Projects
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default ProjectDetails;