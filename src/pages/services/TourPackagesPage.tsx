import React from 'react';
import Layout from '../../components/layout/Layout';

const TourPackagesPage: React.FC = () => {
  const packages = [
    {
      id: 1,
      title: 'Golden Triangle Tour',
      duration: '6 Days / 5 Nights',
      destinations: ['Delhi', 'Agra', 'Jaipur'],
      price: '₹25,999',
      image: '/images/packages/golden-triangle.jpg',
      highlights: ['Taj Mahal', 'Amber Fort', 'Qutub Minar'],
    },
    {
      id: 2,
      title: 'Kerala Backwaters',
      duration: '5 Days / 4 Nights',
      destinations: ['Kochi', 'Munnar', 'Alleppey'],
      price: '₹22,999',
      image: '/images/packages/kerala.jpg',
      highlights: ['Houseboat Stay', 'Tea Gardens', 'Beach Visit'],
    },
    {
      id: 3,
      title: 'Himalayan Adventure',
      duration: '7 Days / 6 Nights',
      destinations: ['Manali', 'Shimla', 'Dharamshala'],
      price: '₹28,999',
      image: '/images/packages/himalayas.jpg',
      highlights: ['Trekking', 'Paragliding', 'Camping'],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Tour Packages</h1>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Any Duration</option>
                <option>1-3 Days</option>
                <option>4-7 Days</option>
                <option>8+ Days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget
              </label>
              <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Any Budget</option>
                <option>Under ₹20,000</option>
                <option>₹20,000 - ₹50,000</option>
                <option>Above ₹50,000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                {/* Package image will be added here */}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                <p className="text-gray-600 mb-4">{pkg.duration}</p>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Destinations:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.destinations.map((dest, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Highlights:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {pkg.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <span className="text-sm text-gray-600">Starting from</span>
                    <p className="text-xl font-semibold text-blue-600">{pkg.price}</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Why Choose Our Tour Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Expertly Curated</h3>
              <p className="text-gray-600">Handpicked destinations and experiences</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive rates and exclusive deals</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Local Guides</h3>
              <p className="text-gray-600">Expert local guides for authentic experiences</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance during your tour</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default TourPackagesPage; 