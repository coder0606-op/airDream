import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlane, FaPassport, FaHotel, FaUmbrellaBeach } from 'react-icons/fa';

const slides = [
  {
    title: 'Discover Your Dream Destination',
    subtitle: 'Experience the world with Air Dream Travel & Tourism. Premium tours, fast-track visas, and unforgettable adventures.',
    image: '/images/hero-dubai.jpg',
    icon: <FaPlane />,
  },
  {
    title: 'Fast Track Visa Processing',
    subtitle: 'Get your visa approved quickly with our expert team. Tourist, Business & Transit visas for 50+ countries.',
    image: '/images/desert-safari.jpg',
    icon: <FaPassport />,
  },
  {
    title: 'Luxury Hotel Bookings',
    subtitle: 'From 5-star resorts to cozy boutique hotels, find the perfect stay for your dream vacation.',
    image: '/images/burj-khalifa.jpg',
    icon: <FaHotel />,
  },
  {
    title: 'Unforgettable Adventures',
    subtitle: 'Desert safaris, dhow cruises, city tours and more — create memories that last a lifetime.',
    image: '/images/dhow-cruise.jpg',
    icon: <FaUmbrellaBeach />,
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
    <div className="relative h-screen w-full bg-dark flex items-center justify-center overflow-hidden">
      {/* Background Image with Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark/80" />
        </motion.div>
      </AnimatePresence>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-[1] opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-primary-light text-sm font-medium mb-6">
              {slide.icon}
              <span>Air Dream Travel & Tourism</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
              {slide.title.split(' ').map((word, i) => (
                <span key={i}>
                  {i >= slide.title.split(' ').length - 2 ? (
                    <span className="text-primary-light">{word} </span>
                  ) : (
                    <span>{word} </span>
                  )}
                </span>
              ))}
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/tours" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5">
            Explore Tours
          </Link>
          <Link to="/contact" className="border-2 border-white/50 hover:border-primary-light hover:text-primary-light text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all backdrop-blur-sm hover:-translate-y-0.5">
            Get a Free Quote
          </Link>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === current ? 'w-8 bg-primary' : 'w-4 bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
