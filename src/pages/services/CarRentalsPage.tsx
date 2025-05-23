import React from 'react';
import Layout from '../../components/layout/Layout';

const CarRentalsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Car Rentals</h1>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
              <input
                type="text"
                placeholder="Enter city or airport"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
              <input
                type="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
              <input
                type="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
              <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>All Types</option>
                <option>Economy</option>
                <option>SUV</option>
                <option>Luxury</option>
              </select>
            </div>
          </form>
          <div className="mt-4">
            <button className="w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
              Search Cars
            </button>
          </div>
        </div>

        {/* Available Cars */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Available Cars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Toyota Innova',
                type: 'SUV',
                price: '₹3,500',
                seats: 7,
                transmission: 'Automatic',
              },
              {
                name: 'Maruti Swift',
                type: 'Hatchback',
                price: '₹2,000',
                seats: 5,
                transmission: 'Manual',
              },
              {
                name: 'Honda City',
                type: 'Sedan',
                price: '₹2,500',
                seats: 5,
                transmission: 'Automatic',
              },
            ].map((car, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200">
                  {/* Car image will be added here */}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                    <div>Type: {car.type}</div>
                    <div>Seats: {car.seats}</div>
                    <div>Transmission: {car.transmission}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">From {car.price}/day</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Why Choose Our Car Rental Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Flexible Rentals</h3>
              <p className="text-gray-600">Choose from a wide range of cars with flexible rental periods</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Clean & Safe</h3>
              <p className="text-gray-600">All cars are regularly sanitized and well-maintained</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock roadside assistance available</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CarRentalsPage; 