import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import FeaturedDestinations from '../components/destinations/FeaturedDestinations';
import {
  FaHiking, FaPrayingHands, FaUmbrellaBeach,
  FaLandmark, FaHeart, FaPlane, FaHotel,
  FaCar, FaTrain, FaUserShield, FaSearch, FaArrowRight
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { Particles } from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

function useDarkMode() {
  const { isDark } = useTheme();
  return isDark;
}




const HomePage = () => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const isDarkMode = useDarkMode();

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
      color: 'text-secondary-500 dark:text-secondary-400',
      bgColor: 'bg-secondary-50 dark:bg-secondary-900/20',
      hoverColor: 'hover:bg-secondary-100 dark:hover:bg-secondary-800/30'
    },
    { 
      name: 'Hotels', 
      icon: <FaHotel className="w-8 h-8" />, 
      color: 'text-accent-500 dark:text-accent-400',
      bgColor: 'bg-accent-50 dark:bg-accent-900/20',
      hoverColor: 'hover:bg-accent-100 dark:hover:bg-accent-800/30'
    },
    { 
      name: 'Cars', 
      icon: <FaCar className="w-8 h-8" />, 
      color: 'text-primary-500 dark:text-primary-400',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
      hoverColor: 'hover:bg-primary-100 dark:hover:bg-primary-800/30'
    },
    { 
      name: 'Trains', 
      icon: <FaTrain className="w-8 h-8" />, 
      color: 'text-secondary-600 dark:text-secondary-300',
      bgColor: 'bg-secondary-50 dark:bg-secondary-900/20',
      hoverColor: 'hover:bg-secondary-100 dark:hover:bg-secondary-800/30'
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

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

      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden 
  bg-gradient-to-br from-[#138808] via-[#ffffff] to-[#FF9933]
  dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
  dark:from-navy-800 dark:via-navy-900 dark:to-navy-950">

        {/* Particles Animation */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            particles: {
              color: {
                value: ["#FF9933", "#138808", "#000080"],
              },
              collisions: {
                enable: false,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-0"
        />

        {/* Decorative Elements - Light Mode */}
        <div className="absolute inset-0 light:block dark:hidden">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary-200/40 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary-200/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute inset-0 opacity-5 bg-[url('/patterns/indian-pattern-light.png')] bg-repeat"></div>
        </div>

        {/* Decorative Elements - Dark Mode */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-[url('/patterns/stars.png')] bg-repeat opacity-20 animate-twinkle"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-900/50 to-navy-900/80"></div>
          <div className="absolute inset-0 bg-[url('/patterns/indian-pattern-dark.png')] bg-repeat opacity-10"></div>
        </div>

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed
            opacity-40 dark:opacity-20
            mix-blend-overlay dark:mix-blend-soft-light"
          style={{ backgroundImage: 'url(/images/india-hero.jpg)' }}
        />

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center py-20">

        <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-8xl font-extrabold 
          bg-gradient-to-r 
          from-[#FF9933] via-[#0000FF] to-[#138808] 
          dark:from-[#FF9933] dark:via-[#ffffff] dark:to-[#138808]
          bg-clip-text text-transparent animate-gradient-x 
          [text-shadow:_2px_2px_4px_rgba(0,0,0,0.05)]">
        TraviBharat
      </motion.h1>


     {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl mt-4 mb-6 text-gray-700 dark:text-gray-300 italic">
              The Journey You Deserve. The Bharat You'll Love.
            </motion.p>


      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-12 relative"
      >
        <h2 className="font-heading text-4xl md:text-5xl font-bold
          bg-clip-text text-transparent
          bg-gradient-to-r from-navy-800 to-navy-600
          dark:from-white dark:to-gray-300
          [text-shadow:_1px_1px_2px_rgb(0_0_0_/_10%)] dark:[text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">
          Discover the Heart of Bharat
        </h2>
        <div className="absolute -inset-x-4 -inset-y-2
          bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5
          blur-xl -z-10"></div>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-body text-xl md:text-2xl text-center mb-16 max-w-3xl
          text-gray-600 dark:text-gray-300
          drop-shadow-sm dark:drop-shadow-lg"
      >
        Experience the magic of diverse cultures, ancient traditions, and breathtaking landscapes
      </motion.p>

      {/* Search Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSearch}
        className="w-full max-w-3xl relative"
      >
        <div className="relative flex items-center group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Where in Bharat do you want to explore?"
            className="w-full px-8 py-6 text-xl rounded-full
              focus:ring-4 focus:ring-primary-500/30 dark:focus:ring-primary-500/20
              focus:border-primary-500 dark:focus:border-primary-400
              focus:outline-none font-body 
              text-gray-800 dark:text-white 
              placeholder-gray-400 dark:placeholder-gray-500
              bg-white/90 dark:bg-navy-800/90
              border-2 border-gray-100 dark:border-navy-700
              group-hover:border-primary-500/50 dark:group-hover:border-primary-500/30
              shadow-[0_8px_16px_rgb(0_0_0_/_0.1)] dark:shadow-[0_8px_24px_rgb(0_0_0_/_0.3)]
              backdrop-blur-sm
              transition-all duration-300 animate-pulse"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 
              px-8 py-3 rounded-full
              bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500
              dark:from-primary-600 dark:via-primary-500 dark:to-primary-600
              hover:from-primary-600 hover:via-primary-500 hover:to-primary-600
              dark:hover:from-primary-500 dark:hover:via-primary-400 dark:hover:to-primary-500
              text-white font-medium text-lg
              focus:outline-none focus:ring-4 focus:ring-primary-500/30 dark:focus:ring-primary-500/20
              flex items-center gap-3
              shadow-[0_4px_12px_rgb(255_153_51_/_0.3)] dark:shadow-[0_4px_16px_rgb(255_153_51_/_0.4)]
              hover:shadow-[0_6px_16px_rgb(255_153_51_/_0.4)] dark:hover:shadow-[0_6px_20px_rgb(255_153_51_/_0.5)]
              transition-all duration-300 transform hover:scale-105"
          >
            <FaSearch className="w-5 h-5" />
            <span>Explore Now</span>
          </button>
        </div>
      </motion.form>


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
      <section className="py-20 bg-surface-light dark:bg-navy-900">
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

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-navy-800">
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
      <section className="py-20 bg-surface-light dark:bg-navy-900">
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
                  <span className="text-lg font-medium text-text-primary dark:text-white">{service.name}</span>
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