import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const RegionPage: React.FC = () => {
  const { region } = useParams<{ region: string }>();

  const regionTitle = region?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{regionTitle}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add destination cards here */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-600">Destinations will be displayed here</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegionPage; 