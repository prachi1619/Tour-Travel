import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { 
  FaStar, FaMapMarkerAlt, FaCalendar, FaClock, 
  FaRupeeSign, FaUsers, FaHeart 
} from 'react-icons/fa';

interface Destination {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  rating: number;
  price: string;
  location: string;
  duration: string;
  groupSize: string;
  bestTime: string;
  highlights: string[];
  includes: string[];
  gallery: string[];
}

const DestinationPage = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error('No destination ID provided');
        
        const destinationRef = doc(db, 'destinations', id);
        const destinationDoc = await getDoc(destinationRef);
        
        if (!destinationDoc.exists()) {
          throw new Error('Destination not found');
        }

        setDestination({
          id: destinationDoc.id,
          ...destinationDoc.data()
        } as Destination);
      } catch (err) {
        console.error('Error fetching destination:', err);
        setError('Failed to load destination details');
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !destination) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl text-red-600 mb-4">{error || 'Destination not found'}</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={destination.gallery?.[activeImage] || destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {destination.name}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center text-lg"
            >
              <FaMapMarkerAlt className="mr-2" />
              {destination.location}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">About this destination</h2>
                <p className="text-gray-600 mb-6">{destination.description}</p>
                
                <h3 className="text-xl font-bold mb-4">Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {destination.highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold mb-4">What's Included</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.includes?.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Gallery */}
              {destination.gallery && destination.gallery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {destination.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="cursor-pointer relative aspect-w-16 aspect-h-12 rounded-lg overflow-hidden"
                        onClick={() => setActiveImage(index)}
                      >
                        <img
                          src={image}
                          alt={`${destination.name} - ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Booking Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-blue-600">
                      {destination.price}
                    </span>
                    <span className="text-gray-600 text-sm">/person</span>
                  </div>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-medium">{destination.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <FaCalendar className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Best Time to Visit</p>
                      <p className="font-medium">{destination.bestTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-medium">{destination.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Group Size</p>
                      <p className="font-medium">{destination.groupSize}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                  <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center">
                    <FaHeart className="mr-2" />
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DestinationPage; 