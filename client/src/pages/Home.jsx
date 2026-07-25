import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import TourCard from '../components/TourCard';
import VisaCard from '../components/VisaCard';
import TestimonialCard from '../components/TestimonialCard';
import StatsSection from '../components/StatsSection';
import ConsultationForm from '../components/ConsultationForm';
import ScrollCarousel from '../components/ScrollCarousel';
import api from '../utils/api';
import { FaStar } from 'react-icons/fa';

const sampleTours = [
  { _id: 1, title: 'Desert Safari Dubai with BBQ Dinner', duration: { days: 1, nights: 0 }, rating: 5, price: 150, originalPrice: 200, category: 'Adventure' },
  { _id: 2, title: 'Burj Khalifa At The Top - Floor 124 & 125', duration: { days: 1, nights: 0 }, rating: 4.8, price: 180, originalPrice: 220, category: 'Sightseeing' },
  { _id: 3, title: 'Georgia 4 Days Holiday Package', duration: { days: 4, nights: 3 }, rating: 5, price: 1200, originalPrice: 1500, category: 'Holiday' },
  { _id: 4, title: 'Bali 6 Days Romantic Getaway', duration: { days: 6, nights: 5 }, rating: 5, price: 2500, originalPrice: 3000, category: 'Honeymoon' }
];

const sampleVisas = [
  { _id: 1, country: 'UAE', type: 'Tourist Visa', price: 350, originalPrice: 400, isFastTrack: true, getOnDate: '2 Days' },
  { _id: 2, country: 'Schengen', type: 'Visit Visa', price: 800, originalPrice: null, isFastTrack: false, getOnDate: '14 Days' },
  { _id: 3, country: 'USA', type: 'B1/B2 Visa', price: 950, originalPrice: null, isFastTrack: false, getOnDate: 'Varies' },
  { _id: 4, country: 'UK', type: 'Standard Visitor', price: 750, originalPrice: 850, isFastTrack: true, getOnDate: '3 Weeks' }
];

const sampleTestimonials = [
  { _id: 1, name: 'Sarah M.', date: 'Oct 12, 2023', rating: 5, title: 'Amazing Experience', review: 'Air Dream made our Dubai trip unforgettable. The desert safari was organized perfectly.', avatarColor: 'blue' },
  { _id: 2, name: 'John D.', date: 'Nov 05, 2023', rating: 5, title: 'Fast Visa Processing', review: 'Got my UAE tourist visa within 48 hours as promised. Very professional service.', avatarColor: 'green' },
  { _id: 3, name: 'Aisha K.', date: 'Dec 20, 2023', rating: 5, title: 'Perfect Honeymoon', review: 'Booked our Bali package with them. Everything from flights to hotels was seamless.', avatarColor: 'pink' }
];

const Home = () => {
  const [tours, setTours] = useState(sampleTours);
  const [visas, setVisas] = useState(sampleVisas);
  const [testimonials, setTestimonials] = useState(sampleTestimonials);

  useEffect(() => {
    // Attempt to fetch from API, fallback to sample data if fails
    const fetchData = async () => {
      try {
        const [toursRes, visasRes, testimonialsRes] = await Promise.all([
          api.get('/tours'),
          api.get('/visas'),
          api.get('/testimonials')
        ]);
        if (toursRes.data?.length > 0) setTours(toursRes.data);
        if (visasRes.data?.length > 0) setVisas(visasRes.data);
        if (testimonialsRes.data?.length > 0) setTestimonials(testimonialsRes.data);
      } catch (error) {
        console.log('Using fallback data (API not available)');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <HeroSlider />
      
      <ScrollCarousel title="Activities & Popular Tours">
        {tours.map(tour => <TourCard key={tour._id} tour={tour} />)}
      </ScrollCarousel>

      <StatsSection />

      <ScrollCarousel title="Popular Visas">
        {visas.map(visa => <VisaCard key={visa._id} visa={visa} />)}
      </ScrollCarousel>

      {/* Trustpilot-style Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div>
              <h2 className="text-3xl font-bold text-dark">Excellent</h2>
              <div className="flex gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-star-green flex items-center justify-center rounded-sm">
                    <FaStar className="text-white text-lg" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">Based on <strong>500+ reviews</strong> on <span className="font-bold text-dark flex items-center inline-flex gap-1"><FaStar className="text-star-green" /> Trustpilot</span></p>
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

      <ConsultationForm />
    </div>
  );
};

export default Home;
