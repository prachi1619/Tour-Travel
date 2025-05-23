import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Layout from '../components/layout/Layout';
import BookingForm from '../components/booking/BookingForm';
import ReviewSection from '../components/social/ReviewSection';
import CommentThread from '../components/social/CommentThread';
import QASection from '../components/social/QASection';
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPlane,
  FaTrain,
  FaCar,
  FaUtensils,
  FaShoppingBag,
  FaBed,
  FaWalking,
  FaExclamationTriangle,
  FaMoneyBillWave,
  FaStar,
  FaUsers,
  FaClock,
  FaDollarSign,
  FaArrowLeft,
} from 'react-icons/fa';

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
  reviews?: number;
  images?: string[];
  highlights?: string[];
  howToReach?: {
    air?: string;
    train?: string;
    road?: string;
  };
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  included?: string[];
  excluded?: string[];
  duration?: string;
  groupSize?: string;
  bestTime?: string;
}

const DestinationDetail = () => {
  const { destinationId } = useParams<{ destinationId: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchDestination = async () => {
      if (!destinationId) {
        setError('Destination not found');
        setLoading(false);
        return;
      }

      try {
        const destinationDoc = await getDoc(doc(db, 'destinations', destinationId));
        
        if (destinationDoc.exists()) {
          setDestination({
            id: destinationDoc.id,
            ...destinationDoc.data()
          } as Destination);
        } else {
          setError('Destination not found');
        }
      } catch (err) {
        console.error('Error fetching destination:', err);
        setError('Failed to load destination');
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [destinationId]);

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
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
            <Link to="/destinations" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
              <FaArrowLeft className="mr-2" /> Back to Destinations
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/destinations"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Destinations
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative h-96 mb-8">
              <img
                src={destination.images?.[currentImageIndex] || destination.imageUrl}
                alt={destination.name}
                className="w-full h-full object-cover rounded-lg"
              />
              {destination.images && destination.images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {destination.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Destination Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-4">{destination.name}</h1>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt />
                    <span>{destination.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{destination.rating} {destination.reviews && `(${destination.reviews} reviews)`}</span>
                  </div>
                </div>
                <p className="text-gray-700">{destination.description}</p>
              </div>

              {/* Highlights */}
              {destination.highlights && destination.highlights.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaStar className="mt-1 text-yellow-400" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How to Reach */}
              {destination.howToReach && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">How to Reach</h2>
                  <div className="space-y-4">
                    {destination.howToReach.air && (
                      <div className="flex items-start gap-2">
                        <FaPlane className="mt-1" />
                        <p>{destination.howToReach.air}</p>
                      </div>
                    )}
                    {destination.howToReach.train && (
                      <div className="flex items-start gap-2">
                        <FaTrain className="mt-1" />
                        <p>{destination.howToReach.train}</p>
                      </div>
                    )}
                    {destination.howToReach.road && (
                      <div className="flex items-start gap-2">
                        <FaCar className="mt-1" />
                        <p>{destination.howToReach.road}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {destination.itinerary && destination.itinerary.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
                  <div className="space-y-6">
                    {destination.itinerary.map((day) => (
                      <div key={day.day} className="border-l-2 border-blue-600 pl-4">
                        <h3 className="font-bold mb-2">Day {day.day}: {day.title}</h3>
                        <p className="text-gray-700">{day.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {destination.features && destination.features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Features</h2>
                  <div className="flex flex-wrap gap-2">
                    {destination.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Sections */}
              {(destination.included || destination.excluded) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Included */}
                  {destination.included && destination.included.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                      <ul className="space-y-2">
                        {destination.included.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Not Included */}
                  {destination.excluded && destination.excluded.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Not Included</h2>
                      <ul className="space-y-2">
                        {destination.excluded.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-500">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
              <ReviewSection destinationId={destination.id} />
            </div>

            {/* Q&A Section */}
            <div className="mt-12">
              <QASection destinationId={destination.id} />
            </div>

            {/* Comments Section */}
            <div className="mt-12">
              <CommentThread entityId={destination.id} entityType="destination" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm
                destinationId={destination.id}
                destinationName={destination.name}
                pricePerDay={destination.price}
              />

              {/* Additional Info */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-xl font-bold mb-4">Trip Information</h3>
                <div className="space-y-4">
                  {destination.duration && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaClock />
                        <span>Duration</span>
                      </div>
                      <span className="font-medium">{destination.duration}</span>
                    </div>
                  )}
                  {destination.groupSize && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaUsers />
                        <span>Group Size</span>
                      </div>
                      <span className="font-medium">{destination.groupSize}</span>
                    </div>
                  )}
                  {destination.bestTime && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt />
                        <span>Best Time</span>
                      </div>
                      <span className="font-medium">{destination.bestTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DestinationDetail; 