import React from 'react';
import { FaBuilding, FaHeadset, FaTag, FaGlobe, FaShieldAlt } from 'react-icons/fa';

const features = [
  {
    title: 'Registered UAE Company',
    description: 'Licensed and approved travel agency',
    icon: <FaBuilding />,
  },
  {
    title: 'Fast Support',
    description: '24/7 dedicated customer service',
    icon: <FaHeadset />,
  },
  {
    title: 'Competitive Rates',
    description: 'Best price guarantee on packages',
    icon: <FaTag />,
  },
  {
    title: 'Worldwide Services',
    description: 'Access to global destinations',
    icon: <FaGlobe />,
  },
  {
    title: 'Secure & Trusted',
    description: '100% safe and secure transactions',
    icon: <FaShieldAlt />,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-14">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Why Choose Air Dream?</h2>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary text-xl mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-dark text-sm mb-2">{feature.title}</h3>
              <p className="text-xs text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
