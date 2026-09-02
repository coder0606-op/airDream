import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUserShield, FaWhatsapp } from 'react-icons/fa';
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
    { name: 'Visas', path: '/visas' },
    { name: 'Experiences', path: '/activities' },
    { name: 'Packages', path: '/tours' },
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
            ? 'bg-white shadow-lg'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 h-16 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/images/logo.jpeg" alt="Air Dream Travel & Tourism" className="h-12 object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="text-primary font-bold text-xl tracking-wide">Air Dream</span>
              <span className="text-gold text-[10px] font-semibold tracking-widest uppercase">Travel & Tourism</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex gap-5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-sm font-medium transition-colors relative pb-1 ${
                      isActive(link.path)
                        ? 'text-primary border-b-2 border-gold'
                        : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              to="/admin/login"
              className="text-gray-400 hover:text-primary"
            >
              <FaUserShield size={16} />
            </Link>

            <a
              href="https://wa.me/971588338927"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 transition-colors shadow-md"
            >
              <FaWhatsapp size={18} />
              WhatsApp Us
            </a>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-primary"
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
              className="fixed top-0 left-0 h-screen w-72 bg-white z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="h-16 px-5 flex justify-between items-center border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logo.jpeg"
                    alt="Air Dream"
                    className="h-10 object-contain"
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="text-primary font-bold text-lg">Air Dream</span>
                    <span className="text-gold text-[9px] font-semibold tracking-widest uppercase">Travel & Tourism</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500"
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
                    className={`block px-6 py-4 text-base font-medium transition border-l-4 ${
                      isActive(link.path)
                        ? 'bg-primary/5 text-primary border-l-gold'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary border-l-transparent'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Admin Link for Mobile */}
                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-4 text-base font-medium transition border-l-4 border-l-transparent text-gray-700 hover:bg-gray-50 hover:text-primary flex items-center gap-3`}
                >
                  <FaUserShield className="text-gray-400" />
                  Admin Login
                </Link>
              </div>

              <div className="border-t border-gray-200 p-5 space-y-4">
                <a
                  href="https://wa.me/971588338927"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  <FaWhatsapp size={20} />
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;