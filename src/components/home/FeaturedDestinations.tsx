import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { destinations } from '../../data/destinations';
import { cn, truncateText } from '../../lib/utils';

export default function FeaturedDestinations() {
  const featuredDestinations = destinations.filter(dest => dest.featured);
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Featured Destinations
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the most breathtaking places across India, from iconic landmarks to hidden gems
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination, index) => (
            <Link 
              key={destination.id} 
              to={`/destination/${destination.slug}`}
              className={cn(
                "group bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300",
                "transform hover:-translate-y-1"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={destination.imageUrl} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center text-white">
                    <MapPin size={16} className="text-primary-400 mr-1" />
                    <span className="text-sm">{destination.state}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{destination.name}</h3>
                </div>
                
                {destination.trending && (
                  <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                    <Star size={12} className="mr-1" />
                    Trending
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {destination.type.slice(0, 2).map(type => (
                    <span 
                      key={type} 
                      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {truncateText(destination.shortDescription, 100)}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Best time: <span className="font-medium text-gray-800 dark:text-gray-300">{destination.bestSeason.join(', ')}</span>
                  </div>
                  <span className="text-primary-500 font-medium text-sm group-hover:underline">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/destinations" 
            className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-medium transition duration-300"
          >
            View All Destinations
            <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Import at the top
import { ChevronRight } from 'lucide-react';