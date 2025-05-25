import React, { useState } from 'react';
import { FaRoute, FaClock, FaSpinner, FaSearch, FaTimesCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { calculateDirectDistance } from '../services/distanceCalculator';

interface DistanceResult {
  origin: string;
  destination: string;
  distance: string;
  duration: string;
}

const DistanceCalculator: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState<DistanceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    if (!origin || !destination) {
      setError('Please enter both origin and destination');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const calculatedResult = await calculateDirectDistance(
        `${origin}, India`,
        `${destination}, India`
      );
      setResult(calculatedResult);
    } catch (err) {
      setError('Failed to calculate distance. Please check the locations and try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setOrigin('');
    setDestination('');
    setResult(null);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Distance Calculator</h1>
        <p className="text-gray-600">Calculate distances and travel times between any locations in India</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Origin Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Origin Location
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter origin city"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Destination Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Destination Location
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter destination city"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleCalculate}
            disabled={loading || !origin || !destination}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Calculating...
              </>
            ) : (
              <>
                <FaSearch className="mr-2" />
                Calculate Distance
              </>
            )}
          </button>
          <button
            onClick={handleClear}
            className="flex items-center justify-center px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <FaTimesCircle className="mr-2" />
            Clear
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 text-red-500 p-4 bg-red-50 rounded-lg flex items-center">
            <FaTimesCircle className="mr-2" />
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Distance Information</h2>
          
          {/* Route Summary */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm text-gray-600">From</div>
                <div className="font-medium text-gray-800">{result.origin}</div>
              </div>
              <FaRoute className="text-blue-500 text-xl mx-4" />
              <div className="space-y-1 text-right">
                <div className="text-sm text-gray-600">To</div>
                <div className="font-medium text-gray-800">{result.destination}</div>
              </div>
            </div>
          </div>

          {/* Distance and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Distance</div>
              <div className="text-2xl font-bold text-blue-600">{result.distance}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Estimated Travel Time</div>
              <div className="text-2xl font-bold text-blue-600">
                <FaClock className="inline-block mr-2 text-xl" />
                {result.duration}
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="text-sm text-gray-500 mt-4">
            Note: Travel times are estimates based on typical driving conditions. Actual times may vary based on traffic, weather, and route conditions.
          </div>
        </div>
      )}
    </div>
  );
};

export default DistanceCalculator; 