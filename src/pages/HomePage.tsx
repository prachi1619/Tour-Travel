import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import FeaturedDestinations from '../components/destinations/FeaturedDestinations';
import {
  FaHiking, FaPrayingHands, FaUmbrellaBeach,
  FaLandmark, FaHeart, FaPlane, FaHotel,
  FaCar, FaTrain, FaUserShield, FaSearch, FaArrowRight
} from 'react-icons/fa';



function useDarkMode() {
  const getInitialMode = () =>
    localStorage.getItem('darkMode') === 'true' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDarkMode, setIsDarkMode] = useState(getInitialMode);

  useEffect(() => {
    // Listener for manual storage change (e.g. other tabs)
    const handleStorageChange = () => {
      setIsDarkMode(getInitialMode());
    };

    window.addEventListener('storage', handleStorageChange);

    // Optional: polling as fallback (if you're not controlling the setter)
    const interval = setInterval(() => {
      const current = getInitialMode();
      setIsDarkMode(prev => {
        if (prev !== current) return current;
        return prev;
      });
    }, 500); // adjust as needed

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return isDarkMode;
}


const HomePage = () => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = useState(0);
const isDarkMode = useDarkMode();

useEffect(() => {
  console.log('Dark mode is now:', isDarkMode);
}, [isDarkMode]);

  console.log('isDarkMode:', isDarkMode);

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
      color: 'from-primary-500 to-primary-600',
      description: 'Thrilling experiences in the mountains and wilderness',
      bgImage: '/images/categories/adventure.jpg'
    },
    {
      name: 'Spiritual',
      icon: <FaPrayingHands className="w-8 h-8" />,
      color: 'from-secondary-500 to-secondary-600',
      description: 'Sacred temples and spiritual journeys',
      bgImage: '/images/categories/spiritual.jpg'
    },
    {
      name: 'Nature',
      icon: <FaUmbrellaBeach className="w-8 h-8" />,
      color: 'from-accent-500 to-accent-600',
      description: 'Beautiful landscapes and natural wonders',
      bgImage: '/images/categories/nature.jpg'
    },
    {
      name: 'Historical',
      icon: <FaLandmark className="w-8 h-8" />,
      color: 'from-secondary-400 to-secondary-500',
      description: 'Ancient monuments and rich heritage',
      bgImage: '/images/categories/historical.jpg'
    },
    {
      name: 'Romantic',
      icon: <FaHeart className="w-8 h-8" />,
      color: 'from-primary-400 to-primary-500',
      description: 'Perfect destinations for couples',
      bgImage: '/images/categories/romantic.jpg'
    },
  ];

  const services = [
    { 
      name: 'Flights', 
      icon: <FaPlane className="w-8 h-8" />, 
      color: 'text-secondary-500',
      bgColor: 'bg-secondary-50',
      hoverColor: 'hover:bg-secondary-100'
    },
    { 
      name: 'Hotels', 
      icon: <FaHotel className="w-8 h-8" />, 
      color: 'text-accent-500',
      bgColor: 'bg-accent-50',
      hoverColor: 'hover:bg-accent-100'
    },
    { 
      name: 'Cars', 
      icon: <FaCar className="w-8 h-8" />, 
      color: 'text-primary-500',
      bgColor: 'bg-primary-50',
      hoverColor: 'hover:bg-primary-100'
    },
    { 
      name: 'Trains', 
      icon: <FaTrain className="w-8 h-8" />, 
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50',
      hoverColor: 'hover:bg-secondary-100'
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Layout>
      {/* Admin Quick Access */}
      {isAdmin() && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-secondary-500 text-white py-2"
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
                    className="text-sm hover:text-primary-200 transition-colors hover:scale-105 transform"
                  >
                    Manage {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

{/* Need to set the theme color based on light and dark mode */}


      <div className="relative bg-surface-light dark:dark:bg-navy-900">
        {/* Hero Section */}
        <div className={`relative min-h-screen ${isDarkMode ? 'bg-navy-900' : 'dark:bg-navy-900'}`}>
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/india-hero.jpg)',
              filter: 'brightness(0.4)'
            }}
          /> 

          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center mb-8"
            >
              <h1 className="font-brand text-6xl md:text-8xl font-bold text-primary-500 dark:text-primary-400 mb-2">
                TraviBharat
              </h1>
              <p className={`font-body text-xl md:text-2xl text-center italic ${isDarkMode ? 'text-white/90' : 'dark:text-white/80'}`}>
                The Journey You Deserve. The Bharat You'll Love.
              </p>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            className={`font-heading text-4xl md:text-5xl font-bold  text-center mb-6 leading-tight ${isDarkMode ? 'text-white' : 'dark:text-primary-100'}`}
            >
              Discover the Heart of Bharat
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              // className="font-body text-xl md:text-2xl text-white/90 dark:text-white/80 text-center mb-12 max-w-3xl"
              className={`font-body text-lg md:text-xl text-center mb-8 max-w-3xl ${isDarkMode ? 'text-white/90' : 'dark:text-white/80'}`}
            >
              Experience the magic of diverse cultures, ancient traditions, and breathtaking landscapes
            </motion.p>

            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSearch} 
              className="w-full max-w-2xl"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where in Bharat do you want to explore?"
                  className="w-full px-6 py-4 text-lg rounded-full shadow-xl focus:ring-2 focus:ring-primary-500 focus:outline-none font-body text-text-primary dark:text-white placeholder-text-secondary dark:placeholder-white/60 bg-white/95 dark:bg-navy-900"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-primary-500 dark:bg-primary-600 text-white rounded-full hover:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center font-body transition-all"
                >
                  <FaSearch className="mr-2" />
                  Explore Now
                </button>
              </div>
            </motion.form>

            {/* Indian Flag Colors Bar */}
            {/* <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 flex h-2"
            >
              <div className="flex-1 bg-primary-500"></div>
              <div className="flex-1 bg-white"></div>
              <div className="flex-1 bg-secondary-500"></div>
            </motion.div> */}
          </div>
        </div>

        {/* Brief About Section */}
        <section className="py-16 bg-white dark:bg-navy-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-500 dark:text-primary-200 mb-6">
                Welcome to TraviBharat
              </h2>
              <p className="font-body text-lg text-text-secondary dark:text-white/70 mb-8">
                Your gateway to experiencing the vibrant soul of Bharat. We curate authentic travel experiences 
                that connect you with our rich heritage, diverse cultures, and breathtaking landscapes. From ancient 
                temples to modern cities, from Himalayan peaks to coastal paradises, let us guide you through the 
                incredible journey of discovering Bharat.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 text-lg font-medium rounded-full text-white bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors"
              >
                Learn More About Us
                <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Featured Destinations */}
        <section className={`py-20 ${isDarkMode ? 'dark:bg-navy-900' : 'bg-surface-light'}`}>
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-4xl font-bold text-navy-500 dark:text-primary-200 mb-4">
                Featured Destinations
              </h2>
              <p className="font-body text-lg text-text-secondary dark:text-white/70 max-w-2xl mx-auto">
                Explore our handpicked selection of Bharat's most captivating destinations
              </p>
            </motion.div>
            <FeaturedDestinations />
          </div>
        </section>
      </div>

      {/* Updated Categories Section */}
      <section className={`py-20 ${isDarkMode ? 'dark:bg-navy-900' : 'bg-surface-light'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl font-bold text-navy-500 dark:text-primary-200 mb-4">
              Explore Incredible Bharat
            </h2>
            <p className="font-body text-lg text-text-secondary dark:text-white/70 max-w-2xl mx-auto">
              Discover the perfect way to experience our rich heritage and natural beauty
            </p>
          </motion.div>

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
                  <div className="relative h-full overflow-hidden rounded-2xl shadow-lg dark:shadow-xl">
                    <div className="aspect-w-3 aspect-h-4 bg-gray-200 dark:bg-navy-800">
                      <div
                        className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                        style={{ backgroundImage: `url(${category.bgImage})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <div className={`inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r ${category.color} shadow-lg mb-4`}>
                        {category.icon}
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-2">{category.name}</h3>
                      <p className="text-sm text-white/90 line-clamp-2">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}

      <section className={`py-20 ${isDarkMode ? 'dark:bg-navy-900' : 'bg-surface-light'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl font-bold text-navy-500 dark:text-primary-200 mb-4">
              Travel Services
            </h2>
            <p className="font-body text-lg text-text-secondary dark:text-white/70 max-w-2xl mx-auto">
              Everything you need for a seamless travel experience across Bharat
            </p>
          </motion.div>

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
                  className={`flex flex-col items-center p-8 rounded-2xl ${service.bgColor} ${service.hoverColor} transition-all duration-300`}
                >
                  <div className={`${service.color} mb-4 transform transition-transform group-hover:scale-110`}>
                    {service.icon}
                  </div>
                  <span className={`text-lg font-medium ${isDarkMode ? 'text-text-primary' : 'text-text-primary'}`}>{service.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;