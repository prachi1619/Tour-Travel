import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const ActivityDetailPage: React.FC = () => {
  const { activity } = useParams<{ activity: string }>();

  const activityTitle = activity?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{activityTitle}</h1>
          
          {/* Hero Image */}
          <div className="aspect-w-16 aspect-h-9 mb-8 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gray-200">
              {/* Activity image will be added here */}
            </div>
          </div>

          {/* Activity Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold mb-4">About this Activity</h2>
                <p className="text-gray-600 mb-4">
                  Detailed description of the activity will be displayed here, including what to expect,
                  difficulty level, and other important information.
                </p>

                <h3 className="text-xl font-semibold mb-3">Highlights</h3>
                <ul className="list-disc pl-5 mb-6">
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">What's Included</h3>
                <ul className="list-disc pl-5 mb-6">
                  <li>Equipment</li>
                  <li>Safety gear</li>
                  <li>Professional guide</li>
                </ul>
              </div>
            </div>

            {/* Booking Widget */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h3 className="text-xl font-semibold mb-4">Book this Activity</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of People
                    </label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5+</option>
                    </select>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Check Availability
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ActivityDetailPage; 