import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const FestivalsPage: React.FC = () => {
  const festivals = [
    {
      id: 'pushkar-mela',
      name: 'Pushkar Mela',
      date: 'November 20-28, 2024',
      location: 'Pushkar, Rajasthan',
      description: "Experience the world's largest camel fair and cultural festival",
    },
    {
      id: 'hornbill',
      name: 'Hornbill Festival',
      date: 'December 1-10, 2024',
      location: 'Kohima, Nagaland',
      description: "Celebrate the cultural heritage of Nagaland's 16 major tribes",
    },
    {
      id: 'holi-vrindavan',
      name: 'Holi in Vrindavan',
      date: 'March 24-25, 2024',
      location: 'Vrindavan, Uttar Pradesh',
      description: 'Experience the most colorful festival of India in its spiritual home',
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Festivals & Events</h1>
        
        {/* Featured Festival */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <div className="h-48 w-full md:w-64 bg-gray-200">
                  {/* Featured festival image */}
                </div>
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                  Featured Event
                </div>
                <h2 className="mt-2 text-2xl font-semibold">Diwali Festival</h2>
                <p className="mt-2 text-gray-600">
                  Join us for the grand celebration of Diwali, the festival of lights,
                  across various locations in India.
                </p>
                <div className="mt-4">
                  <Link
                    to="/festivals/diwali"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Festival Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {festivals.map((festival) => (
            <Link
              key={festival.id}
              to={`/festivals/${festival.id}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
                <div className="h-48 bg-gray-200">
                  {/* Festival image */}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{festival.name}</h2>
                  <div className="text-sm text-gray-500 mb-2">
                    <div>{festival.date}</div>
                    <div>{festival.location}</div>
                  </div>
                  <p className="text-gray-600">{festival.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FestivalsPage; 