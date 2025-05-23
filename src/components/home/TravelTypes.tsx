import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Landmark, Tent, TreePine, Umbrella as UmbrellaBeach, Palmtree as PalmTree } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TravelCategory {
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const categories: TravelCategory[] = [
  {
    name: 'Adventure',
    icon: <Mountain size={36} />,
    description: 'Trekking, rafting, and adrenaline-pumping activities',
    color: 'text-blue-500'
  },
  {
    name: 'Heritage',
    icon: <Landmark size={36} />,
    description: 'Forts, palaces, temples, and historical landmarks',
    color: 'text-amber-600'
  },
  {
    name: 'Wildlife',
    icon: <TreePine size={36} />,
    description: 'National parks, wildlife sanctuaries, and biodiversity',
    color: 'text-green-600'
  },
  {
    name: 'Spiritual',
    icon: <Tent size={36} />,
    description: 'Sacred sites, pilgrimages, and wellness retreats',
    color: 'text-purple-600'
  },
  {
    name: 'Beaches',
    icon: <UmbrellaBeach size={36} />,
    description: 'Coastlines, islands, and water activities',
    color: 'text-cyan-500'
  },
  {
    name: 'Hill Stations',
    icon: <PalmTree size={36} />,
    description: 'Mountain retreats, tea plantations, and misty valleys',
    color: 'text-emerald-600'
  }
];

export default function TravelTypes() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Explore by Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Find your perfect Indian adventure based on your interests
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={category.name}
              to={`/experience/${category.name.toLowerCase()}`}
              className={cn(
                "group flex flex-col items-center text-center p-8 rounded-xl transition-all duration-300",
                "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750",
                "border border-gray-100 dark:border-gray-700",
                "hover:shadow-lg transform hover:-translate-y-1",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={cn(
                "mb-4 p-3 rounded-full",
                "bg-gray-100 dark:bg-gray-700",
                "group-hover:bg-white dark:group-hover:bg-gray-600",
                category.color
              )}>
                {category.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {category.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {category.description}
              </p>
              
              <span className="mt-auto text-primary-500 font-medium group-hover:underline flex items-center">
                View Destinations
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}