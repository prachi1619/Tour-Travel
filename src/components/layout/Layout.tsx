import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import AdminLayout from './AdminLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();
  const { isDark: isDarkMode, toggleTheme: toggleDarkMode } = useTheme();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Only show admin layout for admin routes and admin users
  if (isAdminRoute && isAdmin) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow pt-16">{children}</main>
      <Footer isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default Layout;