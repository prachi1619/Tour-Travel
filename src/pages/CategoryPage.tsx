import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Layout from '../components/layout/Layout';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Destination {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  rating: number;
  price: string;
  location: string;
}

const CategoryPage = () => {
  const { category } = useParams();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const destinationsRef = collection(db, 'destinations');
        const q = query(destinationsRef, where('category', '==', category));
        const querySnapshot = await getDocs(q);
        
        const destinationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Destination[];

        setDestinations(destinationsData);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Failed to load destinations');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [category]);

  const categoryColors: { [key: string]: string } = {
    'adventure': 'from-orange-600 to-orange-700',
    'spiritual': 'from-purple-600 to-purple-700',
    'nature': 'from-green-600 to-green-700',
    'historical': 'from-blue-600 to-blue-700',
    'romantic': 'from-red-600 to-red-700',
  };

  const gradientClass = categoryColors[category?.toLowerCase() || ''] || 'from-blue-600 to-blue-700';

  return (
    <Layout>
      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${gradientClass} py-16 text-white`}>
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 capitalize"
          >
            {category} Destinations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90"
          >
            Discover amazing {category?.toLowerCase()} experiences across India
          </motion.p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">
              {error}
            </div>
          ) : destinations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">No destinations found in this category.</p>
              <Link to="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
                Return to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        />
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {destination.name}
                        </h3>
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
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CategoryPage; 