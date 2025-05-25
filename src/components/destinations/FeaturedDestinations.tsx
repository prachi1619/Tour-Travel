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

const CARD_ANIMATION = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12 } }),
};

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
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-48 bg-gray-200 w-full" />
            <div className="p-5 flex-1 flex flex-col gap-3">
              <div className="h-6 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
          <FaExclamationCircle className="text-yellow-600 text-4xl" aria-label="Error" />
        </div>
        <p className="text-gray-700 text-lg mb-6 max-w-md text-center">{error}</p>
        <Link
          to="/admin/add-sample-data"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
        >
          Add Sample Destinations
        </Link>
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-gray-500 text-lg">No featured destinations available.</p>
      </div>
    );
  }

  return (
    <section aria-label="Featured Destinations" className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations.map((destination, i) => (
          <motion.div
            key={destination.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={CARD_ANIMATION}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
          >
            <Link
              to={`/destination/${destination.id}`}
              className="block focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`View details for ${destination.name}`}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://via.placeholder.com/800x600/718096/FFFFFF?text=${destination.name}`;
                  }}
                />
                <span className="absolute top-4 left-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow">
                  {destination.category}
                </span>
              </div>
              <div className="flex-1 flex flex-col p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{destination.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <FaMapMarkerAlt className="mr-1 text-blue-500" />
                  <span>{destination.location}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{destination.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="text-gray-800 font-semibold">{destination.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-blue-600 font-bold">From {destination.price}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDestinations;