import React from 'react';
import { FaStar } from 'react-icons/fa';

const TestimonialCard = ({ testimonial }) => {
  const { name, date, rating, title, review, avatarColor } = testimonial;
  
  const bgColors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    indigo: 'bg-indigo-500',
  };

  const bgColorClass = bgColors[avatarColor] || 'bg-gray-500';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${bgColorClass}`}>
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-dark text-sm">{name}</h4>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`w-6 h-6 flex items-center justify-center ${i < rating ? 'bg-gold' : 'bg-gray-200'} mr-0.5 rounded-sm`}>
             <FaStar className="text-white text-xs" />
          </div>
        ))}
      </div>
      
      <h5 className="font-bold text-dark mb-2 text-sm">{title}</h5>
      <p className="text-gray-600 text-sm leading-relaxed flex-grow">
        "{review}"
      </p>
    </div>
  );
};

export default TestimonialCard;
