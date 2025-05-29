import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import { FaSun, FaMoon, FaSearch } from 'react-icons/fa';

interface NavigationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute) return null;

  const gradientText = isDarkMode
    ? 'bg-gradient-to-r from-[#FF9933] via-white to-[#138808]'
    : 'bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808]';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 backdrop-blur-md
        ${isDarkMode ? 'bg-navy-950/95 border-b border-navy-800' : 'bg-white/95 border-b border-gray-200'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo + NavLinks */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold font-heading flex-shrink-0 ml-4">
              <span className={`${gradientText} bg-clip-text text-transparent`}>TraviBharat</span>
            </Link>

            {/* Nav Links - Centered vertically */}
            <div className="hidden lg:flex space-x-6 text-base   h-16 items-center">
              {['/', '/about', '/destinations', '/blog', '/tools', '/contact'].map((path, idx) => (
                <NavLink key={path} to={path} isDarkMode={isDarkMode} exact={path === '/'}>
                  {['Home', 'About Us', 'Destinations', 'Travel Blogs', 'Travel Tools', 'Contact Us'][idx]}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Search + Auth + Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Search Bar - Removed border styling on hover */}
            <div className="hidden md:flex w-[200px]">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for places, activities, or guides..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg transition duration-200 text-base
                    ${isDarkMode ? 'bg-navy-800 text-gray-200 border border-navy-700 placeholder-gray-400' : 'bg-gray-100 text-gray-900 border border-gray-300 placeholder-gray-500'}
                    ${isSearchFocused ? 'ring-2 ring-[#FF9933]' : ''}`}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <FaSearch className={`absolute left-3 top-3.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </div>

            {currentUser ? (
              <ProfileDropdown />
            ) : (
              <div className="flex items-center space-x-3">
                {/* More interactive login/signup buttons */}
                <Link 
                  to="/login" 
                  className={`text-base font-medium px-3 py-1.5 rounded-md transition
                    ${isDarkMode ? 'text-white hover:bg-navy-700' : 'text-gray-800 hover:bg-gray-200'}`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className={`text-base font-medium px-3 py-1.5 rounded-md transition
                    ${isDarkMode 
                      ? 'bg-[#FF9933] text-white hover:bg-[#e68a2e]' 
                      : 'bg-[#FF9933] text-white hover:bg-[#e68a2e]'}`}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Larger theme toggle icon */}
            <button 
              onClick={toggleDarkMode} 
              aria-label="Toggle theme"
              className={`p-2 rounded-full transition
                ${isDarkMode ? 'hover:bg-navy-700' : 'hover:bg-gray-200'}`}
            >
              {isDarkMode ? (
                <FaMoon className="text-white text-xl" />
              ) : (
                <FaSun className="text-gray-800 text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden border-t border-gray-200 dark:border-navy-800 px-4 py-2">
        <div className="grid grid-cols-5 gap-3">
          {['/', '/about', '/destinations', '/blog', '/contact'].map((path, idx) => (
            <MobileNavLink key={path} to={path} isDarkMode={isDarkMode} exact={path === '/'}>
              {['Home', 'About Us', 'Explore', 'Blog', 'Contact'][idx]}
            </MobileNavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

// Rest of the code remains the same (NavLink and MobileNavLink components)
interface NavLinkProps {
  to: string;
  exact?: boolean;
  children: React.ReactNode;
  isDarkMode: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, exact, children, isDarkMode }) => {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

  const gradientText = isDarkMode
    ? 'bg-gradient-to-r from-[#FF9933] via-white to-[#138808]'
    : 'bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808]';

  return (
    <Link
      to={to}
      className={`text-base font-medium transition duration-300 flex items-center h-full
        ${isActive
          ? `${gradientText} bg-clip-text text-transparent`
          : isDarkMode
            ? 'text-gray-400 hover:text-white'
            : 'text-gray-700 hover:text-black'}`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, exact, children, isDarkMode }) => {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

  const gradientText = isDarkMode
    ? 'bg-gradient-to-r from-[#FF9933] via-white to-[#138808]'
    : 'bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808]';

  return (
    <Link
      to={to}
      className={`text-xs text-center font-medium transition duration-300
        ${isActive
          ? `${gradientText} bg-clip-text text-transparent`
          : isDarkMode
            ? 'text-gray-400 hover:text-white'
            : 'text-gray-700 hover:text-black'}`}
    >
      {children}
    </Link>
  );
};

export default Navigation;