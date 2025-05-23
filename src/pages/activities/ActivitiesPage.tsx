import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const ActivitiesPage: React.FC = () => {
  const activities = [
    {
      id: 'river-rafting',
      name: 'River Rafting',
      description: 'Experience the thrill of white water rafting in the mighty rivers of India',
      image: '/images/activities/rafting.jpg',
    },
    {
      id: 'trekking',
      name: 'Trekking',
      description: 'Explore the beautiful hiking trails across the Himalayas and Western Ghats',
      image: '/images/activities/trekking.jpg',
    },
    {
      id: 'paragliding',
      name: 'Paragliding',
      description: 'Soar through the skies and experience the beauty of India from above',
      image: '/images/activities/paragliding.jpg',
    },
    // Add more activities here
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Adventure Activities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              to={`/activities/${activity.id}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
                <div className="h-48 bg-gray-200">
                  {/* Image will be added here */}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{activity.name}</h2>
                  <p className="text-gray-600">{activity.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ActivitiesPage; 