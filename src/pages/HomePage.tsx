import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import FeaturedDestinations from '../components/destinations/FeaturedDestinations';
import {
  FaHiking, FaPrayingHands, FaUmbrellaBeach,
  FaLandmark, FaHeart, FaPlane, FaHotel,
  FaCar, FaTrain, FaUserShield
} from 'react-icons/fa';

const HomePage = () => {
  const { currentUser, isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const heroImages = ['abc'];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    {
      name: 'Adventure',
      icon: <FaHiking className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
      description: 'Thrilling experiences in the mountains and wilderness',
      image: ''

    },
    {
      name: 'Spiritual',
      icon: <FaPrayingHands className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      description: 'Sacred temples and spiritual journeys',
      // image: ''
    },
    {
      name: 'Nature',
      icon: <FaUmbrellaBeach className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      description: 'Beautiful landscapes and natural wonders',
      // image: ''
    },
    {
      name: 'Historical',
      icon: <FaLandmark className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      description: 'Ancient monuments and rich heritage',
      // image: ''

    },
    {
      name: 'Romantic',
      icon: <FaHeart className="w-8 h-8" />,
      color: 'from-red-500 to-red-600',
      description: 'Perfect destinations for couples',
      // image: ''
    },
  ];

  const services = [
    { name: 'Flights', icon: <FaPlane className="w-8 h-8" />, color: 'text-blue-600' },
    { name: 'Hotels', icon: <FaHotel className="w-8 h-8" />, color: 'text-green-600' },
    { name: 'Cars', icon: <FaCar className="w-8 h-8" />, color: 'text-red-600' },
    { name: 'Trains', icon: <FaTrain className="w-8 h-8" />, color: 'text-orange-600' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <Layout>
      {/* Admin Quick Access */}
      {isAdmin() && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <FaUserShield className="mr-2" />
                Admin Access
              </span>
              <div className="flex gap-4">
                {['Dashboard', 'Destinations', 'Blogs', 'Users'].map((item) => (
                  <Link
                    key={item}
                    to={`/admin/${item.toLowerCase()}`}
                    className="text-sm hover:text-blue-400 transition-colors hover:scale-105 transform"
                  >
                    Manage {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section with Carousel */}
      <section className="relative h-[80vh] overflow-hidden">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === activeIndex ? 1 : 0,
              scale: index === activeIndex ? 1.1 : 1
            }}
            transition={{ duration: 1 }}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
            Discover Incredible India
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-center max-w-2xl">
            Experience the magic of diverse cultures, ancient traditions, and breathtaking landscapes
          </p>
          <div className="max-w-4xl w-full mx-auto bg-white/10 backdrop-blur-md rounded-lg p-6">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Where do you want to go?"
                className="flex-1 p-4 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/70 backdrop-blur-md"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Explore Now
              </motion.button>
            </form>
          </div>
        </motion.div>
      </section>

      {/* User Welcome Section */}
      {currentUser && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8 bg-gradient-to-r from-blue-50 to-indigo-50"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Welcome back, {currentUser.displayName || 'Traveler'}!
                </h2>
                <p className="text-gray-600">Continue your journey of discovery</p>
              </div>
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/profile"
                    className="px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all text-blue-600 font-medium"
                  >
                    View Profile
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/bookings"
                    className="px-6 py-3 bg-blue-600 rounded-lg shadow-md hover:shadow-lg transition-all text-white font-medium"
                  >
                    My Bookings
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Updated Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Explore by Category
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category.name.toLowerCase()}`}
                  className="block group h-full"
                >
                  <div className="relative h-full overflow-hidden rounded-xl shadow-lg bg-white">
                    <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `https://via.placeholder.com/800x600/718096/FFFFFF?text=${category.name}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                      <div className={`inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r ${category.color} mb-3`}>
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm text-white/90">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Featured Destinations
          </motion.h2>
          <FeaturedDestinations />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Plan Your Perfect Trip
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/services/${service.name.toLowerCase()}`}
                  className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className={`${service.color} mb-4`}>
                    {service.icon}
                  </div>
                  <span className="text-lg font-medium">{service.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              {currentUser
                ? 'Discover amazing deals on your next adventure'
                : 'Join us and get personalized travel recommendations'}
            </p>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to={currentUser ? '/destinations' : '/signup'}
                className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                {currentUser ? 'Explore Destinations' : 'Start Your Journey'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;