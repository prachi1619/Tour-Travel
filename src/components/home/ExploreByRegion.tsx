import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import type { Region } from '../../types';

interface RegionCard {
  name: Region;
  description: string;
  image: string;
  count: number;
}

const regions: RegionCard[] = [
  {
    name: 'North',
    description: 'Majestic Himalayas, sacred cities, and Mughal heritage',
    image: 'https://images.pexels.com/photos/5257534/pexels-photo-5257534.jpeg',
    count: 15
  },
  {
    name: 'South',
    description: 'Temple architecture, coastal beauty, and backwaters',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
    count: 12
  },
  {
    name: 'East',
    description: 'Tea gardens, tribal culture, and ancient temples',
    image: 'https://images.pexels.com/photos/19249285/pexels-photo-19249285/free-photo-of-darjeeling-himalayan-railway-toy-train.jpeg',
    count: 8
  },
  {
    name: 'West',
    description: 'Heritage cities, desert landscapes, and beaches',
    image: 'https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg',
    count: 10
  },
  {
    name: 'Central',
    description: 'Dense forests, wildlife reserves, and medieval forts',
    image: 'https://images.pexels.com/photos/4344260/pexels-photo-4344260.jpeg',
    count: 7
  },
  {
    name: 'Northeast',
    description: 'Unexplored valleys, living root bridges, and unique cultures',
    image: 'https://images.pexels.com/photos/4344426/pexels-photo-4344426.jpeg',
    count: 9
  }
];

export default function ExploreByRegion() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Explore India by Region
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            India's diverse geography offers unique experiences in each region
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region, index) => (
            <Link 
              key={region.name}
              to={`/region/${region.name.toLowerCase()}`}
              className={cn(
                "group relative overflow-hidden rounded-xl shadow-md h-[250px]",
                "transition-all duration-300 hover:shadow-xl",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background image with overlay */}
              <div className="absolute inset-0">
                <img 
                  src={region.image} 
                  alt={`${region.name} India`}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                  {region.name} India
                </h3>
                <p className="text-gray-200 text-sm mb-3">
                  {region.description}
                </p>
                <div className="flex items-center text-sm">
                  <span className="bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                    {region.count} destinations
                  </span>
                  <span className="ml-auto font-medium group-hover:text-primary-400 transition-colors flex items-center">
                    Explore
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}