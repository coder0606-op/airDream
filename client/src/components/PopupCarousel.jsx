import React, { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../utils/api';

const PopupCarousel = () => {
  const [popups, setPopups] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    
    if (!hasSeenPopup) {
      fetchPopups();
    }
  }, []);

  const fetchPopups = async () => {
    try {
      // Only fetch active popups
      const response = await api.get('/popups?isActive=true');
     
      if (response.data && response.data.length > 0) {
        setPopups(response.data);
       
        // Add a slight delay before showing so it doesn't instantly block the screen
        setTimeout(() => setIsOpen(true), 1500);
      }
    } catch (error) {
      console.error('Error fetching popups:', error);
    }
  };

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenPopup', 'true');
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % popups.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + popups.length) % popups.length);
  };

  // Auto-slide every 5 seconds if there are multiple images
  useEffect(() => {
    if (!isOpen || popups.length <= 1) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isOpen, popups.length]);

  if (!isOpen || popups.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm transition-opacity">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
        
        {/* Close Button */}
        <button 
          onClick={closePopup}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-md transition-colors backdrop-blur-md"
        >
          <FaTimes size={16} />
        </button>

        {/* Carousel Content */}
        <div className="relative aspect-[4/3] sm:aspect-video w-full flex items-center bg-gray-100 overflow-hidden">
          {popups.map((popup, index) => (
            <div 
              key={popup._id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center justify-center ${index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
            >
              {popup.link ? (
                <a href={popup.link} target="_blank" rel="noopener noreferrer" className="w-full h-full block cursor-pointer group">
                  <img 
                    src={popup.imageUrl} 
                    alt={popup.title || 'Promotional Popup'} 
                    className="w-full h-full object-cover sm:object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                </a>
              ) : (
                <img 
                  src={popup.imageUrl} 
                  alt={popup.title || 'Promotional Popup'} 
                  className="w-full h-full object-cover sm:object-contain"
                />
              )}
            </div>
          ))}

          {/* Navigation Arrows (only show if multiple popups) */}
          {popups.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/50 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all hover:scale-110 backdrop-blur-md"
              >
                <FaChevronLeft size={16} />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/50 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all hover:scale-110 backdrop-blur-md"
              >
                <FaChevronRight size={16} />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {popups.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {popups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupCarousel;
