import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const SitemapPage: React.FC = () => {
  const sitemapData = {
    'Main Pages': [
      { name: 'Home', path: '/' },
      { name: 'Search', path: '/search' },
      { name: 'Blog', path: '/blog' },
      { name: 'Forum', path: '/forum' },
      { name: 'Destinations', path: '/destinations' },
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ],
    'User Account': [
      { name: 'Login', path: '/login' },
      { name: 'Sign Up', path: '/signup' },
      { name: 'Profile', path: '/profile' },
      { name: 'My Bookings', path: '/bookings' },
      { name: 'Wishlist', path: '/wishlist' },
      { name: 'Travel History', path: '/travel-history' },
      { name: 'Reviews & Ratings', path: '/reviews' },
    ],
    'Destinations by Region': [
      { name: 'North India', path: '/regions/north-india' },
      { name: 'South India', path: '/regions/south-india' },
      { name: 'East India', path: '/regions/east-india' },
      { name: 'West India', path: '/regions/west-india' },
      { name: 'Central India', path: '/regions/central-india' },
      { name: 'Northeast India', path: '/regions/northeast-india' },
      { name: 'Island Territories', path: '/regions/islands' },
    ],
    'Popular Activities': [
      { name: 'River Rafting', path: '/activities/river-rafting' },
      { name: 'Trekking', path: '/activities/trekking' },
      { name: 'Paragliding', path: '/activities/paragliding' },
      { name: 'Mountain Climbing', path: '/activities/mountain-climbing' },
      { name: 'Scuba Diving', path: '/activities/scuba-diving' },
      { name: 'Wildlife Safari', path: '/activities/wildlife-safari' },
      { name: 'Cultural Tours', path: '/activities/cultural-tours' },
      { name: 'Food Tours', path: '/activities/food-tours' },
    ],
    'Festivals & Events': [
      { name: 'Festival Calendar', path: '/festivals' },
      { name: 'Pushkar Mela', path: '/festivals/pushkar-mela' },
      { name: 'Hornbill Festival', path: '/festivals/hornbill' },
      { name: 'Holi in Vrindavan', path: '/festivals/holi-vrindavan' },
      { name: 'Diwali Celebrations', path: '/festivals/diwali' },
      { name: 'Rann Utsav', path: '/festivals/rann-utsav' },
      { name: 'Kerala Boat Race', path: '/festivals/kerala-boat-race' },
    ],
    'Travel Services': [
      { name: 'Flight Bookings', path: '/services/flights' },
      { name: 'Hotel Bookings', path: '/services/hotels' },
      { name: 'Car Rentals', path: '/services/car-rentals' },
      { name: 'Tour Packages', path: '/services/tour-packages' },
      { name: 'Travel Insurance', path: '/services/insurance' },
      { name: 'Visa Services', path: '/services/visa' },
    ],
    'Travel Resources': [
      { name: 'Travel Guides', path: '/resources/guides' },
      { name: 'Weather Updates', path: '/resources/weather' },
      { name: 'Travel Tips', path: '/resources/tips' },
      { name: 'FAQs', path: '/resources/faqs' },
      { name: 'Safety Information', path: '/resources/safety' },
      { name: 'Currency Converter', path: '/resources/currency' },
    ],
    'Legal Information': [
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Cancellation Policy', path: '/cancellation' },
      { name: 'Refund Policy', path: '/refund' },
    ],
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Sitemap</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.entries(sitemapData).map(([category, links]) => (
            <div key={category} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">{category}</h2>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-700">
            Can't find what you're looking for?{' '}
            <Link to="/contact" className="text-blue-600 hover:underline font-medium">
              Contact our support team
            </Link>{' '}
            or visit our{' '}
            <Link to="/resources/faqs" className="text-blue-600 hover:underline font-medium">
              FAQ page
            </Link>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SitemapPage; 