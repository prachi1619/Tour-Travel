import React, { useState, useEffect } from 'react';
import { generateItinerary, testApiConnection } from '../../services/itineraryGenerator';
import { FaSpinner, FaMapMarkerAlt, FaCalendar, FaDollarSign, FaHiking, FaExclamationTriangle } from 'react-icons/fa';

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

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">AI Travel Itinerary Generator</h2>
        <p className="text-gray-600">Create your perfect trip itinerary in seconds</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaMapMarkerAlt className="inline mr-2" />
                Destination
              </label>
              <input
                type="text"
                value={formData.destination}
                onChange={e => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., Paris, France"
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaCalendar className="inline mr-2" />
                Duration (days)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={formData.duration}
                onChange={e => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaDollarSign className="inline mr-2" />
                Budget Level
              </label>
              <select
                value={formData.budget}
                onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full p-2 border rounded-lg"
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
                <FaHiking className="inline mr-2" />
                Travel Style
              </label>
              <select
                value={formData.travelStyle}
                onChange={e => setFormData(prev => ({ ...prev, travelStyle: e.target.value }))}
                className="w-full p-2 border rounded-lg"
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
              <div className="grid grid-cols-2 gap-2">
                {interestOptions.map(interest => (
                  <label key={interest} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestToggle(interest)}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
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

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              {error}
            </div>
          )}

          {itinerary ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Trip Summary</h3>
                <p className="text-gray-600">{itinerary.summary}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Daily Schedule</h3>
                <div className="space-y-4">
                  {itinerary.dailyPlans.map((day: any) => (
                    <div key={day.day} className="border rounded-lg p-4">
                      <h4 className="font-bold mb-2">Day {day.day}</h4>
                      <div className="space-y-2">
                        {day.activities.map((activity: any, index: number) => (
                          <div key={index} className="flex">
                            <span className="font-medium w-20">{activity.time}</span>
                            <div>
                              <p>{activity.activity}</p>
                              {activity.location && (
                                <p className="text-sm text-gray-600">📍 {activity.location}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Travel Tips</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {itinerary.tips.map((tip: string, index: number) => (
                    <li key={index} className="text-gray-600">{tip}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Budget Estimate</h3>
                <p className="text-gray-600">{itinerary.estimatedBudget}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Fill out the form and generate your personalized travel itinerary
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryGenerator; 