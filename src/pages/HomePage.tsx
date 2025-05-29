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
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-navy-900 dark:via-navy-800 dark:to-navy-900">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#FF9933]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#138808]/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-[#000080]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Section Title with Flag Colors */}
            <div className="text-center mb-12">
              <h2 className="inline-block font-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] bg-clip-text text-transparent">
                Welcome to TraviBharat
              </h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-1 w-16 rounded-full bg-[#FF9933]"></div>
                <div className="h-1 w-16 rounded-full bg-[#000080]"></div>
                <div className="h-1 w-16 rounded-full bg-[#138808]"></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl dark:shadow-navy-700/20">
              <p className="font-body text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Your gateway to experiencing the vibrant soul of Bharat. We curate authentic travel experiences 
                that connect you with our rich heritage, diverse cultures, and breathtaking landscapes. From ancient 
                temples to modern cities, from Himalayan peaks to coastal paradises, let us guide you through the 
                incredible journey of discovering Bharat.
              </p>
              
              {/* Call to Action */}
              <div className="text-center">
                <Link
                  to="/about"
                  className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full 
                    bg-gradient-to-r from-[#FF9933] via-[#FF9933] to-[#FF8000]
                    dark:from-[#FF9933] dark:to-[#FF8000]
                    text-white shadow-lg shadow-[#FF9933]/20
                    hover:shadow-xl hover:shadow-[#FF9933]/30 
                    transform hover:scale-105 transition-all duration-300"
                >
                  Learn More About Us
                  <FaArrowRight className="ml-2 animate-pulse" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="relative py-24 overflow-hidden">
        {/* Background with flag colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-navy-900 dark:via-navy-800 dark:to-navy-900">
          {/* Decorative Patterns */}
          <div className="absolute inset-0 opacity-5 bg-[url('/patterns/indian-pattern-light.png')] dark:bg-[url('/patterns/indian-pattern-dark.png')] bg-repeat"></div>
          
          {/* Flag Color Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#138808]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#000080]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Section Title */}
            <h2 className="inline-block font-heading text-4xl md:text-5xl font-bold mb-6 
              bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] bg-clip-text text-transparent">
              Explore Incredible Bharat
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-1 w-16 rounded-full bg-[#FF9933]"></div>
              <div className="h-1 w-16 rounded-full bg-[#000080]"></div>
              <div className="h-1 w-16 rounded-full bg-[#138808]"></div>
            </div>
            <p className="font-body text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the perfect way to experience our rich heritage and natural beauty through carefully curated travel categories
            </p>
          </motion.div>

          {/* Featured Destinations Component with Enhanced Wrapper */}
          <div className="relative backdrop-blur-sm bg-white/40 dark:bg-navy-800/40 rounded-3xl p-8 shadow-2xl dark:shadow-navy-700/20">
            <FeaturedDestinations />
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              to="/destinations"
              className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full 
                bg-gradient-to-r from-[#138808] to-[#0D6A0D]
                dark:from-[#138808] dark:to-[#0D6A0D]
                text-white shadow-lg shadow-[#138808]/20
                hover:shadow-xl hover:shadow-[#138808]/30 
                transform hover:scale-105 transition-all duration-300
                group"
            >
              Explore All Destinations
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>


      {/* Regional Highlights Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background with flag colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-navy-900 dark:via-navy-800 dark:to-navy-900">
          {/* Decorative Patterns */}
          <div className="absolute inset-0 opacity-5 bg-[url('/patterns/indian-pattern-light.png')] dark:bg-[url('/patterns/indian-pattern-dark.png')] bg-repeat"></div>
          
          {/* Flag Color Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#138808]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#000080]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative mx-auto px-4">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                <span className="text-[#FF9933]">Explore </span>
                <span className="text-[#000080]">Regional </span>
                <span className="text-[#138808]">Highlights</span>
              </h2>
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="h-1 w-16 rounded-full bg-[#FF9933]"></div>
                <div className="h-1 w-16 rounded-full bg-[#000080]"></div>
                <div className="h-1 w-16 rounded-full bg-[#138808]"></div>
              </div>
            </div>
            <p className="font-body text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6">
              Embark on a journey through the diverse landscapes and rich cultural heritage of Bharat's regions
            </p>
          </motion.div>

          {/* Regional Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "North India",
                description: "Discover majestic Himalayas, ancient temples, and royal heritage palaces",
                image: "/images/regions/north-india.webp",
                highlights: ["Taj Mahal", "Varanasi", "Kashmir Valley"],
                color: "bg-[#FF9933]"
              },
              {
                name: "South India",
                description: "Experience divine temples, serene backwaters, and pristine beaches",
                image: "/images/regions/south-india.webp",
                highlights: ["Kerala Backwaters", "Hampi", "Meenakshi Temple"],
                color: "bg-[#138808]"
              },
              {
                name: "East India",
                description: "Explore tea gardens, sundarbans, and rich cultural traditions",
                image: "/images/regions/east-india.webp",
                highlights: ["Sundarbans", "Darjeeling", "Konark Temple"],
                color: "bg-[#000080]"
              },
              {
                name: "West India",
                description: "Witness royal palaces, vast deserts, and vibrant culture",
                image: "/images/regions/west-india.webp",
                highlights: ["Rann of Kutch", "Goa Beaches", "Udaipur"],
                color: "bg-[#FF9933]"
              },
              {
                name: "Central India",
                description: "Discover wildlife sanctuaries, ancient caves, and historical monuments",
                image: "/images/regions/central-india.webp",
                highlights: ["Khajuraho", "Bandhavgarh", "Sanchi Stupa"],
                color: "bg-[#138808]"
              },
              {
                name: "Northeast India",
                description: "Experience unique tribal culture, mountains, and biodiversity",
                image: "/images/regions/northeast-india.webp",
                highlights: ["Kaziranga", "Tawang", "Living Root Bridges"],
                color: "bg-[#000080]"
              }
            ].map((region, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={`/regions/${region.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block h-full overflow-hidden rounded-2xl 
                    bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm
                    border border-white/20 dark:border-navy-700/20
                    shadow-lg dark:shadow-xl
                    hover:shadow-xl dark:hover:shadow-2xl
                    transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={region.image}
                      alt={region.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className={`absolute bottom-0 left-0 right-0 px-6 py-4 ${region.color}`}>
                      <h3 className="text-2xl font-heading font-bold text-white">
                        {region.name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {region.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Popular Highlights:
                      </h4>
                      <ul className="flex flex-wrap gap-2">
                        {region.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm px-3 py-1 rounded-full 
                            bg-gray-100 dark:bg-navy-700
                            text-gray-600 dark:text-gray-300">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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