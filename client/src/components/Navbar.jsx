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

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Activities', path: '/activities' },
    { name: 'Visas', path: '/visas' },
    { name: 'Tours', path: '/tours' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg'
            : 'bg-slate-900/95 backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 h-16 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/images/logo.jpeg" alt="Air Dream Travel & Tourism" className="h-12 object-contain bg-white rounded-sm p-1" />
            <span className="text-white font-bold text-2xl tracking-wide">Air Dream</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`transition-colors ${
                      isActive(link.path)
                        ? 'text-primary-light'
                        : 'text-gray-200 hover:text-primary-light'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              to="/admin/login"
              className="text-gray-300 hover:text-primary-light"
            >
              <FaUserShield size={18} />
            </Link>

            <Link
              to="/contact"
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-md font-semibold"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-white"
          >
            <FaBars size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-screen w-72 bg-slate-900 z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="h-16 px-5 flex justify-between items-center border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logo.jpeg"
                    alt="Air Dream"
                    className="h-10 object-contain bg-white rounded-sm p-1"
                  />
                  <span className="text-white font-bold text-xl">
                    Air Dream
                  </span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white"
                >
                  <FaTimes size={22} />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-6 py-4 text-lg transition ${
                      isActive(link.path)
                        ? 'bg-primary text-white'
                        : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Bottom */}
              <div className="border-t border-slate-700 p-5 space-y-4">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold"
                >
                  Get a Quote
                </Link>

                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center gap-2 text-gray-400 hover:text-white"
                >
                  <FaUserShield />
                  Admin Login
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;