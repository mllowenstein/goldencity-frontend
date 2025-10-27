import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiMoon, FiSun} from 'react-icons/fi';
import { useThemeStore } from '../../store/themeStore';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // get theme state and toggle support from zustand - safety in mind with fallback default
  const isDark = useThemeStore((state) => state.isDark) ?? false;
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Properties', path: '/properties' },
    { label: 'About', path: '/about' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Blog', path: '/blog' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-secondary-900 shadow-md sticky top-0 z-40 transition-colors duration-300">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          <div className="flex">
            <Link to="/" className="flex items-center space-x-2">
              <svg width="30" height="35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="20" r="10" stroke="#0682ff"/>
                  <circle cx="15" cy="20" r="6" stroke="#0682ff" strokeWidth="3"/>
              </svg>  
              <span className="text-2xl font-bold text-primary-700 dark:text-primary-400 mt-1.5">GoldenCity</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`font-medium transition-colors ${
                  isActive(item.path)
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:text-primary-400'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* theme toggle button */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-all duration-300"
              aria-label="Toggle Theme"
              >
                { isDark ? <FiSun size={20} /> : <FiMoon size={20} /> }
              </button>
            <button
              className="btn"
            >
              Connect
            </button>
          </div>

          {/* Mobile menu button & Mobile THeme Toggle */}
          <div className="flex items-center md:hidden space-x-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-all duration-300"
              aria-label="Toggle Theme"
              >
                { isDark ? <FiSun size={20} /> : <FiMoon size={20} /> }
              </button>
            <button
              className="btn"
            >
              Connect
            </button>
            <button
              type="button"
              className="text-secondary-600 hover:text-primary-600 dark:text-secondary-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : 'text-secondary-600 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;