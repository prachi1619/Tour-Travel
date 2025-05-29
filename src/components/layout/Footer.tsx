import { Link } from 'react-router-dom';
import { Compass, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube, Linkedin } from 'lucide-react';

interface NavigationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Footer: React.FC<NavigationProps> = ({ isDarkMode, toggleDarkMode }) => {
  const siteMap = {
    'Explore Bharat': [
      { name: 'Destinations', path: '/destinations' },
      { name: 'Regional Guides', path: '/regions' },
      { name: 'Travel Packages', path: '/packages' },
      { name: 'Pilgrimage Tours', path: '/pilgrimage' },
      { name: 'Festivals & Events', path: '/festivals' },
      { name: 'Popular Activities', path: '/activities' }
    ],
    'Travel Services': [
      { name: 'Flight Bookings', path: '/services/flights' },
      { name: 'Hotel Bookings', path: '/services/hotels' },
      { name: 'Car Rentals', path: '/services/car-rentals' },
      { name: 'Tour Packages', path: '/services/tour-packages' },
      { name: 'Travel Insurance', path: '/services/insurance' },
      { name: 'Visa Services', path: '/services/visa' }
    ],
    'Travel Resources': [
      { name: 'Travel Guides', path: '/resources/guides' },
      { name: 'Weather Updates', path: '/resources/weather' },
      { name: 'Travel Tips', path: '/resources/tips' },
      { name: 'FAQs', path: '/resources/faqs' },
      { name: 'Safety Information', path: '/resources/safety' },
      { name: 'Currency Converter', path: '/resources/currency' }
    ],
    'About TraviBharat': [
      { name: 'Our Story', path: '/about' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press & Media', path: '/press' },
      { name: 'Blog', path: '/blog' },
      { name: 'Forum', path: '/forum' }
    ],
    'Legal': [
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Cancellation Policy', path: '/cancellation' },
      { name: 'Refund Policy', path: '/refund' }
    ],
    'Account': [
      { name: 'Login', path: '/login' },
      { name: 'Sign Up', path: '/signup' },
      { name: 'Profile', path: '/profile' },
      { name: 'My Bookings', path: '/bookings' },
      { name: 'Wishlist', path: '/wishlist' },
      { name: 'Travel History', path: '/travel-history' }
    ]
  };

  return (
    <footer className={`relative ${isDarkMode ? 'bg-navy-950' : 'bg-gray-50'}`}>
      {/* Newsletter Section */}
      <div className={`w-full py-12 ${isDarkMode ? 'bg-navy-900/50' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-[#FF9933]' : 'text-[#000080]'}`}>
              Subscribe to Our Newsletter
            </h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Stay updated with the latest travel guides and offers from across India
            </p>
            <div className="flex gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className={`flex-1 px-4 py-3 rounded-lg text-sm
                  ${isDarkMode 
                    ? 'bg-navy-800 border-navy-700 text-gray-300 placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}
                  border focus:outline-none focus:ring-2 focus:ring-[#FF9933]`}
              />
              <button 
                type="submit" 
                className="px-8 py-3 rounded-lg font-medium text-white
                  bg-gradient-to-r from-[#FF9933] to-[#138808]
                  hover:from-[#138808] hover:to-[#FF9933]
                  transition-all duration-500"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer - Enhanced with Sitemap */}
      <div className={`w-full py-16 ${isDarkMode ? 'bg-navy-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-x-8 gap-y-12">
            {/* Brand Column */}
            <div className="col-span-12 lg:col-span-3 pr-8">
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-[#FF9933] to-[#138808] rounded-xl">
                  <Compass size={28} className="text-white" />
                </div>
                <span className="text-2xl font-heading font-bold tracking-tight">
                  {isDarkMode ? (
                    <span className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] bg-clip-text text-transparent">
                      TraviBharat
                    </span>
                  ) : (
                    <span className="bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] bg-clip-text text-transparent">
                      TraviBharat
                    </span>
                  )}
                </span>
              </Link>
              <p className={`mb-8 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Experience the vibrant tapestry of India with TraviBharat - your gateway to discovering 
                the rich heritage, stunning landscapes, and diverse cultures of this magnificent country.
              </p>
              <div className="flex flex-wrap gap-4">
                <SocialLink href="#" icon={<Facebook size={18} />} isDarkMode={isDarkMode} />
                <SocialLink href="#" icon={<Instagram size={18} />} isDarkMode={isDarkMode} />
                <SocialLink href="#" icon={<Twitter size={18} />} isDarkMode={isDarkMode} />
                <SocialLink href="#" icon={<Youtube size={18} />} isDarkMode={isDarkMode} />
                <SocialLink href="#" icon={<Linkedin size={18} />} isDarkMode={isDarkMode} />
              </div>
            </div>

            {/* Sitemap Columns - Expanded to show more categories */}
            <div className="col-span-12 lg:col-span-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {Object.entries(siteMap).map(([title, links]) => (
                  <div key={title}>
                    <h4 className={`font-bold text-lg mb-4 
                      ${isDarkMode ? 'text-[#FF9933]' : 'text-[#000080]'}`}>
                      {title}
                    </h4>
                    <ul className="space-y-3">
                      {links.map((link) => (
                        <li key={link.name}>
                          <Link
                            to={link.path}
                            className={`text-sm group
                              ${isDarkMode 
                                ? 'text-gray-400 hover:text-[#FF9933]' 
                                : 'text-gray-600 hover:text-[#138808]'}
                              transition-colors duration-300 flex items-start`}
                          >
                            <span className="block w-2 h-2 mt-1.5 mr-2 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span>{link.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Column */}
            <div className="col-span-12 lg:col-span-3">
              <h4 className={`font-bold text-lg mb-6
                ${isDarkMode ? 'text-[#FF9933]' : 'text-[#000080]'}`}>
                Get in Touch
              </h4>
              <div className="space-y-6">
                <a href="tel:+919876543210" 
                  className={`flex items-center space-x-4 group
                    ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <div className={`p-3 rounded-lg group-hover:bg-[#FF9933] transition-colors
                    ${isDarkMode ? 'bg-navy-800' : 'bg-gray-100'}`}>
                    <Phone size={18} className="group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call Us</p>
                    <p className="group-hover:text-[#FF9933] transition-colors">+91 98765 43210</p>
                  </div>
                </a>
                <a href="mailto:info@travibharat.com" 
                  className={`flex items-center space-x-4 group
                    ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <div className={`p-3 rounded-lg group-hover:bg-[#138808] transition-colors
                    ${isDarkMode ? 'bg-navy-800' : 'bg-gray-100'}`}>
                    <Mail size={18} className="group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <p className="group-hover:text-[#138808] transition-colors">info@travibharat.com</p>
                  </div>
                </a>
                <div className={`flex items-center space-x-4
                  ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-navy-800' : 'bg-gray-100'}`}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p>New Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`py-6 border-t ${isDarkMode ? 'border-navy-800 bg-navy-950' : 'border-gray-100 bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              &copy; {new Date().getFullYear()} TraviBharat. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className={`text-sm hover:text-[#FF9933] transition-colors
                ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Privacy Policy
              </Link>
              <Link to="/terms" className={`text-sm hover:text-[#FF9933] transition-colors
                ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Terms of Service
              </Link>
              <Link to="/sitemap" className={`text-sm hover:text-[#FF9933] transition-colors
                ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Sitemap
              </Link>
              <div className="h-4 w-16 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; isDarkMode: boolean }> = ({ 
  href, 
  icon,
  isDarkMode 
}) => (
  <a 
    href={href} 
    className={`p-3 rounded-lg 
      ${isDarkMode ? 'bg-navy-800' : 'bg-gray-100'}
      text-gray-600 dark:text-gray-400 
      hover:bg-gradient-to-r hover:from-[#FF9933] hover:to-[#138808]
      hover:text-white transform hover:-translate-y-1
      transition-all duration-300`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);