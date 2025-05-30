import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

// Assuming 'Logo' is a named export from '../common/Logo'
// If 'Logo' is a default export, change this to: import Logo from '../common/Logo';
import  Logo  from '../common/Logo'; // Corrected import for Logo component

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white"> {/* Replaced bg-edizo-black with bg-gray-900 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"> {/* Replaced container-custom with standard responsive container classes */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div>
            {/* Logo component is now correctly imported and used */}
            <Logo isFooter />
            <p className="mt-4 text-gray-400 max-w-xs">
              Edizo is committed to providing innovative solutions and services to help businesses grow and succeed.
            </p>
            <div className="flex mt-6 space-x-4">
              {/* Social media links with updated hrefs and added YouTube */}
              <a href="https://www.facebook.com/profile.php?id=61576742758066" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/EdizoPvtLtd" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/e.d.i.z.o._official/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/edizo-pvt-ltd-149748367/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a href="https://www.youtube.com/@edizopvtltd" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
                <Youtube size={20} /> {/* YouTube icon */}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/internships" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/web-development" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services/mobile-apps" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Mobile Applications
                </Link>
              </li>
              <li>
                <Link to="/services/digital-marketing" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="/services/ui-ux" className="text-gray-400 hover:text-white transition-colors duration-300">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link to="/services/consulting" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Business Consulting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 text-red-500 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400">
                  Virtual Address
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-red-500 flex-shrink-0" size={18} />
                <a href="tel:+917339316924" className="text-gray-400 hover:text-white transition-colors duration-300">
                  +91 7092435729
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-red-500 flex-shrink-0" size={18} />
                <a href="mailto:edizocorp@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                  e.d.i.z.o.pvt.ltd@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center md:flex md:justify-between md:items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Edizo. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex justify-center md:justify-end space-x-6">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
