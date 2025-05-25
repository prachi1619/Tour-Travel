import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaChartBar, FaMapMarkedAlt, FaBlog, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <FaChartBar /> },
    { path: '/admin/destinations', label: 'Destinations', icon: <FaMapMarkedAlt /> },
    { path: '/admin/blogs', label: 'Blogs', icon: <FaBlog /> },
    { path: '/admin/users', label: 'Users', icon: <FaUsers /> },
    { path: '/admin/settings', label: 'Settings', icon: <FaCog /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                View Site
              </Link>
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center px-3 py-4 text-sm font-medium border-b-2 ${
                  location.pathname === item.path
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout; 