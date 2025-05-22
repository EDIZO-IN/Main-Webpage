import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-edizo-black text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo isFooter />
            <p className="mt-4 text-edizo-gray-400 max-w-xs">
              Edizo is committed to providing innovative solutions and services to help businesses grow and succeed.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-edizo-silver hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-edizo-silver hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-edizo-silver hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-edizo-silver hover:text-white transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-edizo-gray-400 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-edizo-gray-400 hover:text-white transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/internships" className="text-edizo-gray-400 hover:text-white transition-colors duration-300">
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-edizo-gray-400 hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-edizo-gray-400 hover:text-white transition-colors duration-300">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/web-development" className="text-edizo-gray-400 hover:text-white transition-colors duration-300">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services/mobile-apps" className="text-edizo-gray-400 hover:text-white transition-colors duration-300">
                  Mobile Applications
                </Link>
              </li>
              <li>
                <Link to="/services/digital-marketing" className="text-edizo-gray-400 hover:text-white transition-colors duration-300">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="/services/ui-ux" className="text-edizo-gray-400 hover:text-white transition-colors duration-300">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link to="/services/consulting" className="text-edizo-gray-400 hover:text-white transition-colors duration-300">
                  Business Consulting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 text-edizo-red mt-1 flex-shrink-0" size={18} />
                <span className="text-edizo-gray-400">
                  123 Innovation Drive, Tech Park, Silicon Valley, CA 94024
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-edizo-red flex-shrink-0" size={18} />
                <a href="tel:+11234567890" className="text-edizo-gray-400 hover:text-white transition-colors duration-300">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-edizo-red flex-shrink-0" size={18} />
                <a href="mailto:info@edizo.com" className="text-edizo-gray-400 hover:text-white transition-colors duration-300">
                  info@edizo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-edizo-gray-800 text-center md:flex md:justify-between md:items-center">
          <p className="text-edizo-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Edizo. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex justify-center md:justify-end space-x-6">
              <li>
                <a href="#" className="text-edizo-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-edizo-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-edizo-gray-400 hover:text-white text-sm transition-colors duration-300">
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