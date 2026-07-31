import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import api from '../utils/api';
import toast from 'react-hot-toast';

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    destination: '',
    serviceRequired: 'Flight',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/enquiries', formData);
      toast.success('Enquiry submitted successfully! We will contact you soon.');
      setFormData({
        fullName: '', phone: '', email: '', city: '', destination: '', serviceRequired: 'Flight', message: ''
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-primary/5 hidden lg:block z-0"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side - Contact Info */}
          <div className="lg:w-2/5 bg-dark text-white p-10 lg:p-14">
            <span className="bg-primary/20 text-primary-light text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-6 inline-block">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Plan Your Next Adventure With Us</h2>
            <p className="text-gray-400 mb-10 text-sm md:text-base">
              Ready to start your journey? Fill out the form or contact our team directly for personalized travel assistance and exclusive deals.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg"><FaPhoneAlt className="text-primary-light" /></div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Call or WhatsApp</p>
                  <p className="font-semibold">+971 588338927</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg"><FaEnvelope className="text-primary-light" /></div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email Address</p>
                  <p className="font-semibold">airdreamtraveltourism@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg"><FaClock className="text-primary-light" /></div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Office Hours</p>
                  <p className="font-semibold">Mon-Fri: 9:30 AM - 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg"><FaMapMarkerAlt className="text-primary-light" /></div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Location</p>
                  <p className="font-semibold">Dubai, United Arab Emirates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-3/5 p-10 lg:p-14 bg-white">
            <h3 className="text-2xl font-bold text-dark mb-6">Request a Consultation</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50" placeholder="+971 50 123 4567" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50" placeholder="Dubai" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel Destination *</label>
                  <input type="text" name="destination" required value={formData.destination} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50" placeholder="e.g. Europe, Bali" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Required *</label>
                  <select name="serviceRequired" required value={formData.serviceRequired} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 appearance-none">
                    <option>Flight</option>
                    <option>Visa</option>
                    <option>Hotel</option>
                    <option>Holiday Package</option>
                    <option>Activities</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                <textarea name="message" rows="4" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 resize-none" placeholder="Tell us more about your travel plans..."></textarea>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2">
                {loading ? 'Submitting...' : <><FaPaperPlane /> Submit Enquiry</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
