import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Compass size={28} className="text-primary-500" />
              <span className="text-xl font-heading font-bold">
                Incredible India
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              Discover the incredible diversity of India - from majestic mountains 
              to serene beaches, ancient temples to vibrant festivals.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-500 transition duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-500 transition duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-500 transition duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Destinations Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2">
              Popular Destinations
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destination/taj-mahal-agra" className="text-gray-400 hover:text-primary-500 transition duration-300">
                  Taj Mahal, Agra
                </Link>
              </li>
              <li>
                <Link to="/destination/varanasi" className="text-gray-400 hover:text-primary-500 transition duration-300">
                  Varanasi
                </Link>
              </li>
              <li>
                <Link to="/destination/jaipur" className="text-gray-400 hover:text-primary-500 transition duration-300">
                  Jaipur
                </Link>
              </li>
              <li>
                <Link to="/destination/goa" className="text-gray-400 hover:text-primary-500 transition duration-300">
                  Goa
                </Link>
              </li>
              <li>
                <Link to="/destination/kerala-backwaters" className="text-gray-400 hover:text-primary-500 transition duration-300">
                  Kerala Backwaters
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-500 transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary-500 transition duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-400 hover:text-primary-500 transition duration-300">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-500 transition duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-primary-500 transition duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary-500 shrink-0 mt-1" />
                <span className="text-gray-400">
                  123 Travel Street, New Delhi, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary-500 shrink-0" />
                <span className="text-gray-400">+91 1234 567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary-500 shrink-0" />
                <a href="mailto:info@incredibleindia.com" className="text-gray-400 hover:text-primary-500 transition duration-300">
                  info@incredibleindia.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Subscribe to our Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 flex-grow"
                />
                <button 
                  type="submit" 
                  className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-r-md transition duration-300"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Incredible India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}