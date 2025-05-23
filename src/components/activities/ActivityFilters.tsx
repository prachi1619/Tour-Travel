import React, { useState } from 'react';
import { FaFilter, FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';

interface Activity {
  id: string;
  name: string;
  type: string;
  location: string;
  price: number;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Difficult';
  rating: number;
  image: string;
  description: string;
}

interface ActivityFiltersProps {
  onFilterChange: (filters: any) => void;
}

const ACTIVITY_TYPES = [
  'River Rafting',
  'Trekking',
  'Paragliding',
  'Mountain Climbing',
  'Scuba Diving',
  'Wildlife Safari',
  'Cultural Tours',
  'Food Tours',
];

const LOCATIONS = [
  'Rishikesh',
  'Manali',
  'Ladakh',
  'Goa',
  'Andaman Islands',
  'Kerala Backwaters',
  'Rajasthan',
];

const DURATIONS = [
  'Half Day',
  'Full Day',
  '2-3 Days',
  '4-7 Days',
  'More than 7 Days',
];

const DIFFICULTIES = ['Easy', 'Moderate', 'Difficult'];

const ActivityFilters: React.FC<ActivityFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    types: [] as string[],
    locations: [] as string[],
    durations: [] as string[],
    difficulties: [] as string[],
    priceRange: [0, 50000],
    rating: 0,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (category: string, value: string) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter((item: string) => item !== value)
          : [...prev[category], value],
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handlePriceChange = (value: [number, number]) => {
    setFilters((prev) => {
      const newFilters = { ...prev, priceRange: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleRatingChange = (value: number) => {
    setFilters((prev) => {
      const newFilters = { ...prev, rating: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-800"
        >
          <FaFilter />
        </button>
      </div>

      <div className={`space-y-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
        {/* Activity Types */}
        <div>
          <h3 className="font-medium mb-2">Activity Type</h3>
          <div className="space-y-2">
            {ACTIVITY_TYPES.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.types.includes(type)}
                  onChange={() => handleFilterChange('types', type)}
                  className="rounded text-blue-600"
                />
                <span className="ml-2 text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <h3 className="font-medium mb-2">Location</h3>
          <div className="space-y-2">
            {LOCATIONS.map((location) => (
              <label key={location} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.locations.includes(location)}
                  onChange={() => handleFilterChange('locations', location)}
                  className="rounded text-blue-600"
                />
                <span className="ml-2 text-gray-700">{location}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h3 className="font-medium mb-2">Duration</h3>
          <div className="space-y-2">
            {DURATIONS.map((duration) => (
              <label key={duration} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.durations.includes(duration)}
                  onChange={() => handleFilterChange('durations', duration)}
                  className="rounded text-blue-600"
                />
                <span className="ml-2 text-gray-700">{duration}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <h3 className="font-medium mb-2">Difficulty Level</h3>
          <div className="space-y-2">
            {DIFFICULTIES.map((difficulty) => (
              <label key={difficulty} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.difficulties.includes(difficulty)}
                  onChange={() => handleFilterChange('difficulties', difficulty)}
                  className="rounded text-blue-600"
                />
                <span className="ml-2 text-gray-700">{difficulty}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-2">Price Range (₹)</h3>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handlePriceChange([filters.priceRange[0], parseInt(e.target.value)])
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-medium mb-2">Minimum Rating</h3>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`p-2 ${
                  filters.rating >= star
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFilters; 