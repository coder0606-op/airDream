import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TourCard from '../components/TourCard';
import api from '../utils/api';

const categories = ['All', 'Desert Safari', 'City Tour', 'Abu Dhabi', 'Cruise', 'Adventure', 'Sightseeing', 'Entertainment', 'Water Sports'];

const AllActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const activeCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const url = activeCategory && activeCategory !== 'All' 
          ? `/activities?category=${encodeURIComponent(activeCategory)}`
          : '/activities';
        const res = await api.get(url);
        setActivities(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
    window.scrollTo(0, 0);
  }, [activeCategory]);

  const handleCategoryClick = (cat) => {
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {activeCategory !== 'All' ? activeCategory : 'All Activities'}
          </h1>
          <p className="text-gray-500">
            {activeCategory !== 'All' 
              ? `Explore our ${activeCategory.toLowerCase()} experiences and book your adventure.`
              : 'Discover amazing activities and attractions in the UAE.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat || (cat === 'All' && !activeCategory)
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Activities Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading activities...</div>
        ) : activities.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No activities found for "{activeCategory}"</p>
            <p className="text-gray-400 text-sm">Try selecting a different category or add activities from the admin panel.</p>
          </div>
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
