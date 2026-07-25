import React, { useState, useEffect } from 'react';
import TourCard from '../components/TourCard';
import api from '../utils/api';

const AllActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await api.get('/activities');
        setActivities(res.data);
      } catch (err) {
        console.error(err);
        setActivities([
           { _id: 1, title: 'Burj Khalifa At The Top', duration: { days: 1, nights: 0 }, rating: 4.8, price: 180, category: 'Sightseeing' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-dark mb-2">Things to Do</h1>
        <p className="text-gray-500 mb-10">Discover amazing activities and attractions.</p>
        
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading activities...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activities.map(activity => (
              <TourCard key={activity._id} tour={activity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllActivities;
