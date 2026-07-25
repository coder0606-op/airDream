import React from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const WhatsAppFloat = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <a 
        href="tel:+971588338927"
        className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all hover:scale-110 relative group"
        title="Call Us"
      >
        <FaPhoneAlt size={20} />
        <span className="absolute right-14 bg-dark text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          +971 588338927
        </span>
      </a>

      <a 
        href="https://wa.me/971588338927"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110 pulse-button relative group"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={30} />
        <span className="absolute right-16 bg-dark text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with our UAE team
        </span>
      </a>
    </div>
  );
};

export default WhatsAppFloat;
