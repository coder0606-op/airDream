import React, { useState, useEffect } from 'react';
import VisaCard from '../components/VisaCard';
import api from '../utils/api';

const AllVisas = () => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const res = await api.get('/visas');
        setVisas(res.data);
      } catch (err) {
        console.error(err);
        setVisas([
          { _id: 1, country: 'UAE', type: 'Tourist Visa', price: 350, isFastTrack: true, getOnDate: '2 Days' },
          { _id: 2, country: 'Schengen', type: 'Visit Visa', price: 800, isFastTrack: false, getOnDate: '14 Days' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchVisas();
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-dark mb-2">Global Visa Services</h1>
        <p className="text-gray-500 mb-10">Hassle-free visa processing for your global travel.</p>
        
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading visas...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visas.map(visa => (
              <VisaCard key={visa._id} visa={visa} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllVisas;
