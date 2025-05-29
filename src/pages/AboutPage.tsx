import React, { useCallback } from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { FaHeart, FaGlobe, FaHandshake, FaUserFriends, 
         FaLandmark, FaMountain, FaUmbrellaBeach, FaCity, FaTree } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Particles } from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from '../context/ThemeContext';

function useDarkMode() {
  const { isDark } = useTheme();
  return isDark;
}

const AboutPage = () => {
  const isDarkMode = useDarkMode();
  
  const values = [
    {
      icon: <FaHeart className="w-8 h-8" />,
      title: "Passion for Bharat",
      description: "We are deeply passionate about showcasing the rich cultural heritage and diverse beauty of Bharat to the world."
    },
    {
      icon: <FaGlobe className="w-8 h-8" />,
      title: "Authentic Experiences",
      description: "We curate authentic travel experiences that connect travelers with the true essence of Bharat's traditions and culture."
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: "Local Partnerships",
      description: "We work closely with local communities and businesses to promote sustainable tourism and support local economies."
    },
    {
      icon: <FaUserFriends className="w-8 h-8" />,
      title: "Customer Focus",
      description: "We prioritize our travelers' needs and strive to provide personalized service and memorable experiences."
    }
  ];

  const destinations = [
    { icon: <FaMountain />, name: "Adventure Spots" },
    { icon: <FaUmbrellaBeach />, name: "Scenic Beaches" },
    { icon: <FaCity />, name: "Modern Cities" },
    { icon: <FaTree />, name: "Wildlife Sanctuaries" },
    { icon: <FaLandmark />, name: "Historical Sites" }
  ];

  const stats = [
    { number: "1M+", label: "Happy Travelers" },
    { number: "500+", label: "Destinations" },
    { number: "1000+", label: "Local Partners" },
    { number: "50+", label: "Travel Awards" }
  ];

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-white">
        {/* Background with flag colors */}
        <div className="absolute inset-0">
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#FF9933]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#138808]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-[#000080]/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold mb-6 
        bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] bg-clip-text text-transparent"
            >
              About TraviBharat
            </motion.h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-1 w-16 rounded-full bg-[#FF9933]"></div>
              <div className="h-1 w-16 rounded-full bg-[#000080]"></div>
              <div className="h-1 w-16 rounded-full bg-[#138808]"></div>
            </div>
            <div className="bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl dark:shadow-navy-700/20 
              border border-gray-100 dark:border-navy-700">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl text-gray-800 dark:text-gray-200"
              >
                Discover the story behind Bharat's leading travel platform
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section with Gradient Background */}
      <section className="relative py-24 overflow-hidden bg-white">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#FF9933]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#138808]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-[#000080]/10 rounded-full blur-3xl"></div>
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
                Our Mission
              </h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-1 w-16 rounded-full bg-[#FF9933]"></div>
                <div className="h-1 w-16 rounded-full bg-[#000080]"></div>
                <div className="h-1 w-16 rounded-full bg-[#138808]"></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl dark:shadow-navy-700/20">
              <p className="font-body text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                At TraviBharat, we're on a mission to transform how people experience the incredible diversity of Bharat. 
                We believe in creating meaningful connections between travelers and local communities, while preserving 
                and celebrating our rich cultural heritage.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 overflow-hidden bg-white">
        {/* Background with flag colors */}
        <div className="absolute inset-0">
          {/* Decorative Elements - Light Mode */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#FF9933]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#138808]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-[#000080]/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center backdrop-blur-sm bg-white/80 dark:bg-navy-800/80 rounded-xl p-8 
                  border border-white/20 dark:border-white/10 hover:bg-white/90 dark:hover:bg-navy-800/90 
                  transition-all duration-300 transform hover:scale-105
                  shadow-lg hover:shadow-xl"
              >
                <h3 className="text-5xl font-bold bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] 
                  bg-clip-text text-transparent mb-3">{stat.number}</h3>
                <p className="text-gray-800 dark:text-white text-lg font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Values Section with Gradient Background */}
      <section className="relative py-24 overflow-hidden bg-white">
        {/* Background with flag colors */}
        <div className="absolute inset-0">
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
              Our Values
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-1 w-16 rounded-full bg-[#FF9933]"></div>
              <div className="h-1 w-16 rounded-full bg-[#000080]"></div>
              <div className="h-1 w-16 rounded-full bg-[#138808]"></div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm p-8 rounded-2xl 
                  shadow-xl dark:shadow-navy-700/20 border border-gray-100 dark:border-navy-700
                  hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full 
                    bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] text-white mb-6 
                    shadow-lg transform hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] bg-clip-text text-transparent">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="relative py-24 overflow-hidden bg-white">
        {/* Background with flag colors */}
        <div className="absolute inset-0">
          {/* Decorative Patterns */}
          <div className="absolute inset-0 opacity-5 bg-[url('/patterns/indian-pattern-light.png')] 
            dark:bg-[url('/patterns/indian-pattern-dark.png')] bg-repeat"></div>
          
          {/* Flag Color Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#138808]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#000080]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="inline-block font-heading text-4xl md:text-5xl font-bold mb-6 
              bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] bg-clip-text text-transparent">
              What We Offer
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-1 w-16 rounded-full bg-[#FF9933]"></div>
              <div className="h-1 w-16 rounded-full bg-[#000080]"></div>
              <div className="h-1 w-16 rounded-full bg-[#138808]"></div>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Explore the diverse range of destinations and experiences we offer across Bharat
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {destinations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 backdrop-blur-sm bg-white/80 dark:bg-navy-800/80 rounded-xl 
                  border border-gray-200 dark:border-navy-700 hover:bg-white/90 dark:hover:bg-navy-800/90 
                  transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full 
                  bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] text-white mb-6 
                  shadow-lg transform hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">{item.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-24 overflow-hidden bg-white">
        {/* Background with flag colors */}
        <div className="absolute inset-0">
          {/* Decorative Patterns */}
          <div className="absolute inset-0 opacity-5 bg-[url('/patterns/indian-pattern-light.png')] dark:bg-[url('/patterns/indian-pattern-dark.png')] bg-repeat"></div>
          
          {/* Flag Color Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#138808]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#000080]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="inline-block font-heading text-4xl md:text-5xl font-bold mb-6 
                bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] bg-clip-text text-transparent">
                Our Story
              </h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-1 w-16 rounded-full bg-[#FF9933]"></div>
                <div className="h-1 w-16 rounded-full bg-[#000080]"></div>
                <div className="h-1 w-16 rounded-full bg-[#138808]"></div>
              </div>
              <div className="bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl dark:shadow-navy-700/20">
                <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    TraviBharat was born from a deep love for Bharat's incredible diversity and a desire to share 
                    its wonders with the world. We started with a simple idea: to create a platform that makes it 
                    easy for travelers to discover authentic experiences while supporting local communities.
                  </p>
                  <p>
                    Our journey began with a small team of passionate travelers who believed in the power of 
                    authentic travel experiences to transform both visitors and communities. We spent years 
                    exploring every corner of Bharat, building relationships with local guides, artisans, and 
                    communities.
                  </p>
                  <p>
                    Today, we're proud to be Bharat's leading travel platform, connecting thousands of travelers 
                    with unique destinations, cultural experiences, and unforgettable memories. Our journey 
                    continues as we work to showcase the best of Bharat to the world, one traveler at a time.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="relative py-24 overflow-hidden bg-white">
        {/* Background with flag colors */}
        <div className="absolute inset-0">
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#FF9933]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#138808]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-[#000080]/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="inline-block font-heading text-4xl md:text-5xl font-bold mb-6 
              bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] bg-clip-text text-transparent">
              Join Us on This Journey
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-1 w-16 rounded-full bg-[#FF9933]"></div>
              <div className="h-1 w-16 rounded-full bg-[#000080]"></div>
              <div className="h-1 w-16 rounded-full bg-[#138808]"></div>
            </div>

            <div className="bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl dark:shadow-navy-700/20 
              border border-gray-100 dark:border-navy-700">
              <p className="text-xl text-gray-800 dark:text-gray-200 mb-8">
                Whether you're a traveler seeking authentic experiences or a local business looking to partner 
                with us, we invite you to be part of our mission to showcase the beauty and diversity of Bharat.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  to="/destinations"
                  className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full 
                    bg-gradient-to-r from-[#FF9933] via-[#FF9933] to-[#FF8000]
                    text-white shadow-lg shadow-[#FF9933]/20
                    hover:shadow-xl hover:shadow-[#FF9933]/30 
                    transform hover:scale-105 transition-all duration-300"
                >
                  Explore Destinations
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full 
                    bg-gradient-to-r from-[#138808] to-[#0D6A0D]
                    text-white shadow-lg shadow-[#138808]/20
                    hover:shadow-xl hover:shadow-[#138808]/30 
                    transform hover:scale-105 transition-all duration-300"
                >
                  Partner With Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;