import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  { id: 1, title: 'Worldwide Air Tickets', image: '/images/service-air-tickets.jpg', link: '#' },
  { id: 2, title: 'Visit Visas', image: '/images/service-visit-visas.jpg', link: '#' },
  { id: 3, title: 'GCC Resident Visas', image: '/images/service-gcc-visas.jpg', link: '#' },
  { id: 4, title: 'Umrah Packages', image: '/images/service-umrah.jpg', link: '#' },
  { id: 5, title: 'Dubai Tours & Desert Safari', image: '/images/service-dubai-tours.jpg', link: '#' },
  { id: 6, title: 'Marina Cruise & Activities', image: '/images/service-marina-cruise.jpg', link: '#' },
];

const ServicesSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Link to={service.link} className="block bg-white border border-gray-100 rounded-xl p-4 text-center hover:shadow-lg transition-shadow h-full flex flex-col items-center justify-start">
                <div className="h-[150px] w-full flex items-center justify-center mb-4">
                  <img src={service.image} alt={service.title} className="max-h-full max-w-full object-contain" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-gray-800">{service.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
