import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import AdminLayout from './AdminLayout';
import { useAuth } from '../../contexts/AuthContext';
import {Footer} from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    // Check local storage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return saved ? JSON.parse(saved) : systemPreference;
    }
    return false;
  });

  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    // Update class and save preference
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

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
      <Footer  isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default Layout;