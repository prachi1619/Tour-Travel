import React from 'react';
import Layout from '../../components/layout/Layout';

const BookingsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Bookings</h1>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">Upcoming Bookings</h2>
                {/* Add booking cards here */}
                <p className="text-gray-600">Your upcoming trips will appear here</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">Past Bookings</h2>
                {/* Add past booking cards here */}
                <p className="text-gray-600">Your travel history will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingsPage; 