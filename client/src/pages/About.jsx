import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatsSection from '../components/StatsSection';
import { FaPlane, FaPassport, FaGlobe, FaHeadset, FaHotel, FaShieldAlt, FaWhatsapp } from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    { icon: <FaPlane />, title: 'Flight Booking', desc: 'Best deals on domestic & international flights with 24/7 support.' },
    { icon: <FaPassport />, title: 'Visa Services', desc: 'Fast-track & regular visa processing for 50+ countries worldwide.' },
    { icon: <FaGlobe />, title: 'Holiday Packages', desc: 'Customized holiday packages for families, couples, and groups.' },
    { icon: <FaHotel />, title: 'Hotel Booking', desc: 'Premium hotel reservations at the best rates across the globe.' },
    { icon: <FaHeadset />, title: '24/7 Support', desc: 'Round-the-clock travel assistance for all your needs.' },
    { icon: <FaShieldAlt />, title: 'Travel Insurance', desc: 'Comprehensive travel insurance for worry-free journeys.' }
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-24 bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div {...fadeUp} className="max-w-3xl">
            <span className="inline-block bg-primary/20 text-primary-light px-4 py-1.5 rounded-full text-sm font-semibold mb-6">About Us</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Trusted Travel <span className="text-primary-light">Partner in Dubai</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
              Air Dream Travel & Tourism is a leading travel agency based in the heart of Dubai, UAE. 
              We specialize in creating unforgettable travel experiences through our curated holiday packages, 
              fast-track visa processing, and exceptional customer service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3 mb-6">Making Travel Dreams Come True</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe that every journey should be extraordinary. Our team of dedicated travel experts works tirelessly 
                to ensure that every trip we plan is seamless, enjoyable, and memorable. From the moment you enquire to 
                the moment you return home, we're with you every step of the way.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                With years of experience in the travel industry and strong partnerships with airlines, hotels, and local 
                tour operators worldwide, we offer competitive pricing without compromising on quality.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link to="/contact" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-primary/20">
                  Get a Free Quote
                </Link>
                <a href="https://wa.me/971588338927" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all">
                  <FaWhatsapp /> WhatsApp Us
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="/images/desert-safari.jpg" alt="Desert Safari" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
                  <img src="/images/burj-khalifa.jpg" alt="Burj Khalifa" className="w-full h-64 object-cover rounded-2xl shadow-lg" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src="/images/dhow-cruise.jpg" alt="Dhow Cruise" className="w-full h-64 object-cover rounded-2xl shadow-lg" />
                  <img src="/images/quad-biking.jpg" alt="Quad Biking" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-5 rounded-2xl shadow-2xl">
                <p className="text-3xl font-black">18+</p>
                <p className="text-sm font-medium opacity-90">Years Experience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3">Our Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Plan Your Dream Trip?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today and let our travel experts create the perfect itinerary for you.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg shadow-primary/30">
                Contact Us
              </Link>
              <a href="tel:+971588338927" className="border-2 border-white/30 text-white hover:border-primary-light hover:text-primary-light px-8 py-4 rounded-lg font-semibold text-lg transition-all">
                Call +971 588338927
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
