import React from 'react';
import { ArrowRight } from 'lucide-react';

const BannerHighlight = () => {
  return (
    <section className="relative bg-gradient-to-r from-lime-400 to-green-500 section-spacing overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <img
          src="https://images.pexels.com/photos/1571475/pexels-photo-1571475.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Interior design background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h2 className="section-heading text-black">
            We Know How to<br />
            Deliver Your Vision
          </h2>
          <p className="text-xl text-black/80 max-w-2xl mx-auto leading-relaxed">
            From concept to completion, our experienced team transforms your ideas into 
            stunning realities. Every project is a collaboration that brings your unique 
            vision to life with precision and creativity.
          </p>
          <button className="bg-black text-lime-400 px-8 py-4 rounded-full font-semibold hover:bg-gray-900 transition-all duration-300 text-sm uppercase tracking-wide flex items-center space-x-2 mx-auto">
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BannerHighlight;