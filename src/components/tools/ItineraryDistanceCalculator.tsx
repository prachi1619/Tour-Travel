import React, { useEffect, useState } from 'react';
import { calculateDistances, calculateDirectDistance, calculateTotalDistance, formatDuration } from '../../services/distanceCalculator';
import { FaRoute, FaClock, FaSpinner, FaSearch, FaTimesCircle } from 'react-icons/fa';

interface ItineraryDistanceCalculatorProps {
  locations?: string[];
  city?: string;
}

interface DistanceResult {
  origin: string;
  destination: string;
  distance: string;
  duration: string;
}

const ItineraryDistanceCalculator: React.FC<ItineraryDistanceCalculatorProps> = ({ locations, city }) => {
  const [distances, setDistances] = useState<DistanceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (locations && city && locations.length >= 2) {
      fetchItineraryDistances();
    }
  }, [locations, city]);

  const fetchItineraryDistances = async () => {
    if (!locations || !city) return;

    setLoading(true);
    setError(null);

    try {
      const results = await calculateDistances(locations, city);
      setDistances(results);
    } catch (err) {
      setError('Failed to calculate distances. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <FaSpinner className="animate-spin text-blue-500 text-2xl" />
        <span className="ml-2 text-gray-600">Calculating distances...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  if (distances.length === 0) {
    return null;
  }

  const totalDistance = calculateTotalDistance(distances);

  return (
    <div className="space-y-4">
      {/* Total Distance Summary */}
      <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center">
          <FaRoute className="text-blue-500 text-xl mr-2" />
          <span className="font-medium">Total Distance:</span>
        </div>
        <span className="text-lg font-bold text-blue-700">
          {totalDistance}
        </span>
      </div>

      {/* Individual Segments */}
      <div className="space-y-3">
        {distances.map((result, index) => (
          <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="font-medium text-gray-800">
                  {result.origin} → {result.destination}
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <FaClock className="mr-1" />
                  {formatDuration(result.duration)}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">{result.distance}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryDistanceCalculator; 