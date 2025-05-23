import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface Festival {
  id: string;
  name: string;
  location: string;
  date: string;
  description: string;
  image: string;
}

const FESTIVALS: Festival[] = [
  {
    id: '1',
    name: 'Pushkar Mela',
    location: 'Pushkar, Rajasthan',
    date: 'November 20-28, 2024',
    description: 'One of India\'s largest camel and livestock fairs, also known for its cultural events.',
    image: '/images/festivals/pushkar-mela.jpg'
  },
  {
    id: '2',
    name: 'Hornbill Festival',
    location: 'Kohima, Nagaland',
    date: 'December 1-10, 2024',
    description: 'A celebration of the indigenous warrior tribes of Nagaland.',
    image: '/images/festivals/hornbill.jpg'
  },
  {
    id: '3',
    name: 'Holi in Vrindavan',
    location: 'Vrindavan, Uttar Pradesh',
    date: 'March 25, 2024',
    description: 'Experience the most vibrant celebration of colors in the land of Lord Krishna.',
    image: '/images/festivals/holi.jpg'
  },
  // Add more festivals as needed
];

const REGIONS = ['All Regions', 'North India', 'South India', 'East India', 'West India', 'Northeast India'];
const MONTHS = ['All Months', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const FestivalCalendar: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedMonth, setSelectedMonth] = useState('All Months');

  const filteredFestivals = FESTIVALS.filter(festival => {
    if (selectedRegion !== 'All Regions' && !festival.location.includes(selectedRegion)) {
      return false;
    }
    if (selectedMonth !== 'All Months' && !festival.date.includes(selectedMonth)) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Festival Calendar</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Region
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            {REGIONS.map(region => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            {MONTHS.map(month => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Festivals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFestivals.map(festival => (
          <div
            key={festival.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition"
          >
            <img
              src={festival.image}
              alt={festival.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{festival.name}</h3>
              
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <FaMapMarkerAlt />
                <span>{festival.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                <FaCalendarAlt />
                <span>{festival.date}</span>
              </div>

              <p className="text-gray-600 text-sm">
                {festival.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredFestivals.length === 0 && (
        <div className="text-center text-gray-600 py-8">
          No festivals found for the selected filters.
        </div>
      )}
    </div>
  );
};

export default FestivalCalendar; 