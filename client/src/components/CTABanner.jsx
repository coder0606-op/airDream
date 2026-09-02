import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const CTABanner = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Planning Your Next Trip?
            </h2>
            <p className="text-lg text-gray-200">
              Talk to Our Travel Team Today
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <a 
              href="https://wa.me/971588338927"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gold hover:bg-gold-light text-primary-dark font-bold py-3 px-6 rounded-full transition-transform hover:scale-105 shadow-lg mb-2"
            >
              <FaWhatsapp className="text-2xl" />
              +971 58 833 8927
            </a>
            <p className="text-sm text-gray-300">
              We're Just a WhatsApp Away!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
