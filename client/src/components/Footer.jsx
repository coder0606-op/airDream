import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTiktok, FaInstagram, FaYoutube, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/images/logo.jpeg" alt="Air Dream" className="h-12 object-contain" />
              <div className="flex flex-col leading-tight">
                <span className="text-white font-bold text-lg">Air Dream</span>
                <span className="text-gold text-[9px] font-semibold tracking-widest uppercase">Travel & Tourism</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted travel partner in Dubai for flights, visas, tours, Umrah and unforgettable experiences worldwide.
            </p>
            {/* Social Icons */}
            <div className="flex gap-2 mt-4">
              <a href="https://www.facebook.com/share/1DyCmLwg1h/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-light transition-colors text-white text-sm"><FaFacebookF /></a>
              <a href="https://www.instagram.com/airdreamtraveltourism" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 transition-colors text-white text-sm"><FaInstagram /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors text-white text-sm"><FaYoutube /></a>
              <a href="https://www.tiktok.com/@airdreamtraveltourism" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gray-700 transition-colors text-white text-sm"><FaTiktok /></a>
              <a href="https://wa.me/971588338927" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-whatsapp transition-colors text-white text-sm"><FaWhatsapp /></a>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-gold mt-1 flex-shrink-0" size={12} />
                <span>Office 401, Al Zarouni Building, Al Rigga, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-gold flex-shrink-0" size={12} />
                <span>+971 58 833 8927</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-gold flex-shrink-0" size={12} />
                <span>info@airdreamtravels.com</span>
              </li>
              <li className="flex items-center gap-2">
                <FaGlobe className="text-gold flex-shrink-0" size={12} />
                <span>www.airdreamtravels.com</span>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/activities" className="hover:text-gold transition-colors">Flights</Link></li>
              <li><Link to="/visas" className="hover:text-gold transition-colors">Visas</Link></li>
              <li><Link to="/tours" className="hover:text-gold transition-colors">UAE Tours</Link></li>
              <li><Link to="/tours" className="hover:text-gold transition-colors">Umrah Packages</Link></li>
              <li><Link to="/tours" className="hover:text-gold transition-colors">Travel Insurance</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Useful Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-gold transition-colors">Terms & Conditions</Link></li>
              <li><Link to="#" className="hover:text-gold transition-colors">Refund Policy</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Follow Us</h4>
            <p className="text-sm mb-4">Stay connected with us on social media for the latest deals and travel updates.</p>
            <a
              href="https://wa.me/971588338927"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp size={16} />
              Chat with us
            </a>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Air Dream Travel & Tourism. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-1">
            Designed with <FaHeart className="text-red-500" size={10} /> in Dubai
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
