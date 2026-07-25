import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ScrollCarousel = ({ children, title, showArrows = true }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-dark border-l-4 border-primary pl-4">{title}</h2>
          
          {showArrows && (
            <div className="hidden md:flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-dark text-dark hover:text-white flex items-center justify-center transition-colors"
              >
                <FaChevronLeft size={14} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-dark text-dark hover:text-white flex items-center justify-center transition-colors"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {React.Children.map(children, child => (
            <div className="min-w-[280px] md:min-w-[320px] lg:min-w-[350px] snap-center">
              {child}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollCarousel;
