import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaSearch, FaUser } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/globals.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout, isAdmin } = useAuth();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/themes', label: 'Themes' },
    { path: '/blog', label: 'Blog' },
    { path: '/tools', label: 'Travel Tools' },
    { path: '/sitemap', label: 'Sitemap' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-surface border-b border-color">
        <nav className="container py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              TravelPlanner
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`hover:text-primary transition-colors ${
                    location.pathname === item.path ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {isAdmin() && (
                <Link
                  to="/admin"
                  className={`hover:text-primary transition-colors ${
                    location.pathname === '/admin' ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  Admin Dashboard
                </Link>
              )}
            </div>

            {/* Right side items */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-surface transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button>
              
              <Link to="/search" className="p-2 hover:text-primary transition-colors">
                <FaSearch className="w-5 h-5" />
              </Link>

              {currentUser ? (
                <div className="relative group">
                  <button className="p-2 hover:text-primary transition-colors">
                    <img
                      src={currentUser.photoURL || 'https://via.placeholder.com/32'}
                      alt={currentUser.displayName || 'User'}
                      className="w-8 h-8 rounded-full"
                    />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 card hidden group-hover:block">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:text-primary transition-colors"
                    >
                      Profile
                    </Link>
                    {isAdmin() && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm hover:text-primary transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="p-2 hover:text-primary transition-colors"
                >
                  <FaUser className="w-5 h-5" />
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-surface transition-colors rounded-md"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-2 hover:text-primary transition-colors ${
                    location.pathname === item.path ? 'text-primary' : 'text-secondary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {currentUser ? (
                <>
                  <Link
                    to="/profile"
                    className="block py-2 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className="block py-2 hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-surface border-t border-color mt-auto">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-secondary">Discover the best travel destinations and plan your perfect trip with TravelPlanner.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-secondary hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-secondary hover:text-primary transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="text-secondary hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-secondary hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {/* Add social media icons/links here */}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input flex-grow"
                />
                <button type="submit" className="button">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-color text-center text-secondary">
            <p>&copy; {new Date().getFullYear()} TravelPlanner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;