import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const FestivalDetailPage: React.FC = () => {
  const { festival } = useParams<{ festival: string }>();

  const festivalTitle = festival?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Festival Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{festivalTitle}</h1>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Date: March 24-25, 2024</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Location: Festival Venue</span>
              </div>
            </div>
          </div>

          {/* Festival Image */}
          <div className="aspect-w-16 aspect-h-9 mb-8 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gray-200">
              {/* Festival image will be added here */}
            </div>
          </div>

          {/* Festival Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold mb-4">About the Festival</h2>
                <p className="text-gray-600 mb-6">
                  Detailed description of the festival will be displayed here, including its history,
                  cultural significance, and what visitors can expect.
                </p>

                <h3 className="text-xl font-semibold mb-3">Festival Highlights</h3>
                <ul className="list-disc pl-5 mb-6">
                  <li>Traditional performances</li>
                  <li>Cultural exhibitions</li>
                  <li>Local cuisine</li>
                  <li>Art and craft displays</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Schedule</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-semibold">Day 1 - Opening Ceremony</h4>
                    <p className="text-gray-600">Description of day 1 events</p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-semibold">Day 2 - Main Events</h4>
                    <p className="text-gray-600">Description of day 2 events</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Widget */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h3 className="text-xl font-semibold mb-4">Book Festival Package</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Package
                    </label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                      <option>Basic Pass</option>
                      <option>Standard Pass</option>
                      <option>VIP Pass</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Tickets
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
                    Book Now
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

export default FestivalDetailPage; 