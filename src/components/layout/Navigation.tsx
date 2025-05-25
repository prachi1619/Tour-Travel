import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import { FaSun, FaMoon } from 'react-icons/fa';

interface NavigationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}



const Navigation: React.FC<NavigationProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { currentUser, isAdmin } = useAuth();
  const location = useLocation();
  

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) return null;

  return (
    // <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 bg-navy-900/95 backdrop-blur-lg shadow-sm">
    //handle light and dark mode
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-navy-900/95 backdrop-blur-lg shadow-sm transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="font-brand text-2xl font-bold bg-gradient-to-r from-primary-500 via-navy-500 to-secondary-500 bg-clip-text text-transparent">
                TraviBharat
              </span>
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-8">
              <NavLink to="/" exact>Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/blog">Blogs</NavLink>
              <NavLink to="/destinations">Destinations</NavLink>
              <NavLink to="/tools">Tools</NavLink>
              {/* {isAdmin() && <NavLink to="/admin">Admin</NavLink>} */}
            </div>
          </div>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-navy-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              aria-label={isDarkMode ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {isDarkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
            </button>

            {currentUser ? (
              <ProfileDropdown />
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-navy-500 dark:text-gray-300 hover:text-navy-700 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200 dark:border-navy-800">
        <div className="grid grid-cols-4 gap-1 px-2 py-3">
          <MobileNavLink to="/" exact>Home</MobileNavLink>
          <MobileNavLink to="/destinations">Destinations</MobileNavLink>
          <MobileNavLink to="/blog">Blog</MobileNavLink>
          <MobileNavLink to="/travel-tools">Travel</MobileNavLink>
          {isAdmin() && (
            <div className="col-span-4">
              <MobileNavLink to="/admin">Admin Dashboard</MobileNavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; exact?: boolean; children: React.ReactNode }> = ({
  to,
  exact,
  children
}) => {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full transition-colors ${
        isActive
          ? 'bg-primary-50 text-navy-500 dark:bg-primary-900/20 dark:text-primary-400'
          : 'text-navy-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-800 hover:text-navy-500 dark:hover:text-gray-200'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink: React.FC<{ to: string; exact?: boolean; children: React.ReactNode }> = ({
  to,
  exact,
  children
}) => {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`flex items-center justify-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'bg-primary-50 text-navy-500 dark:bg-primary-900/20 dark:text-primary-400'
          : 'text-navy-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-800 hover:text-navy-500 dark:hover:text-gray-200'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navigation;