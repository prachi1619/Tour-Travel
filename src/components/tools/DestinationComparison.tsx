import React, { useState } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';

interface DestinationDetails {
  name: string;
  climate: string;
  bestTime: string;
  avgCost: string;
  attractions: string[];
  cuisine: string[];
  accommodation: {
    budget: string;
    midRange: string;
    luxury: string;
  };
}

const mockDestinationData: Record<string, DestinationDetails> = {
  'jaipur': {
    name: 'Jaipur',
    climate: 'Hot semi-arid',
    bestTime: 'October to March',
    avgCost: '₹2,500 - ₹5,000 per day',
    attractions: [
      'Amber Fort',
      'Hawa Mahal',
      'City Palace',
      'Jantar Mantar',
      'Albert Hall Museum'
    ],
    cuisine: [
      'Dal Baati Churma',
      'Laal Maas',
      'Ker Sangri',
      'Pyaaz Kachori'
    ],
    accommodation: {
      budget: '₹800 - ₹2,000',
      midRange: '₹2,000 - ₹5,000',
      luxury: '₹5,000+'
    }
  },
  'goa': {
    name: 'Goa',
    climate: 'Tropical monsoon',
    bestTime: 'November to February',
    avgCost: '₹3,000 - ₹6,000 per day',
    attractions: [
      'Calangute Beach',
      'Basilica of Bom Jesus',
      'Fort Aguada',
      'Dudhsagar Falls',
      'Anjuna Flea Market'
    ],
    cuisine: [
      'Fish Curry Rice',
      'Vindaloo',
      'Xacuti',
      'Bebinca'
    ],
    accommodation: {
      budget: '₹1,000 - ₹2,500',
      midRange: '₹2,500 - ₹6,000',
      luxury: '₹6,000+'
    }
  },
  'varanasi': {
    name: 'Varanasi',
    climate: 'Humid subtropical',
    bestTime: 'October to March',
    avgCost: '₹1,500 - ₹4,000 per day',
    attractions: [
      'Dashashwamedh Ghat',
      'Kashi Vishwanath Temple',
      'Sarnath',
      'Assi Ghat',
      'Evening Aarti'
    ],
    cuisine: [
      'Banarasi Paan',
      'Kachori Sabzi',
      'Thandai',
      'Lassi'
    ],
    accommodation: {
      budget: '₹500 - ₹1,500',
      midRange: '₹1,500 - ₹4,000',
      luxury: '₹4,000+'
    }
  }
};

const DestinationComparison = () => {
  const [destinations, setDestinations] = useState<{
    first: string;
    second: string;
  }>({
    first: '',
    second: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    first: DestinationDetails | null;
    second: DestinationDetails | null;
  }>({
    first: null,
    second: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDestinations(prev => ({
      ...prev,
      [name]: value.toLowerCase()
    }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const firstDest = mockDestinationData[destinations.first];
      const secondDest = mockDestinationData[destinations.second];

      if (!firstDest || !secondDest) {
        throw new Error('One or both destinations not found. Try: jaipur, goa, or varanasi');
      }

      setResults({
        first: firstDest,
        second: secondDest
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compare destinations');
    } finally {
      setLoading(false);
    }
  };

  const renderDestinationDetails = (details: DestinationDetails | null) => {
    if (!details) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">{details.name}</h3>
        <div>
          <p className="font-medium">Climate</p>
          <p className="text-gray-600">{details.climate}</p>
        </div>
        <div>
          <p className="font-medium">Best Time to Visit</p>
          <p className="text-gray-600">{details.bestTime}</p>
        </div>
        <div>
          <p className="font-medium">Average Daily Cost</p>
          <p className="text-gray-600">{details.avgCost}</p>
        </div>
        <div>
          <p className="font-medium">Top Attractions</p>
          <ul className="list-disc list-inside text-gray-600">
            {details.attractions.map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium">Local Cuisine</p>
          <ul className="list-disc list-inside text-gray-600">
            {details.cuisine.map((dish, index) => (
              <li key={index}>{dish}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium">Accommodation Costs</p>
          <div className="text-gray-600">
            <p>Budget: {details.accommodation.budget}</p>
            <p>Mid-Range: {details.accommodation.midRange}</p>
            <p>Luxury: {details.accommodation.luxury}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Compare Destinations</h2>
      
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">First Destination</label>
            <input
              type="text"
              name="first"
              value={destinations.first}
              onChange={handleInputChange}
              placeholder="e.g., Jaipur"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Second Destination</label>
            <input
              type="text"
              name="second"
              value={destinations.second}
              onChange={handleInputChange}
              placeholder="e.g., Goa"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Comparing...
            </>
          ) : (
            <>
              <FaSearch className="mr-2" />
              Compare
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      {(results.first || results.second) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded">
            {renderDestinationDetails(results.first)}
          </div>
          <div className="bg-gray-50 p-4 rounded">
            {renderDestinationDetails(results.second)}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationComparison; 