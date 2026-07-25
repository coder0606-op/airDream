import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaBus, FaHiking, FaUserAlt } from 'react-icons/fa';

const TourCard = ({ tour }) => {
  const { _id, title, duration, rating, originalPrice, price, images, category } = tour;
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full border border-gray-100">
      <div className="relative h-48 overflow-hidden group">
        {images?.[0] ? (
           <img src={images[0]} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
           <div className="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-300 flex items-center justify-center">
             <span className="text-gray-400 font-medium">No Image</span>
           </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-dark">
          {category || "Tour"}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-dark leading-tight line-clamp-2">{title}</h3>
        </div>
        
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <div className="flex text-yellow-400">
             {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(rating || 5) ? 'text-yellow-400' : 'text-gray-300'} />
             ))}
          </div>
          <span>({rating || 5}.0)</span>
          <span className="text-gray-300">•</span>
          <span>{duration?.days || 0} Days {duration?.nights || 0} Nights</span>
        </div>

        <div className="flex gap-4 mb-4 text-gray-500 text-sm">
           <div className="flex flex-col items-center gap-1"><FaBus /> <span className="text-[10px]">Transfer</span></div>
           <div className="flex flex-col items-center gap-1"><FaHiking /> <span className="text-[10px]">Activities</span></div>
           <div className="flex flex-col items-center gap-1"><FaUserAlt /> <span className="text-[10px]">Guide</span></div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
          <div>
            <div className="text-xs text-gray-400 mb-1">STARTING FROM</div>
            {originalPrice && (
              <div className="text-sm text-gray-400 line-through">AED {originalPrice}</div>
            )}
            <div className="text-xl font-black text-dark">AED {price}</div>
            <div className="text-[10px] font-semibold text-gray-500 tracking-wider">PER PERSON</div>
          </div>
          <Link to={`/tours/${_id || 1}`} className="text-primary font-semibold hover:text-primary-dark transition-colors text-sm">
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
