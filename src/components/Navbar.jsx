import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
