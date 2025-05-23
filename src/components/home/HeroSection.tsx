import React from 'react';
import { Search, ChevronRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-[600px] sm:h-[700px] flex items-center">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 animate-slide-up">
            Discover Incredible India
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Explore the vibrant culture, breathtaking landscapes, and ancient heritage of India
          </p>
          
          {/* Search box */}
          <div 
            className="bg-white rounded-full p-2 flex items-center max-w-2xl mx-auto animate-slide-up" 
            style={{ animationDelay: '0.4s' }}
          >
            <Search size={20} className="text-gray-400 ml-3 mr-2" />
            <input 
              type="text" 
              placeholder="Search destinations, cities, experiences..." 
              className="flex-grow py-2 px-3 bg-transparent text-gray-900 focus:outline-none"
            />
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-medium transition duration-300">
              Search
            </button>
          </div>
          
          {/* Quick links */}
          <div 
            className="mt-8 flex flex-wrap justify-center gap-4 animate-slide-up" 
            style={{ animationDelay: '0.6s' }}
          >
            <a href="#" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition duration-300 backdrop-blur-sm flex items-center">
              <span>Popular Destinations</span>
              <ChevronRight size={16} className="ml-1" />
            </a>
            <a href="#" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition duration-300 backdrop-blur-sm flex items-center">
              <span>Travel Guides</span>
              <ChevronRight size={16} className="ml-1" />
            </a>
            <a href="#" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition duration-300 backdrop-blur-sm flex items-center">
              <span>Plan Your Trip</span>
              <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}