import React, { useState, useEffect } from 'react';
import { generateItinerary, testApiConnection } from '../../services/itineraryGenerator';
import { FaSpinner, FaMapMarkerAlt, FaCalendar, FaDollarSign, FaHiking, FaExclamationTriangle, FaMapMarked, FaRoute } from 'react-icons/fa';
import DistanceCalculator from './DistanceCalculator';
import ItineraryDistanceCalculator from './ItineraryDistanceCalculator';

interface ItineraryFormData {
  destination: string;
  duration: number;
  interests: string[];
  budget: string;
  travelStyle: string;
}

const interestOptions = [
  'Culture & History',
  'Nature & Outdoors',
  'Food & Cuisine',
  'Shopping',
  'Adventure',
  'Relaxation',
  'Art & Museums',
  'Nightlife',
  'Local Experiences',
  'Photography'
];

const travelStyles = [
  'Relaxed',
  'Moderate',
  'Fast-paced',
  'Budget',
  'Luxury',
  'Family-friendly',
  'Solo',
  'Romantic',
  'Adventure',
  'Cultural'
];

const budgetLevels = [
  'Budget',
  'Mid-range',
  'Luxury',
  'Ultra-luxury'
];

const ItineraryGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ItineraryFormData>({
    destination: '',
    duration: 3,
    interests: [],
    budget: 'Mid-range',
    travelStyle: 'Moderate'
  });
  const [itinerary, setItinerary] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.interests.length === 0) {
      setError('Please select at least one interest');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Check API connection before generating itinerary
      const isConnected = await testApiConnection();
      if (!isConnected) {
        throw new Error('Unable to connect to the itinerary service. Please try again.');
      }

      const result = await generateItinerary(formData);
      setItinerary(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate itinerary');
    } finally {
      setLoading(false);
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleLocationClick = (location: string) => {
    // Open Google Maps in a new tab with the location
    const searchQuery = `${location}, ${formData.destination}, India`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
    window.open(mapsUrl, '_blank');
  };

  const extractLocations = (itinerary: any): string[] => {
    if (!itinerary?.dailyPlans) return [];
    
    const locations: string[] = [];
    itinerary.dailyPlans.forEach((day: any) => {
      day.activities.forEach((activity: any) => {
        if (activity.location) {
          locations.push(activity.location);
        }
      });
    });
    return locations;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">AI Travel Itinerary Generator</h2>
        <p className="text-gray-600">Create your perfect Indian travel experience in seconds</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaMapMarkerAlt className="inline mr-2 text-blue-500" />
                  Destination
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={e => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Jaipur, Rajasthan"
                  required
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCalendar className="inline mr-2 text-blue-500" />
                  Duration (days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.duration}
                  onChange={e => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaDollarSign className="inline mr-2 text-blue-500" />
                  Budget Level
                </label>
                <select
                  value={formData.budget}
                  onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {budgetLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Travel Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaHiking className="inline mr-2 text-blue-500" />
                  Travel Style
                </label>
                <select
                  value={formData.travelStyle}
                  onChange={e => setFormData(prev => ({ ...prev, travelStyle: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {travelStyles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interests (select multiple)
                </label>
                <div className="grid grid-cols-1 gap-2 bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">
                  {interestOptions.map(interest => (
                    <label key={interest} className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                        className="rounded text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Generating...
                  </span>
                ) : (
                  'Generate Itinerary'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
              <div className="flex items-center">
                <FaExclamationTriangle className="mr-2" />
                <div>{error}</div>
              </div>
            </div>
          )}

          {itinerary ? (
            <div className="space-y-6">
              {/* Trip Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Trip Summary</h3>
                <p className="text-gray-700 leading-relaxed">{itinerary.summary}</p>
              </div>

              {/* Daily Schedule */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Daily Schedule</h3>
                <div className="space-y-4">
                  {itinerary.dailyPlans.map((day: any) => (
                    <div key={day.day} className="bg-white border rounded-xl shadow-sm overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3">
                        <h4 className="font-bold text-lg text-white">Day {day.day}</h4>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          {day.activities.map((activity: any, index: number) => (
                            <div key={index} className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                              <div className="flex-shrink-0 w-24">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                  {activity.time}
                                </span>
                              </div>
                              <div className="flex-grow">
                                <p className="text-gray-800 font-medium">{activity.activity}</p>
                                {activity.location && (
                                  <button
                                    onClick={() => handleLocationClick(activity.location)}
                                    className="text-sm text-gray-600 mt-1 flex items-center hover:text-blue-600 transition-colors duration-200"
                                  >
                                    <FaMapMarkerAlt className="text-red-500 mr-1" />
                                    <span>{activity.location}</span>
                                    <FaMapMarked className="ml-2 text-blue-500" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary Distances */}
              {itinerary && extractLocations(itinerary).length >= 2 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    <FaRoute className="inline-block mr-2 text-blue-500" />
                    Daily Travel Distances
                  </h3>
                  <ItineraryDistanceCalculator
                    locations={extractLocations(itinerary)}
                    city={formData.destination}
                  />
                </div>
              )}

              {/* Travel Tips */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Travel Tips</h3>
                <ul className="space-y-3">
                  {itinerary.tips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 flex-grow">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Budget Estimate */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Budget Estimate</h3>
                <div className="space-y-3">
                  {itinerary.estimatedBudget.split('\n').map((line: string, index: number) => {
                    const [category, amount] = line.split(':').map(s => s.trim());
                    return (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-yellow-200 last:border-0">
                        <span className="text-gray-700 font-medium">{category}</span>
                        <span className="text-lg font-bold text-gray-900">{amount}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FaMapMarkerAlt className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Ready to Plan Your Journey?
              </h3>
              <p className="text-gray-500">
                Fill out the form to generate your personalized travel itinerary
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryGenerator; 