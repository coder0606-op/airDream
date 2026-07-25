import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StatsSection = () => {
  const stats = [
    { number: "2M+", label: "Travellers Served" },
    { number: "18+", label: "Years Of Experience" },
    { number: "100+", label: "Destinations Covered" },
    { number: "24/7", label: "Travel Assistance" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6 leading-tight">
              Travel That Changes The Way You See The World
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              At Air Dream Travel & Tourism, we believe travel is more than just visiting a place; it's about experiencing it. Based in the heart of Dubai, we have been crafting unforgettable journeys, seamless visa processing, and exceptional holiday packages for our clients globally.
            </p>
            <div className="flex gap-4">
              <Link to="/activities" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md font-semibold transition-colors shadow-lg shadow-primary/20">
                Explore Services
              </Link>
              <Link to="/contact" className="border-2 border-dark text-dark hover:bg-dark hover:text-white px-6 py-3 rounded-md font-semibold transition-colors">
                Speak to an Expert
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                <span className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.number}</span>
                <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;
