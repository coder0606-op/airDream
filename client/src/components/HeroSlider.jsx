import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa';

const slides = [
  {
    title: 'Your Journey',
    titleHighlight: 'Starts With Air Dream',
    subtitle: 'Flights · Visas · Tours · Umrah — All in One Place',
    image: '/images/hero-dubai.jpg',
  },
  {
    title: 'Fast Track',
    titleHighlight: 'Visa Processing',
    subtitle: 'Get your visa approved quickly. Tourist, Business & Transit visas for 50+ countries.',
    image: '/images/desert-safari.jpg',
  },
  {
    title: 'Unforgettable',
    titleHighlight: 'Dubai Adventures',
    subtitle: 'Desert safaris, dhow cruises, city tours — create memories that last a lifetime.',
    image: '/images/burj-khalifa.jpg',
  },
  {
    title: 'Premium Umrah',
    titleHighlight: '& Holiday Packages',
    subtitle: 'Complete Umrah packages with flights, hotels, and guided tours at competitive prices.',
    image: '/images/dhow-cruise.jpg',
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative h-[85vh] md:h-[90vh] w-full bg-primary flex items-center justify-center overflow-hidden">
      {/* Background Image with Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-primary/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {slide.title}{' '}
              <span className="text-gold">{slide.titleHighlight}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/activities"
            className="bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-lg font-semibold text-base transition-all shadow-lg flex items-center gap-2 w-fit"
          >
            Explore Services
            <FaArrowRight size={14} />
          </Link>
          <a
            href="https://wa.me/971588338927"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/40 text-white px-7 py-3.5 rounded-lg font-semibold text-base transition-all flex items-center gap-2 w-fit"
          >
            <FaWhatsapp size={18} />
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-16 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-500 ${idx === current ? 'w-8 bg-gold' : 'w-3 bg-white/50 hover:bg-white/70'}`}
          />
        ))}
      </div>

      {/* Wave Divider */}
      <div className="wave-divider z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path fill="#ffffff" d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSlider;
