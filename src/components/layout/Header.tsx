import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  User,
  SunMedium,
  Moon,
  Compass
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useThemeStore } from '../../store/themeStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { isDarkMode, toggleTheme } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Compass size={28} className="text-primary-500" />
            <span className="text-xl font-heading font-bold text-gray-900 dark:text-white">
              Incredible India
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Destinations Dropdown - Placeholder */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 font-medium flex items-center">
                Destinations
                {/* Add a dropdown icon here e.g., <ChevronDown size={16} /> */}
              </button>
              {/* Dropdown content for regions - to be implemented */}
              {/* <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                <Link to="/destinations/north" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">North India</Link>
                <Link to="/destinations/south" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">South India</Link>
                <Link to="/destinations/east" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">East India</Link>
                <Link to="/destinations/west" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">West India</Link>
              </div> */}
            </div>

            {/* Themes Dropdown - Placeholder */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 font-medium flex items-center">
                Themes
                {/* Add a dropdown icon here e.g., <ChevronDown size={16} /> */}
              </button>
              {/* Dropdown content for categories - to be implemented */}
              {/* <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                <Link to="/themes/spiritual" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Spiritual</Link>
                <Link to="/themes/adventure" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Adventure</Link>
                <Link to="/themes/nature" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Nature</Link>
                <Link to="/themes/historical" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Historical</Link>
                <Link to="/themes/romantic" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Romantic</Link>
              </div> */}
            </div>

            <Link to="/blog" className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 font-medium">
              Blog
            </Link>
            <Link to="/help" className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 font-medium">
              Help
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 font-medium">
              Contact
            </Link>
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <button 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <button
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <SunMedium size={20} /> : <Moon size={20} />}
            </button>
            
            <Link 
              to="/login" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
              aria-label="User account"
            >
              <User size={20} />
            </Link>
            
            <button 
              className="md:hidden text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg absolute top-full left-0 right-0 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {/* Destinations Mobile - Placeholder for dropdown/accordion */}
              <Link 
                to="/destinations" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)} // Consider if this should toggle a sub-menu
              >
                Destinations
              </Link>
              {/* Themes Mobile - Placeholder for dropdown/accordion */}
              <Link 
                to="/themes" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)} // Consider if this should toggle a sub-menu
              >
                Themes
              </Link>
              <Link 
                to="/blog" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/help" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}