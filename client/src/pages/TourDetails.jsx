import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { FaStar, FaClock, FaCheckCircle, FaMapMarkerAlt, FaBus, FaHiking, FaUserAlt } from 'react-icons/fa';

const sampleTour = {
  _id: 1, 
  title: 'Desert Safari Dubai with BBQ Dinner', 
  description: 'Experience the thrill of a lifetime with our premium Desert Safari. Enjoy dune bashing, camel riding, sandboarding, and a delicious BBQ dinner under the stars with live entertainment.',
  duration: { days: 1, nights: 0 }, 
  rating: 5, 
  price: 150, 
  originalPrice: 200, 
  category: 'Adventure',
  highlights: ['Dune Bashing', 'Camel Riding', 'Sandboarding', 'BBQ Dinner', 'Belly Dance Show', 'Henna Painting'],
  included: ['Hotel Pick-up/Drop-off', 'English Speaking Guide', 'Soft Drinks', 'Dinner']
};

const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(sampleTour);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await api.get(`/tours/${id}`);
        setTour(res.data);
      } catch (err) {
        console.log('Using fallback data for Tour Details');
      }
    };
    fetchTour();
    window.scrollTo(0,0);
  }, [id]);

  if (!tour) return <div className="pt-32 pb-20 text-center">Loading...</div>;

  return (
    <div className="pt-24 pb-20 bg-gray-50">
      {/* Hero Image */}
      <div className="h-64 md:h-96 w-full bg-dark relative">
        {tour.images?.[0] ? (
          <img src={tour.images[0]} alt={tour.title} className="w-full h-full object-cover opacity-80" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary-dark to-dark"></div>
        )}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-dark/90 to-transparent">
          <div className="container mx-auto">
            <span className="bg-primary px-3 py-1 text-xs font-bold text-white rounded uppercase tracking-wider mb-3 inline-block">{tour.category || 'Tour'}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{tour.title}</h1>
            <div className="flex items-center gap-4 text-gray-200 text-sm">
              <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-primary-light" /> Dubai, UAE</span>
              <span className="flex items-center gap-1"><FaClock className="text-primary-light" /> {tour.duration?.days} Days {tour.duration?.nights} Nights</span>
              <span className="flex items-center gap-1"><FaStar className="text-yellow-400" /> {tour.rating}.0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-4 border-b pb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed">{tour.description}</p>
            </section>

            <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-4 border-b pb-4">Highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tour.highlights?.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-600">
                    <FaCheckCircle className="text-primary mt-1 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-4 border-b pb-4">What's Included</h2>
              <div className="flex flex-wrap gap-4">
                 {tour.included?.map((inc, idx) => (
                   <div key={idx} className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700 flex items-center gap-2">
                     <FaCheckCircle className="text-green-500" /> {typeof inc === 'object' ? inc.name : inc}
                   </div>
                 ))}
              </div>
            </section>
          </div>

          {/* Sidebar Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-28">
              <div className="mb-6">
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Starting From</p>
                <div className="flex items-end gap-3">
                  {tour.originalPrice && <span className="text-xl text-gray-400 line-through">AED {tour.originalPrice}</span>}
                  <span className="text-4xl font-black text-dark">AED {tour.price}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Per Person</p>
              </div>

              <div className="space-y-4 mb-6">
                 <div className="flex justify-between items-center pb-3 border-b border-gray-100 text-sm text-gray-600">
                   <span className="flex items-center gap-2"><FaClock className="text-primary"/> Duration</span>
                   <span className="font-semibold text-dark">{tour.duration?.days} Days</span>
                 </div>
                 <div className="flex justify-between items-center pb-3 border-b border-gray-100 text-sm text-gray-600">
                   <span className="flex items-center gap-2"><FaUserAlt className="text-primary"/> Min Age</span>
                   <span className="font-semibold text-dark">3+</span>
                 </div>
                 <div className="flex justify-between items-center pb-3 border-b border-gray-100 text-sm text-gray-600">
                   <span className="flex items-center gap-2"><FaBus className="text-primary"/> Transport</span>
                   <span className="font-semibold text-dark">Included</span>
                 </div>
              </div>

              <Link to="/contact" className="w-full block text-center bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/30 transition-colors">
                Book Now
              </Link>
              <p className="text-center text-xs text-gray-400 mt-4">No hidden costs. Secure booking.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TourDetails;
