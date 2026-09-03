import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const visas = [
  { id: 1, country: 'Saudi Arabia', type: 'Multiple Entry Visa', price: '450', currency: 'AED', image: '/images/passport-saudi.jpg', link: '/visas', isWhatsapp: false },
  { id: 2, country: 'Qatar', type: 'Visit Visa', price: '350', currency: 'AED', image: '/images/passport-qatar.jpg', link: '/contact', isWhatsapp: false },
  { id: 3, country: 'Oman', type: 'Visit Visa', price: '250', currency: 'AED', image: '/images/passport-oman.jpg', link: '/contact', isWhatsapp: false },
  { id: 4, country: 'UAE', type: 'Visit Visa', price: '350', currency: 'AED', image: '/images/passport-uae.jpg', link: '/contact', isWhatsapp: false },
  { id: 5, country: 'Pakistan / India', type: 'Visa Services', price: '200', currency: 'AED', image: '/images/service-visit-visas.jpg', link: '/contact', isWhatsapp: false },
  { id: 6, country: 'WhatsApp Inquiry', type: 'Get Instant Help', link: 'https://wa.me/971588338927', isWhatsapp: true },
];

const VisaServicesSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">Popular Visa Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visas.map((visa) => (
            visa.isWhatsapp ? (
              <div key={visa.id} className="bg-green-500 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-white text-center h-full">
                <FaWhatsapp className="text-6xl mb-4" />
                <h3 className="text-xl font-bold mb-2">{visa.country}</h3>
                <p className="text-green-100 mb-6">{visa.type}</p>
                <a href={visa.link} target="_blank" rel="noopener noreferrer" className="bg-white text-green-600 font-bold rounded-lg px-6 py-2 hover:bg-gray-100 transition-colors">
                  WhatsApp Inquiry
                </a>
              </div>
            ) : (
              <div key={visa.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center h-full">
                <div className="h-[140px] w-full flex items-center justify-center mb-4">
                  <img src={visa.image} alt={visa.country} className="max-h-full max-w-full object-contain" />
                </div>
                <h3 className="text-lg font-bold text-[#0a2351] mb-1">{visa.country}</h3>
                <p className="text-sm text-gray-500 mb-2">{visa.type}</p>
                {visa.price && (
                  <div className="text-xl font-black text-[#0a2351] mb-6">
                    <span className="text-sm font-semibold text-gray-400 mr-1">From</span>
                    {visa.currency} {visa.price}
                  </div>
                )}
                <div className="mt-auto">
                  <Link to={visa.link} className="inline-block bg-primary text-white font-medium rounded-lg px-6 py-2 hover:opacity-90 transition-opacity">
                    Apply Now
                  </Link>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaServicesSection;
