import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ItineraryFormData {
  destination: string;
  duration: number;
  travelStyle: 'Relaxed' | 'Moderate' | 'Intensive';
  interests: string[];
}

const generateItinerary = (data: ItineraryFormData): string => {
  const { destination, duration, travelStyle, interests } = data;
  
  // This is a template-based itinerary generator
  let itinerary = `${duration}-Day ${travelStyle} Itinerary for ${destination}\n\n`;
  
  const activitiesPerDay = {
    Relaxed: 2,
    Moderate: 3,
    Intensive: 4
  };

  const activities = {
    'Historical Sites': [
      'Visit ancient temples',
      'Explore historical monuments',
      'Tour heritage buildings',
      'Visit museums',
      'Walk through old quarters'
    ],
    'Nature': [
      'Nature trail hiking',
      'Visit national parks',
      'Bird watching',
      'Garden tours',
      'Lake/riverside visits'
    ],
    'Food & Culture': [
      'Local food tasting',
      'Cooking classes',
      'Cultural performances',
      'Market visits',
      'Street food tours'
    ],
    'Adventure': [
      'Adventure sports',
      'Trekking',
      'Water sports',
      'Rock climbing',
      'Mountain biking'
    ]
  };

  // Generate day-wise itinerary
  for (let day = 1; day <= duration; day++) {
    itinerary += `\nDay ${day}:\n`;
    const dayActivities = new Set<string>();

    // Add activities based on interests and travel style
    for (let i = 0; i < activitiesPerDay[travelStyle]; i++) {
      const selectedInterest = interests[Math.floor(Math.random() * interests.length)];
      const possibleActivities = activities[selectedInterest as keyof typeof activities];
      const activity = possibleActivities[Math.floor(Math.random() * possibleActivities.length)];
      
      if (!dayActivities.has(activity)) {
        dayActivities.add(activity);
        itinerary += `- ${activity}\n`;
      }
    }

    // Add meals
    itinerary += '- Breakfast at hotel\n';
    if (travelStyle !== 'Relaxed') {
      itinerary += '- Local lunch\n';
    }
    itinerary += '- Dinner at recommended restaurant\n';
  }

  return itinerary;
};

const ItineraryGenerator = () => {
  const [formData, setFormData] = useState<ItineraryFormData>({
    destination: '',
    duration: 1,
    travelStyle: 'Relaxed',
    interests: []
  });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.destination) {
        throw new Error('Please enter a destination');
      }
      if (formData.interests.length === 0) {
        throw new Error('Please select at least one interest');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = generateItinerary(formData);
      setItinerary(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate itinerary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI Itinerary Generator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="Where do you want to go?"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Duration (days)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="1"
                max="30"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Travel Style</label>
              <select
                name="travelStyle"
                value={formData.travelStyle}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option>Relaxed</option>
                <option>Moderate</option>
                <option>Intensive</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Interests</label>
              <div className="space-y-2">
                {['Historical Sites', 'Nature', 'Food & Culture', 'Adventure'].map((interest) => (
                  <label key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="mr-2"
                    />
                    {interest}
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                'Generate Itinerary'
              )}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-bold mb-4">Generated Itinerary</h3>
          {itinerary ? (
            <pre className="whitespace-pre-wrap font-sans">{itinerary}</pre>
          ) : (
            <p className="text-gray-600">
              Your personalized itinerary will appear here after generation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryGenerator; 