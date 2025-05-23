import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import {
  FaMountain,
  FaPray,
  FaTree,
  FaLandmark,
  FaHeart,
  FaTheaterMasks,
  FaUtensils,
  FaCamera,
} from 'react-icons/fa';

interface Theme {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  destinations: Array<{
    id: number;
    name: string;
    image: string;
    description: string;
  }>;
}

const ThemesPage = () => {
  const themes: Theme[] = [
    {
      id: 'adventure',
      name: 'Adventure',
      description: 'Thrilling experiences in the mountains, deserts, and forests of India',
      icon: <FaMountain className="w-8 h-8" />,
      image: 'https://source.unsplash.com/800x600/?adventure-india',
      destinations: [
        {
          id: 1,
          name: 'Ladakh',
          image: 'https://source.unsplash.com/800x600/?ladakh',
          description: 'High-altitude desert with stunning monasteries and landscapes',
        },
        {
          id: 2,
          name: 'Rishikesh',
          image: 'https://source.unsplash.com/800x600/?rishikesh',
          description: 'Adventure capital of India, famous for rafting and camping',
        },
      ],
    },
    {
      id: 'spiritual',
      name: 'Spiritual',
      description: 'Sacred places and spiritual journeys across the country',
      icon: <FaPray className="w-8 h-8" />,
      image: 'https://source.unsplash.com/800x600/?varanasi-india',
      destinations: [
        {
          id: 3,
          name: 'Varanasi',
          image: 'https://source.unsplash.com/800x600/?varanasi-ghats',
          description: 'The spiritual capital of India on the banks of the Ganges',
        },
        {
          id: 4,
          name: 'Rishikesh',
          image: 'https://source.unsplash.com/800x600/?rishikesh-temple',
          description: 'The yoga capital of the world with numerous ashrams',
        },
      ],
    },
    {
      id: 'nature',
      name: 'Nature',
      description: 'Beautiful landscapes, national parks, and wildlife sanctuaries',
      icon: <FaTree className="w-8 h-8" />,
      image: 'https://source.unsplash.com/800x600/?kerala-backwaters',
      destinations: [
        {
          id: 5,
          name: 'Kerala Backwaters',
          image: 'https://source.unsplash.com/800x600/?kerala',
          description: 'Serene waterways and lush greenery',
        },
        {
          id: 6,
          name: 'Jim Corbett',
          image: 'https://source.unsplash.com/800x600/?tiger-reserve',
          description: 'Famous tiger reserve and wildlife sanctuary',
        },
      ],
    },
    {
      id: 'historical',
      name: 'Historical',
      description: 'Ancient monuments, forts, and palaces telling stories of the past',
      icon: <FaLandmark className="w-8 h-8" />,
      image: 'https://source.unsplash.com/800x600/?taj-mahal',
      destinations: [
        {
          id: 7,
          name: 'Taj Mahal',
          image: 'https://source.unsplash.com/800x600/?taj-mahal-agra',
          description: 'Symbol of eternal love and architectural marvel',
        },
        {
          id: 8,
          name: 'Hampi',
          image: 'https://source.unsplash.com/800x600/?hampi',
          description: 'Ancient ruins of the Vijayanagara Empire',
        },
      ],
    },
    {
      id: 'romantic',
      name: 'Romantic',
      description: 'Perfect destinations for couples and honeymooners',
      icon: <FaHeart className="w-8 h-8" />,
      image: 'https://source.unsplash.com/800x600/?udaipur-palace',
      destinations: [
        {
          id: 9,
          name: 'Udaipur',
          image: 'https://source.unsplash.com/800x600/?udaipur',
          description: 'City of lakes and palaces',
        },
        {
          id: 10,
          name: 'Darjeeling',
          image: 'https://source.unsplash.com/800x600/?darjeeling',
          description: 'Scenic hill station with tea gardens',
        },
      ],
    },
    {
      id: 'cultural',
      name: 'Cultural',
      description: 'Experience the rich traditions and festivals of India',
      icon: <FaTheaterMasks className="w-8 h-8" />,
      image: 'https://source.unsplash.com/800x600/?indian-culture',
      destinations: [
        {
          id: 11,
          name: 'Rajasthan',
          image: 'https://source.unsplash.com/800x600/?rajasthan',
          description: 'Land of kings with vibrant culture',
        },
        {
          id: 12,
          name: 'Mysore',
          image: 'https://source.unsplash.com/800x600/?mysore-palace',
          description: 'City of palaces with rich heritage',
        },
      ],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Explore by Theme</h1>
        
        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme) => (
            <div key={theme.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={theme.image}
                  alt={theme.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-white text-center">
                    {theme.icon}
                    <h2 className="text-2xl font-bold mt-2">{theme.name}</h2>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{theme.description}</p>
                <h3 className="font-bold mb-4">Popular Destinations</h3>
                <div className="space-y-4">
                  {theme.destinations.map((destination) => (
                    <Link
                      key={destination.id}
                      to={`/destination/${destination.id}`}
                      className="block group"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 flex-shrink-0">
                          <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold group-hover:text-blue-600">
                            {destination.name}
                          </h4>
                          <p className="text-sm text-gray-600">{destination.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to={`/category/${theme.id}`}
                  className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Explore More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ThemesPage; 