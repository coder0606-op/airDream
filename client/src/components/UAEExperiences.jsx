import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const experiences = [
  { id: 1, title: 'Desert Safari', image: '/images/desert-safari.jpg', link: '/activities?category=Desert%20Safari' },
  { id: 2, title: 'Dubai City Tour', image: '/images/burj-khalifa.jpg', link: '/activities?category=City%20Tour' },
  { id: 3, title: 'Abu Dhabi Tour', image: '/images/abu-dhabi-mosque.jpg', link: '/activities?category=Abu%20Dhabi' },
  { id: 4, title: 'Marina Cruise', image: '/images/dhow-cruise.jpg', link: '/activities?category=Cruise' },
];

const UAEExperiences = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">UAE Experiences</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={exp.link} className="block group">
                <div className="rounded-2xl overflow-hidden aspect-[3/2]">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-center font-semibold text-gray-900 mt-3 text-lg group-hover:text-primary transition-colors">
                  {exp.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UAEExperiences;
