import React from 'react';
import Layout from '../../components/layout/Layout';

const WeatherPage: React.FC = () => {
  const popularDestinations = [
    {
      id: 1,
      city: 'New Delhi',
      country: 'India',
      temp: '32°C',
      condition: 'Sunny',
      humidity: '65%',
      wind: '12 km/h',
    },
    {
      id: 2,
      city: 'Mumbai',
      country: 'India',
      temp: '29°C',
      condition: 'Partly Cloudy',
      humidity: '78%',
      wind: '15 km/h',
    },
    {
      id: 3,
      city: 'Bangalore',
      country: 'India',
      temp: '24°C',
      condition: 'Clear',
      humidity: '55%',
      wind: '8 km/h',
    },
  ];

  const forecast = [
    { day: 'Mon', temp: '32°C', condition: 'Sunny' },
    { day: 'Tue', temp: '30°C', condition: 'Partly Cloudy' },
    { day: 'Wed', temp: '29°C', condition: 'Cloudy' },
    { day: 'Thu', temp: '31°C', condition: 'Sunny' },
    { day: 'Fri', temp: '30°C', condition: 'Clear' },
    { day: 'Sat', temp: '28°C', condition: 'Rain' },
    { day: 'Sun', temp: '29°C', condition: 'Partly Cloudy' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Weather Forecast</h1>

        {/* Search Location */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter city or destination"
              className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Get Weather
            </button>
          </div>
        </div>

        {/* Popular Destinations Weather */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((destination) => (
              <div key={destination.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{destination.city}</h3>
                    <p className="text-gray-600">{destination.country}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{destination.temp}</div>
                    <p className="text-gray-600">{destination.condition}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Humidity</p>
                    <p className="font-medium">{destination.humidity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Wind Speed</p>
                    <p className="font-medium">{destination.wind}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7-Day Forecast */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">7-Day Forecast</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg bg-gray-50"
                >
                  <p className="font-medium mb-2">{day.day}</p>
                  <p className="text-2xl font-bold mb-2">{day.temp}</p>
                  <p className="text-gray-600">{day.condition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Weather Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Travel Weather Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Best Time to Visit</h3>
              <p className="text-gray-600">
                Learn about the ideal seasons to visit different destinations based on weather
                conditions.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Packing Guide</h3>
              <p className="text-gray-600">
                Get recommendations for what to pack based on the weather forecast at your
                destination.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Weather Alerts</h3>
              <p className="text-gray-600">
                Stay informed about weather warnings and travel advisories for your chosen
                destinations.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default WeatherPage; 