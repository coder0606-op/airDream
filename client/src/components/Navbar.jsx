import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUserShield } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Activities', path: '/activities' },
    { name: 'Visas', path: '/visas' },
    { name: 'Tours', path: '/tours' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg py-3' : 'bg-dark/50 backdrop-blur-sm py-5'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-2xl tracking-wide group">
          <img src="/images/logo.jpg" alt="Air Dream" className="h-10 w-10 rounded-full object-cover border border-primary/30 group-hover:border-primary transition-colors duration-300" />
          <span>Air Dream</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.path) ? 'text-primary' : 'text-gray-200'}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/admin/login" className="text-gray-300 hover:text-primary transition-colors" title="Admin Login">
            <FaUserShield size={18} />
          </Link>
          <Link to="/contact" className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-md font-semibold transition-colors shadow-lg shadow-primary/30">
            Get a Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(true)}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-dark z-50 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-800">
              <span className="text-white font-bold text-xl flex items-center gap-2">
                <img src="/images/logo.jpg" alt="Air Dream" className="h-8 w-8 rounded-full object-cover border border-primary/30" /> Air Dream
              </span>
              <button className="text-white p-2" onClick={() => setIsOpen(false)}>
                <FaTimes size={24} />
              </button>
            </div>
            <ul className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-lg font-medium ${isActive(link.path) ? 'text-primary' : 'text-gray-300'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-center mt-4 bg-primary text-white px-4 py-3 rounded-md font-semibold"
                >
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 text-gray-400 hover:text-primary text-sm mt-2 transition-colors"
                >
                  <FaUserShield /> Admin Login
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
