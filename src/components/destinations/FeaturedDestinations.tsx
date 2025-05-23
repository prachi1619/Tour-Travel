import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaExclamationCircle } from 'react-icons/fa';

interface Destination {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  rating: number;
  price: string;
  location: string;
  featured: boolean;
}

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeaturedDestinations = async () => {
      try {
        setLoading(true);
        setError('');
        
        const destinationsRef = collection(db, 'destinations');
        const q = query(
          destinationsRef,
          where('featured', '==', true),
          orderBy('rating', 'desc'),
          limit(4)
        );
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setError('No featured destinations found. Please add some destinations first.');
          return;
        }

        const destinationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Destination[];

        setDestinations(destinationsData);
      } catch (err) {
        console.error('Error fetching featured destinations:', err);
        setError('Failed to load featured destinations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedDestinations();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-xl overflow-hidden">
              <div className="aspect-w-16 aspect-h-12 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center p-4 mb-4 bg-yellow-100 rounded-full">
          <FaExclamationCircle className="text-yellow-600 text-xl" />
        </div>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link 
          to="/admin/add-sample-data"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Sample Destinations
        </Link>
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No featured destinations available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {destinations.map((destination, index) => (
        <motion.div
          key={destination.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            to={`/destination/${destination.id}`}
            className="block group"
          >
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://via.placeholder.com/800x600/718096/FFFFFF?text=${destination.name}`;
                  }}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">{destination.category}</span>
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-bold text-white mb-2">{destination.name}</h3>
                <div className="flex items-center text-white/90 mb-2">
                  <FaMapMarkerAlt className="mr-1" />
                  <span className="text-sm">{destination.location}</span>
                </div>
                <p className="text-white/80 text-sm mb-3 line-clamp-2">
                  {destination.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-white font-medium">
                      {destination.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-white font-medium">
                    From {destination.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedDestinations; 