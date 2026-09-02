import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import ServicesSection from '../components/ServicesSection';
import VisaServicesSection from '../components/VisaServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import UAEExperiences from '../components/UAEExperiences';
import TravelDeals from '../components/TravelDeals';
import CTABanner from '../components/CTABanner';
import TestimonialCard from '../components/TestimonialCard';
import ConsultationForm from '../components/ConsultationForm';
import PopupCarousel from '../components/PopupCarousel';
import api from '../utils/api';
import { FaStar } from 'react-icons/fa';

const sampleTestimonials = [
  { _id: 1, name: 'Sarah M.', date: 'Oct 12, 2023', rating: 5, title: 'Amazing Experience', review: 'Air Dream made our Dubai trip unforgettable. The desert safari was organized perfectly.', avatarColor: 'blue' },
  { _id: 2, name: 'John D.', date: 'Nov 05, 2023', rating: 5, title: 'Fast Visa Processing', review: 'Got my UAE tourist visa within 48 hours as promised. Very professional service.', avatarColor: 'green' },
  { _id: 3, name: 'Aisha K.', date: 'Dec 20, 2023', rating: 5, title: 'Perfect Honeymoon', review: 'Booked our Bali package with them. Everything from flights to hotels was seamless.', avatarColor: 'pink' }
];

const Home = () => {
  const [testimonials, setTestimonials] = useState(sampleTestimonials);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testimonialsRes = await api.get('/testimonials');
        if (testimonialsRes.data?.length > 0) setTestimonials(testimonialsRes.data);
      } catch (error) {
        console.log('Using fallback data (API not available)');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <PopupCarousel />
      <HeroSlider />
      
      {/* Our Services */}
      <ServicesSection />

      {/* Popular Visa Services */}
      <VisaServicesSection />

      {/* Why Choose Air Dream */}
      <WhyChooseUs />

      {/* UAE Experiences */}
      <UAEExperiences />

      {/* Latest Travel Deals */}
      <TravelDeals />

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary section-title">What Our Clients Say</h2>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div>
              <h3 className="text-2xl font-bold text-dark">Excellent</h3>
              <div className="flex gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-7 h-7 bg-gold flex items-center justify-center rounded-sm">
                    <FaStar className="text-white text-sm" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">Based on <strong>500+ reviews</strong> on <span className="font-bold text-dark inline-flex items-center gap-1"><FaStar className="text-gold" /> Trustpilot</span></p>
            </div>
            <div className="mt-4 md:mt-0">
               <button className="text-primary font-semibold hover:underline">Write a review</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0,3).map(testimonial => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner />

      {/* Consultation Form */}
      <ConsultationForm />
    </div>
  );
};

export default Home;
