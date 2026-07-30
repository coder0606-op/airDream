import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 pt-16 pb-6">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-2xl tracking-wide mb-4">
              <img src="/images/logo.jpg" alt="Air Dream" className="h-10 w-10 rounded-full object-cover border border-primary/30" />
              <span>Air Dream</span>
            </Link>
            <p className="text-sm mb-4">Contact our Travel agent for customized holiday packages and visa assistance.</p>
            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <span>Hor Al Anz, Deira, Dubai, United Arab Emirates</span>
              </p>
              <p><strong>Office:</strong> Mon-Fri 9:30 AM - 7:00 PM</p>
              <p><strong>Phone:</strong> +971 588338927</p>
              <p><strong>Email:</strong> airdreamtraveltourism@gmail.com</p>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"><FaFacebookF /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"><FaTwitter /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"><FaInstagram /></a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/activities" className="hover:text-primary transition-colors">Flight Booking</Link></li>
              <li><Link to="/visas" className="hover:text-primary transition-colors">Visa Services</Link></li>
              <li><Link to="/activities" className="hover:text-primary transition-colors">Activities & Tours</Link></li>
              <li><Link to="/tours" className="hover:text-primary transition-colors">Holiday Packages</Link></li>
              <li><Link to="/activities" className="hover:text-primary transition-colors">Hotel Booking</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Visit Us</h4>
            <div className="w-full h-48 md:h-32 rounded-lg overflow-hidden border border-gray-700">
              <iframe
                title="Air Dream Location - Hor Al Anz, Deira, Dubai"
                src="https://maps.google.com/maps?q=Hor%20Al%20Anz%2C%20Deira%2C%20Dubai%2C%20United%20Arab%20Emirates&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Air Dream Travel & Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
