import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaHeart } from 'react-icons/fa';
import { Destination } from '../../types/destination';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Link
      to={`/destinations/${destination.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-48 object-cover"
        />
        {destination.isFeatured && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm">
            Featured
          </div>
        )}
        {destination.isHiddenGem && (
          <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded text-sm">
            Hidden Gem
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{destination.name}</h3>
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mr-1" />
            <span>{destination.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-2">
          <FaMapMarkerAlt className="mr-1" />
          <span>{destination.state}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {destination.description}
        </p>

        <div className="flex justify-between items-center text-sm">
          <div className="text-blue-600">
            Best time: {destination.bestTimeToVisit.months.join(', ')}
          </div>
          <div className="flex items-center text-gray-600">
            <FaHeart className={`mr-1 ${destination.isTrending ? 'text-red-500' : ''}`} />
            {destination.isTrending ? 'Trending' : ''}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard; 