import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  XMarkIcon,
  UserCircleIcon,
  LockClosedIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const LoginRequiredModal = ({ isOpen, onClose, message = "Please login to continue" }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  const handleSignup = () => {
    onClose();
    navigate('/signup');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={handleBackdropClick}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all animate-slideIn z-50">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
            type="button"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
              <LockClosedIcon className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Login Required
            </h2>
            <p className="text-gray-600 text-lg">
              {message}
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              type="button"
              className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-6 rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-[1.02] font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <UserCircleIcon className="h-6 w-6" />
              Sign In to Your Account
              <ArrowRightIcon className="h-5 w-5" />
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <button
              onClick={handleSignup}
              type="button"
              className="w-full border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] font-semibold text-lg flex items-center justify-center gap-2"
            >
              Create New Account
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Why create an account?</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                Save your favorite properties
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                Track your bookings easily
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                Get exclusive member discounts
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                Faster checkout process
              </li>
            </ul>
          </div>

          {/* Close Text */}
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              type="button"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 underline"
            >
              Continue browsing without login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
