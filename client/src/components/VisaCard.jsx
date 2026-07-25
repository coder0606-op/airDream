import React from 'react';
import { Link } from 'react-router-dom';

const VisaCard = ({ visa }) => {
  const { country, flagImage, type, price, originalPrice, isFastTrack, getOnDate } = visa;
  
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary/30 flex flex-col items-center text-center group h-full">
      <div className="w-full flex justify-between items-start mb-4">
        {isFastTrack && (
          <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-sm tracking-wider">
            FAST TRACK
          </span>
        )}
        {getOnDate && (
          <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-sm ml-auto">
            Get on {getOnDate}
          </span>
        )}
      </div>

      <div className="w-24 h-24 rounded-full mb-4 shadow-inner overflow-hidden border-4 border-gray-50 group-hover:scale-105 transition-transform duration-300">
        {flagImage ? (
           <img src={flagImage} alt={`${country} flag`} className="w-full h-full object-cover" />
        ) : (
           <div className="w-full h-full bg-gradient-to-br from-blue-100 to-primary-light/30 flex items-center justify-center text-2xl font-bold text-primary">
             {country ? country.charAt(0) : 'V'}
           </div>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-dark mb-1">{country}</h3>
      <span className="bg-coral/10 text-coral text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
        {type || 'VISA'}
      </span>
      
      <div className="mt-auto w-full pt-4 border-t border-gray-50">
        <div className="text-[10px] text-gray-400 font-semibold mb-1">STARTING PRICE</div>
        <div className="flex justify-center items-end gap-2">
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through mb-1">AED {originalPrice}</span>
          )}
          <span className="text-2xl font-black text-dark">AED {price}</span>
        </div>
      </div>
      
      <Link to="/contact" className="w-full mt-4 bg-gray-50 hover:bg-primary text-dark hover:text-white py-2 rounded-md font-semibold text-sm transition-colors border border-gray-200 hover:border-primary">
        Apply Now
      </Link>
    </div>
  );
};

export default VisaCard;
