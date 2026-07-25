import React, { useState, useEffect } from 'react';
import TourCard from '../components/TourCard';
import api from '../utils/api';

const AllTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await api.get('/tours');
        setTours(res.data);
      } catch (err) {
        console.error(err);
        // Fallback for demonstration
        setTours([
           { _id: 1, title: 'Desert Safari Dubai', duration: { days: 1, nights: 0 }, rating: 5, price: 150, category: 'Adventure' },
           { _id: 2, title: 'Georgia 4 Days Package', duration: { days: 4, nights: 3 }, rating: 5, price: 1200, category: 'Holiday' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-dark mb-2">Explore All Tours</h1>
        <p className="text-gray-500 mb-10">Find the perfect package for your next adventure.</p>
        
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading tours...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tours.map(tour => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTours;
