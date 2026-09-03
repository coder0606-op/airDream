import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const fallbackDeals = [
  {
    title: 'Dubai Holiday Package',
    price: 'AED 999',
    badge: 'SPECIAL OFFER',
    badgeColor: 'bg-red-500',
    image: '/images/burj-khalifa.jpg',
    link: '/tours?category=Holiday',
  },
  {
    title: 'Umrah Package 14 Days',
    price: 'From AED 2,450',
    badge: 'BEST DEAL',
    badgeColor: 'bg-green-500',
    image: '/images/service-umrah.jpg',
    link: '/tours?category=Sightseeing',
  },
  {
    title: 'Maldives Getaway Package',
    price: 'AED 2,999',
    badge: 'LIMITED',
    badgeColor: 'bg-orange-500',
    image: '/images/deal-maldives.jpg',
    link: '/tours?category=Honeymoon',
  },
  {
    title: 'Europe Group Tour Package',
    price: 'From AED 3,999',
    badge: 'GROUP OFFER',
    badgeColor: 'bg-blue-500',
    image: '/images/deal-europe.jpg',
    link: '/tours?category=Family',
  },
];

const TravelDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await api.get('/travel-deals');
        if (Array.isArray(res.data) && res.data.length > 0) {
          setDeals(res.data);
        } else {
          setDeals(fallbackDeals); // Use fallback if empty
        }
      } catch (err) {
        console.error('Error fetching deals', err);
        setDeals(fallbackDeals);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  if (loading) {
    return <div className="py-16 text-center text-gray-500 bg-gray-50">Loading travel deals...</div>;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Latest Travel Deals</h2>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal, index) => (
            <Link 
              key={deal._id || index} 
              to={deal._id ? `/travel-deals/${deal._id}` : (deal.link || '#')}
              className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition flex flex-col relative"
            >
              <div className="relative">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full aspect-[3/2] object-cover rounded-t-xl"
                />
                {deal.badge && (
                  <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full text-white ${deal.badgeColor || 'bg-red-500'}`}>
                    {deal.badge}
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-dark text-lg mb-2">{deal.title}</h3>
                <p className="text-lg font-bold text-primary mt-auto">{deal.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelDeals;
