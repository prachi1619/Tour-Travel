import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaHome, FaCompass, FaBlog, FaSearch, FaUsers, FaUser } from 'react-icons/fa';
import MobileNavigation from './MobileNavigation';

const Navigation = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Travel Explorer"
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Travel Explorer
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center gap-2 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaHome />
              <span>Home</span>
            </Link>
            <Link
              to="/destinations"
              className={`flex items-center gap-2 ${
                isActive('/destinations') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaCompass />
              <span>Destinations</span>
            </Link>
            <Link
              to="/blog"
              className={`flex items-center gap-2 ${
                isActive('/blog') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaBlog />
              <span>Blog</span>
            </Link>
            <Link
              to="/forum"
              className={`flex items-center gap-2 ${
                isActive('/forum') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaUsers />
              <span>Forum</span>
            </Link>
            <Link
              to="/search"
              className={`flex items-center gap-2 ${
                isActive('/search') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaSearch />
              <span>Search</span>
            </Link>
          </div>

          {/* User Menu (Desktop) */}
          <div className="hidden md:flex items-center">
            {currentUser ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <img
                  src={currentUser.photoURL || 'https://via.placeholder.com/32'}
                  alt={currentUser.displayName || 'Profile'}
                  className="w-8 h-8 rounded-full"
                />
                <span>
                  {currentUser.displayName || 'Profile'}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <FaUser />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 