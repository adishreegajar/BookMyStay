import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on component mount and when localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (for multi-tab support)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Update state
    setIsLoggedIn(false);
    setUser(null);
    setShowUserMenu(false);
    
    // Navigate to home
    navigate('/login');
  };

  // Function to determine if link is active for desktop links
  const getNavLinkClass = ({ isActive }) => {
    return `relative text-gray-700 hover:text-gray-900 transition-all duration-300 ease-out group ${
      isActive ? 'text-gray-900 font-semibold' : ''
    }`;
  };

  // Function for the underline animation
  const getUnderlineClass = (isActive) => {
    return `absolute left-0 bottom-0 h-0.5 bg-gray-900 transition-all duration-300 ease-out ${
      isActive ? 'w-full' : 'w-0 group-hover:w-full'
    }`;
  };

  // Function for mobile links
  const getMobileNavLinkClass = ({ isActive }) => {
    return `block px-3 py-2 rounded-md transition-all duration-300 ease-out hover:translate-x-2 ${
      isActive
        ? 'bg-gray-100 text-gray-900 font-semibold'
        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
    }`;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <NavLink 
              to="/" 
              className="text-2xl font-semibold text-gray-900 hover:text-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              BookMyStay
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink to="/" className={getNavLinkClass}>
              {({ isActive }) => (
                <>
                  Home
                  <span className={getUnderlineClass(isActive)}></span>
                </>
              )}
            </NavLink>

            <NavLink to="/rooms" className={getNavLinkClass}>
              {({ isActive }) => (
                <>
                  Rooms
                  <span className={getUnderlineClass(isActive)}></span>
                </>
              )}
            </NavLink>

            <NavLink to="/services" className={getNavLinkClass}>
              {({ isActive }) => (
                <>
                  Services
                  <span className={getUnderlineClass(isActive)}></span>
                </>
              )}
            </NavLink>

            <NavLink to="/about" className={getNavLinkClass}>
              {({ isActive }) => (
                <>
                  About
                  <span className={getUnderlineClass(isActive)}></span>
                </>
              )}
            </NavLink>

            <NavLink to="/contact" className={getNavLinkClass}>
              {({ isActive }) => (
                <>
                  Contact
                  <span className={getUnderlineClass(isActive)}></span>
                </>
              )}
            </NavLink>

            <NavLink 
              to="/book" 
              className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg"
            >
              Book Now
            </NavLink>

            {/* Login/User Menu */}
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all duration-300 ease-out focus:outline-none"
                >
                  <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium">{user.firstName}</span>
                  <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Profile
                    </NavLink>
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink 
                to="/login" 
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 ease-out"
              >
                <UserCircleIcon className="h-6 w-6" />
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-110"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 transition-transform duration-300 ease-in-out rotate-90" />
              ) : (
                <Bars3Icon className="h-6 w-6 transition-transform duration-300 ease-in-out" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
          {/* User Info (Mobile) */}
          {isLoggedIn && user && (
            <div className="px-3 py-3 bg-gray-50 rounded-md mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          <NavLink
            to="/"
            className={getMobileNavLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/rooms"
            className={getMobileNavLinkClass}
            onClick={() => setIsOpen(false)}
            style={{ transitionDelay: '50ms' }}
          >
            Rooms
          </NavLink>

          <NavLink
            to="/services"
            className={getMobileNavLinkClass}
            onClick={() => setIsOpen(false)}
            style={{ transitionDelay: '100ms' }}
          >
            Services
          </NavLink>

          <NavLink
            to="/about"
            className={getMobileNavLinkClass}
            onClick={() => setIsOpen(false)}
            style={{ transitionDelay: '150ms' }}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={getMobileNavLinkClass}
            onClick={() => setIsOpen(false)}
            style={{ transitionDelay: '200ms' }}
          >
            Contact
          </NavLink>

          <NavLink
            to="/book"
            className="block mx-3 my-2 px-3 py-2 bg-gray-900 text-white text-center rounded-md hover:bg-gray-800 transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg"
            onClick={() => setIsOpen(false)}
            style={{ transitionDelay: '250ms' }}
          >
            Book Now
          </NavLink>

          {/* Mobile Login/Logout */}
          {isLoggedIn && user ? (
            <>
              <NavLink
                to="/profile"
                className={getMobileNavLinkClass}
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: '300ms' }}
              >
                My Profile
              </NavLink>
              
              <NavLink
                to="/bookings"
                className={getMobileNavLinkClass}
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: '350ms' }}
              >
                My Bookings
              </NavLink>
              
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-all duration-300 ease-out flex items-center gap-2"
                style={{ transitionDelay: '400ms' }}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="mx-3 my-2 px-3 py-2 border-2 border-gray-900 text-gray-900 text-center rounded-md hover:bg-gray-900 hover:text-white transition-all duration-300 ease-out flex items-center justify-center gap-2"
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: '300ms' }}
            >
              <UserCircleIcon className="h-5 w-5" />
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
