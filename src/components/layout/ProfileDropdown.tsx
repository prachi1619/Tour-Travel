import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaCog, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserInitials = () => {
    if (currentUser?.displayName) {
      return getInitials(currentUser.displayName);
    }
    if (currentUser?.email) {
      return getInitials(currentUser.email.split('@')[0]);
    }
    return 'U';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="relative ml-3" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 group"
      >
        <div className="relative">
          {currentUser?.photoURL ? (
            <img
              className="h-8 w-8 rounded-full object-cover ring-2 ring-primary-500/20 group-hover:ring-primary-500/30"
              src={currentUser.photoURL}
              alt={currentUser?.displayName || 'User'}
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-medium ring-2 ring-primary-500/20 group-hover:ring-primary-500/30">
              {getUserInitials()}
            </div>
          )}
          {currentUser?.emailVerified && (
            <span className="absolute -bottom-0.5 -right-0.5 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-900" />
          )}
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200 truncate max-w-[100px]">
          {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
        </span>
        <FaChevronDown 
          className={`w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 divide-y divide-gray-100 dark:divide-gray-700 origin-top-right">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {currentUser?.displayName || 'User'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {currentUser?.email}
            </p>
          </div>
          <div className="py-1">
            <Link
              to="/profile"
              className="group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <FaUser className="mr-3 h-4 w-4 text-gray-400 group-hover:text-primary-500" />
              Your Profile
            </Link>
          </div>
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 group transition-colors"
            >
              <FaSignOutAlt className="mr-3 h-4 w-4 text-red-400 group-hover:text-red-600" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown; 