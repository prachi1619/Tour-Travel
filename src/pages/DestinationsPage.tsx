import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Layout from '../components/layout/Layout';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

interface Destination {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  price: number;
  rating: number;
  features: string[];
  category: string;
  createdAt: any;
}

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const destinationsCollection = collection(db, 'destinations');
      const destinationsSnapshot = await getDocs(destinationsCollection);
      const destinationsList = destinationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Destination[];
      setDestinations(destinationsList);
    } catch (err) {
      console.error('Error fetching destinations:', err);
      setError('Failed to load destinations');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Destinations' },
    { value: 'popular', label: 'Popular' },
    { value: 'beach', label: 'Beaches' },
    { value: 'mountain', label: 'Mountains' },
    { value: 'city', label: 'Cities' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'relaxation', label: 'Relaxation' }
  ];

  const sortOptions = [
    { value: 'rating', label: 'Rating (High to Low)' },
    { value: 'price-low', label: 'Price (Low to High)' },
    { value: 'price-high', label: 'Price (High to Low)' },
    { value: 'name', label: 'Name (A-Z)' }
  ];

  const filteredDestinations = destinations
    .filter(destination => {
      const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          destination.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || destination.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Explore Destinations</h1>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {filteredDestinations.length === 0 ? (
              <div className="text-center text-gray-600 py-12">
                <p className="text-xl">No destinations found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((destination) => (
                  <Link
                    key={destination.id}
                    to={`/destination/${destination.id}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <img
                          src={destination.imageUrl}
                          alt={destination.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                          <span className="text-yellow-500">★</span> {destination.rating}
                        </div>
                      </div>
                      <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                          {destination.name}
                        </h2>
                        <div className="flex items-center text-gray-600 mb-2">
                          <FaMapMarkerAlt className="mr-1" />
                          <span>{destination.location}</span>
                        </div>
                        <p className="text-gray-700 mb-4 line-clamp-2">
                          {destination.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-600 font-bold text-lg">
                            ₹{destination.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 capitalize">
                            {destination.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default DestinationsPage; 