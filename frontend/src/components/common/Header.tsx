// src/components/Header.tsx

import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Internships', path: '/internships' },
    { name: 'Contact', path: '/contact' },
    // { name: 'Support', path: '/support' },
  ];

  return (
    <header
      className={`fixed w-full z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between px-4 md:px-8">
        {/* Logo Section */}
        <Link to="/" className="z-20">
          {/* The Logo component should handle its color based on the `isScrolled` prop */}
          <Logo isScrolled={isScrolled} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-edizo-red after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-edizo-red'
                    : isScrolled
                    ? 'text-gray-900 hover:text-edizo-red' // Dark text for scrolled (white) background
                    : 'text-white hover:text-edizo-red' // White text for transparent background
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-30 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMenuOpen ? (
            // Ensure 'X' icon is visible on white background
            <X className={`w-7 h-7 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
          ) : (
            // Ensure 'Menu' icon is visible on white background
            <Menu className={`w-7 h-7 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-20"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-white z-30 shadow-lg flex flex-col justify-between"
            >
              <div className="p-6">
                <nav className="flex flex-col gap-6 text-lg">
                  {links.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      className={({ isActive }) =>
                        `font-semibold ${
                          isActive ? 'text-edizo-red' : 'text-gray-900 hover:text-edizo-red'
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </nav>
              </div>
              <div className="p-4 text-sm text-gray-400 text-center">
                © 2025 Edizo. All rights reserved.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
