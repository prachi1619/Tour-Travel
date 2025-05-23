import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

interface SearchFiltersProps {
  filters: {
    state: string;
    type: string;
    featured: boolean;
    trending: boolean;
    hiddenGem: boolean;
  };
  onFilterChange: (filters: SearchFiltersProps['filters']) => void;
}

const STATES = [
  'All States',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const DESTINATION_TYPES = [
  'All Types',
  'City',
  'Town',
  'Village',
  'Region',
];

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFilterChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    onFilterChange({
      ...filters,
      [name]: checked,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* State Filter */}
        <div className="md:w-48">
          <select
            name="state"
            value={filters.state}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {STATES.map((state) => (
              <option key={state} value={state === 'All States' ? '' : state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="md:w-48">
          <select
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {DESTINATION_TYPES.map((type) => (
              <option key={type} value={type === 'All Types' ? '' : type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Additional Filters */}
      <div className="flex flex-wrap gap-4 mt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            checked={filters.featured}
            onChange={handleCheckboxChange}
            className="mr-2 rounded text-blue-600"
          />
          Featured
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="trending"
            checked={filters.trending}
            onChange={handleCheckboxChange}
            className="mr-2 rounded text-blue-600"
          />
          Trending
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="hiddenGem"
            checked={filters.hiddenGem}
            onChange={handleCheckboxChange}
            className="mr-2 rounded text-blue-600"
          />
          Hidden Gems
        </label>
      </div>
    </div>
  );
};

export default SearchFilters; 