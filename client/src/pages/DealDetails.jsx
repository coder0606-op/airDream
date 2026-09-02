import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { FaStar, FaClock, FaCheckCircle, FaMapMarkerAlt, FaBus, FaHiking, FaUserAlt } from 'react-icons/fa';

const DealDetails = () => {
  const { id } = useParams();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const res = await api.get(`/travel-deals/${id}`);
        setDeal(res.data);
      } catch (err) {
        console.error('Error fetching deal details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
    window.scrollTo(0,0);
  }, [id]);

  if (loading) return <div className="pt-32 pb-20 text-center">Loading...</div>;
  if (!deal) return <div className="pt-32 pb-20 text-center">Deal not found.</div>;

  return (
    <div className="pt-24 pb-20 bg-gray-50">
      {/* Hero Image */}
      <div className="h-64 md:h-96 w-full bg-dark relative">
        {deal.image ? (
          <img src={deal.image} alt={deal.title} className="w-full h-full object-cover opacity-80" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary-dark to-dark"></div>
        )}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-dark/90 to-transparent">
          <div className="container mx-auto">
            {deal.badge && (
              <span className={`px-3 py-1 text-xs font-bold text-white rounded uppercase tracking-wider mb-3 inline-block ${deal.badgeColor || 'bg-red-500'}`}>
                {deal.badge}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{deal.title}</h1>
            <div className="flex items-center gap-4 text-gray-200 text-sm">
              <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-primary-light" /> Dubai, UAE</span>
              {deal.duration && (
                <span className="flex items-center gap-1">
                  <FaClock className="text-primary-light" /> {deal.duration.days} Days {deal.duration.nights} Nights
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {deal.description && (
              <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-dark mb-4 border-b pb-4">Overview</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{deal.description}</p>
              </section>
            )}

            {deal.activities && deal.activities.length > 0 && (
              <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-dark mb-4 border-b pb-4">Activities Included</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {deal.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <FaHiking className="text-primary mt-1 shrink-0" />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {deal.included && deal.included.length > 0 && (
              <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-dark mb-4 border-b pb-4">What's Included</h2>
                <div className="flex flex-wrap gap-4">
                   {deal.included.map((inc, idx) => (
                     <div key={idx} className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700 flex items-center gap-2">
                       <FaCheckCircle className="text-green-500" /> {inc}
                     </div>
                   ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-28">
              <div className="mb-6">
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Starting From</p>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-dark">{deal.price}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Per Person</p>
              </div>

              <div className="space-y-4 mb-6">
                 {deal.duration && (
                   <div className="flex justify-between items-center pb-3 border-b border-gray-100 text-sm text-gray-600">
                     <span className="flex items-center gap-2"><FaClock className="text-primary"/> Duration</span>
                     <span className="font-semibold text-dark">{deal.duration.days} Days</span>
                   </div>
                 )}
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

export default DealDetails;
