import React from 'react';
import Layout from '../../components/layout/Layout';

const WishlistPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample wishlist item */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200">
              {/* Image placeholder */}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Destination Name</h3>
              <p className="text-gray-600 mb-4">Brief description of the destination</p>
              <div className="flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800">
                  View Details
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage; 