import React from 'react';
import Layout from '../../components/layout/Layout';

const TravelHistoryPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Travel History</h1>
        <div className="space-y-6">
          {/* Sample travel history item */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-semibold mb-2">Trip to Kerala</h2>
                <p className="text-gray-600">December 15-22, 2023</p>
                <div className="mt-2 space-x-2">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    Beach
                  </span>
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    Nature
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <button className="text-blue-600 hover:text-blue-800 mb-2">
                  View Details
                </button>
                <button className="text-blue-600 hover:text-blue-800">
                  Write Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TravelHistoryPage; 