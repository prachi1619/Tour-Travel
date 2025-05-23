import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  FaHome,
  FaCompass,
  FaBlog,
  FaSearch,
  FaUsers,
  FaUser,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-600 hover:text-gray-900"
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <Link to="/" className="flex items-center" onClick={closeMenu}>
                <img
                  src="/logo.png"
                  alt="Travel Explorer"
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Travel Explorer
                </span>
              </Link>
              <button
                onClick={closeMenu}
                className="p-2 text-gray-600 hover:text-gray-900"
                aria-label="Close menu"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto">
              <div className="py-4">
                <Link
                  to="/"
                  className={`flex items-center gap-4 px-4 py-3 ${
                    isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                  }`}
                  onClick={closeMenu}
                >
                  <FaHome size={20} />
                  <span>Home</span>
                </Link>
                <Link
                  to="/destinations"
                  className={`flex items-center gap-4 px-4 py-3 ${
                    isActive('/destinations') ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                  }`}
                  onClick={closeMenu}
                >
                  <FaCompass size={20} />
                  <span>Destinations</span>
                </Link>
                <Link
                  to="/blog"
                  className={`flex items-center gap-4 px-4 py-3 ${
                    isActive('/blog') ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                  }`}
                  onClick={closeMenu}
                >
                  <FaBlog size={20} />
                  <span>Blog</span>
                </Link>
                <Link
                  to="/forum"
                  className={`flex items-center gap-4 px-4 py-3 ${
                    isActive('/forum') ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                  }`}
                  onClick={closeMenu}
                >
                  <FaUsers size={20} />
                  <span>Forum</span>
                </Link>
                <Link
                  to="/search"
                  className={`flex items-center gap-4 px-4 py-3 ${
                    isActive('/search') ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                  }`}
                  onClick={closeMenu}
                >
                  <FaSearch size={20} />
                  <span>Search</span>
                </Link>
              </div>
            </div>

            {/* User Section */}
            <div className="border-t p-4">
              {currentUser ? (
                <Link
                  to="/profile"
                  className="flex items-center gap-4"
                  onClick={closeMenu}
                >
                  <img
                    src={currentUser.photoURL || 'https://via.placeholder.com/40'}
                    alt={currentUser.displayName || 'Profile'}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">
                      {currentUser.displayName || 'Profile'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {currentUser.email}
                    </div>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-4 text-gray-600"
                  onClick={closeMenu}
                >
                  <FaUser size={20} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation; 