import React from 'react';
import Layout from '../../components/layout/Layout';

const HotelsPage: React.FC = () => {
  return (
    <Layout>
      <div className="hero">
        <div className="container">
          <h1 className="hero__title">Find Your Perfect Stay</h1>
          <p className="hero__subtitle">
            Discover and book hotels, resorts, and unique accommodations worldwide
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {/* Search Form */}
          <div className="card mb-xl">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="input"
                />
              </div>
              <div className="form-group">
                <label>Check-in</label>
                <input
                  type="date"
                  className="input"
                />
              </div>
              <div className="form-group">
                <label>Check-out</label>
                <input
                  type="date"
                  className="input"
                />
              </div>
              <div className="form-group">
                <label>Guests</label>
                <select className="input">
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>2 Adults, 1 Child</option>
                  <option>2 Adults, 2 Children</option>
                </select>
              </div>
            </form>
            <div className="mt-lg text-center">
              <button className="button">
                Search Hotels
              </button>
            </div>
          </div>

          {/* Featured Hotels */}
          <section className="mb-xl">
            <h2 className="text-center mb-lg">Featured Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {[
                {
                  name: 'Luxury Palace Hotel',
                  location: 'New Delhi',
                  price: '₹8,999',
                  rating: 4.8,
                },
                {
                  name: 'Seaside Resort',
                  location: 'Goa',
                  price: '₹12,499',
                  rating: 4.9,
                },
                {
                  name: 'Mountain View Hotel',
                  location: 'Shimla',
                  price: '₹6,999',
                  rating: 4.7,
                },
              ].map((hotel, index) => (
                <div key={index} className="card">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-md">
                    {/* Hotel image will be added here */}
                  </div>
                  <div className="space-y-sm">
                    <h3 className="text-xl font-semibold">{hotel.name}</h3>
                    <p className="text-secondary">{hotel.location}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-xs">
                        <span className="text-secondary">★</span>
                        <span className="text-secondary">{hotel.rating}</span>
                      </div>
                      <p className="font-semibold">From {hotel.price}/night</p>
                    </div>
                    <button className="button w-full">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Amenities Filter */}
          <section>
            <h2 className="text-center mb-lg">Popular Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-md">
              {[
                'Swimming Pool',
                'Free WiFi',
                'Restaurant',
                'Spa',
                'Gym',
                'Room Service',
              ].map((amenity, index) => (
                <button
                  key={index}
                  className="button button--secondary w-full"
                >
                  {amenity}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default HotelsPage; 