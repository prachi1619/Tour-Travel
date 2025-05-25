import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { FaHeart, FaGlobe, FaHandshake, FaUserFriends, 
         FaLandmark, FaMountain, FaUmbrellaBeach, FaCity, FaTree } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AboutPage = () => {
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
    // { icon: <FaTemple />, name: "Cultural Heritage" },
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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-navy-900 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20" />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">
              About TraviBharat
            </h1>
            <p className="font-body text-xl text-white/90">
              Discover the story behind Bharat's leading travel platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-navy-500 mb-6">
              Our Mission
            </h2>
            <p className="font-body text-lg text-text-secondary mb-8">
              At TraviBharat, we're on a mission to transform how people experience the incredible diversity of Bharat. 
              We believe in creating meaningful connections between travelers and local communities, while preserving 
              and celebrating our rich cultural heritage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-white mb-2">{stat.number}</h3>
                <p className="text-white/90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-surface-light">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl font-bold text-navy-500 mb-4">
              Our Values
            </h2>
            <p className="font-body text-lg text-text-secondary">
              The principles that guide us in creating exceptional travel experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-50 text-primary-500 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-navy-500 mb-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-text-secondary">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl font-bold text-navy-500 mb-4">
              What We Offer
            </h2>
            <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
              Explore the diverse range of destinations and experiences we offer across Bharat
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {destinations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4"
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center text-primary-500 mb-3">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-navy-500">{item.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-surface-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl font-bold text-navy-500 mb-6">
                Our Story
              </h2>
              <p className="font-body text-lg text-text-secondary mb-6">
                TraviBharat was born from a deep love for Bharat's incredible diversity and a desire to share 
                its wonders with the world. We started with a simple idea: to create a platform that makes it 
                easy for travelers to discover authentic experiences while supporting local communities.
              </p>
              <p className="font-body text-lg text-text-secondary mb-6">
                Our journey began with a small team of passionate travelers who believed in the power of 
                authentic travel experiences to transform both visitors and communities. We spent years 
                exploring every corner of Bharat, building relationships with local guides, artisans, and 
                communities.
              </p>
              <p className="font-body text-lg text-text-secondary">
                Today, we're proud to be Bharat's leading travel platform, connecting thousands of travelers 
                with unique destinations, cultural experiences, and unforgettable memories. Our journey 
                continues as we work to showcase the best of Bharat to the world, one traveler at a time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-3xl font-bold mb-6">
              Join Us on This Journey
            </h2>
            <p className="font-body text-lg text-white/90 mb-8">
              Whether you're a traveler seeking authentic experiences or a local business looking to partner 
              with us, we invite you to be part of our mission to showcase the beauty and diversity of Bharat.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/destinations"
                className="px-8 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
              >
                Explore Destinations
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-white text-navy-500 rounded-full hover:bg-gray-100 transition-colors"
              >
                Partner With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage; 