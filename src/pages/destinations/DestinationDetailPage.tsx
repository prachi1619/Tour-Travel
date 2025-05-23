import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRupeeSign, FaPlane, FaTrain, FaCar } from 'react-icons/fa';
import Layout from '../../components/layout/Layout';
import { destinationService } from '../../services/destinationService';
import { Destination } from '../../types/destination';

const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'attractions' | 'food' | 'stay' | 'transport'>('overview');

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);
        const data = await destinationService.getDestinationById(id!);
        setDestination(data);
      } catch (err) {
        setError('Failed to load destination details');
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !destination) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-8">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
            <div className="flex items-center text-lg">
              <FaMapMarkerAlt className="mr-2" />
              {destination.state}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto mb-8 bg-white rounded-lg shadow">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('attractions')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'attractions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
          >
            Attractions
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'food' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
          >
            Local Food
          </button>
          <button
            onClick={() => setActiveTab('stay')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'stay' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
          >
            Where to Stay
          </button>
          <button
            onClick={() => setActiveTab('transport')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'transport' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
          >
            How to Reach
          </button>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <>
                <section>
                  <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                  <p className="text-gray-600">{destination.description}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">History</h2>
                  <p className="text-gray-600">{destination.history}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Cultural Significance</h2>
                  <p className="text-gray-600">{destination.culturalSignificance}</p>
                </section>
              </>
            )}

            {activeTab === 'attractions' && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Must-Visit Attractions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {destination.attractions.map((attraction) => (
                    <div key={attraction.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img
                        src={attraction.imageUrl}
                        alt={attraction.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{attraction.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{attraction.description}</p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Entry: {attraction.entryFee ? `₹${attraction.entryFee}` : 'Free'}</span>
                          <span>{attraction.timings}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'food' && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Local Food Specialties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {destination.localFood.map((food) => (
                    <div key={food.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{food.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{food.description}</p>
                        <div className="text-sm text-gray-500">
                          <div>Price Range: {food.price}</div>
                          <div>Where to try: {food.where.join(', ')}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'stay' && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Accommodation Options</h2>
                <div className="space-y-6">
                  {destination.accommodations.map((accommodation) => (
                    <div key={accommodation.id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-start">
                        <img
                          src={accommodation.imageUrl}
                          alt={accommodation.name}
                          className="w-32 h-32 object-cover rounded-lg mr-6"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{accommodation.name}</h3>
                          <div className="text-sm text-gray-500 space-y-1">
                            <div>Type: {accommodation.type}</div>
                            <div>Price Range: {accommodation.priceRange}</div>
                            <div>Rating: {accommodation.rating}/5</div>
                            <div>Location: {accommodation.location}</div>
                            <div>Amenities: {accommodation.amenities.join(', ')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'transport' && (
              <section>
                <h2 className="text-2xl font-bold mb-6">How to Reach</h2>
                <div className="space-y-6">
                  {destination.transportOptions.map((option) => (
                    <div key={option.mode} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center mb-4">
                        {option.mode === 'Air' && <FaPlane className="text-2xl mr-3" />}
                        {option.mode === 'Train' && <FaTrain className="text-2xl mr-3" />}
                        {option.mode === 'Road' && <FaCar className="text-2xl mr-3" />}
                        <h3 className="text-lg font-semibold">By {option.mode}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{option.description}</p>
                      <div className="text-sm text-gray-500">
                        <div>Routes: {option.routes.join(', ')}</div>
                        <div>Frequency: {option.frequency}</div>
                        <div>Estimated Cost: {option.estimatedCost}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Best Time to Visit */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Best Time to Visit</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <FaClock className="mr-2" />
                {destination.bestTimeToVisit.months.join(', ')}
              </div>
              <p className="text-sm text-gray-600">{destination.bestTimeToVisit.description}</p>
            </div>

            {/* Budget Calculator */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Estimated Budget</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Per Day Expenses</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Budget</span>
                      <span>₹{destination.budget.accommodation.budget + destination.budget.food.budget + destination.budget.transportation.budget + destination.budget.activities.budget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Standard</span>
                      <span>₹{destination.budget.accommodation.standard + destination.budget.food.standard + destination.budget.transportation.standard + destination.budget.activities.standard}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Luxury</span>
                      <span>₹{destination.budget.accommodation.luxury + destination.budget.food.luxury + destination.budget.transportation.luxury + destination.budget.activities.luxury}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Warnings */}
            {destination.travelWarnings.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Travel Warnings</h3>
                <div className="space-y-4">
                  {destination.travelWarnings.map((warning, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded ${
                        warning.severity === 'High'
                          ? 'bg-red-50 text-red-700'
                          : warning.severity === 'Medium'
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      <div className="font-medium mb-1">{warning.type}</div>
                      <p className="text-sm">{warning.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Places */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Nearby Places</h3>
              <div className="space-y-4">
                {destination.nearbyPlaces.map((place) => (
                  <div key={place.id} className="flex items-start">
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div>
                      <h4 className="font-medium">{place.name}</h4>
                      <div className="text-sm text-gray-600">
                        <div>{place.distance} km away</div>
                        <div>{place.travelTime} by car</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DestinationDetailPage; 