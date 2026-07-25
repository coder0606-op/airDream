import React, { useEffect } from 'react';
import ConsultationForm from '../components/ConsultationForm';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="pt-24 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8 mb-10">
        <h1 className="text-4xl md:text-6xl font-bold text-dark text-center">Contact Us</h1>
      </div>
      <ConsultationForm />
      
      {/* Map Embed */}
      <div className="w-full h-96 mt-10">
        <iframe 
          title="Dubai Office Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115535.15553139366!2d55.19500055106197!3d25.184318768019904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  );
};

export default Contact;
