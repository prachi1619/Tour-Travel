import React from 'react';
import Layout from '../../components/layout/Layout';

const FlightsPage: React.FC = () => {
  return (
    <Layout>
      <div className="hero">
        <div className="container">
          <h1 className="hero__title">Find Your Perfect Flight</h1>
          <p className="hero__subtitle">
            Search and compare flights from hundreds of airlines worldwide
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {/* Search Form */}
          <div className="card mb-xl">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
              <div className="form-group">
                <label>From</label>
                <input
                  type="text"
                  placeholder="Departure City"
                  className="input"
                />
              </div>
              <div className="form-group">
                <label>To</label>
                <input
                  type="text"
                  placeholder="Destination City"
                  className="input"
                />
              </div>
              <div className="form-group">
                <label>Departure</label>
                <input
                  type="date"
                  className="input"
                />
              </div>
              <div className="form-group">
                <label>Return</label>
                <input
                  type="date"
                  className="input"
                />
              </div>
            </form>
            <div className="mt-lg text-center">
              <button className="button">
                Search Flights
              </button>
            </div>
          </div>

          {/* Popular Routes */}
          <section className="mb-xl">
            <h2 className="text-center mb-lg">Popular Routes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {[
                { from: 'Delhi', to: 'Mumbai', price: '₹4,999' },
                { from: 'Bangalore', to: 'Delhi', price: '₹5,499' },
                { from: 'Mumbai', to: 'Kolkata', price: '₹6,299' },
              ].map((route, index) => (
                <div key={index} className="card">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold mb-xs">{route.from} → {route.to}</p>
                      <p className="text-secondary">Starting from {route.price}</p>
                    </div>
                    <button className="button button--secondary">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-center mb-lg">Why Book with Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              <div className="card text-center">
                <h3 className="text-lg font-semibold mb-sm">Best Prices</h3>
                <p className="text-secondary">Get the best deals and competitive prices on flights</p>
              </div>
              <div className="card text-center">
                <h3 className="text-lg font-semibold mb-sm">Easy Booking</h3>
                <p className="text-secondary">Simple and hassle-free booking process</p>
              </div>
              <div className="card text-center">
                <h3 className="text-lg font-semibold mb-sm">24/7 Support</h3>
                <p className="text-secondary">Round-the-clock customer support for your queries</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default FlightsPage; 