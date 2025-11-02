import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  UserCircleIcon,
  ArrowLeftIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name] || errors.general) {
      setErrors({});
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setErrors({});
      
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe
          }),
        });

        const data = await response.json();

        if (data.success) {
          // Store token and user data in localStorage
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.user));
          
          // Show success message (optional)
          console.log('Login successful:', data.message);
          
          // Navigate to home page
          navigate('/');
        } else {
          // Show specific error message from backend
          if (data.message.toLowerCase().includes('invalid email') || 
              data.message.toLowerCase().includes('user not found') ||
              data.message.toLowerCase().includes('invalid email or password')) {
            setErrors({ 
              general: 'User does not exist',
              helper: 'Please check your email or create a new account.'
            });
          } else if (data.message.toLowerCase().includes('password')) {
            setErrors({ 
              general: 'Incorrect password',
              helper: 'Please check your password and try again.'
            });
          } else {
            setErrors({ 
              general: data.message || 'Login failed. Please try again.'
            });
          }
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ 
          general: 'Unable to connect to server',
          helper: 'Please check your internet connection and try again.'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Implement Google OAuth logic here
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
    // Implement Facebook OAuth logic here
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding with Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-gray-900/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo & Brand */}
          <div>
            <NavLink to="/" className="inline-block group">
              <h1 className="text-4xl font-bold mb-2 group-hover:text-gray-200 transition-colors duration-300">
                BookMyStay
              </h1>
              <p className="text-gray-300 text-lg">Your Gateway to Exceptional Hospitality</p>
            </NavLink>
          </div>

          {/* Middle Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Welcome Back to <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Luxury & Comfort
                </span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Sign in to access exclusive offers, manage your bookings, and experience world-class service.
              </p>
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="border-l-4 border-white/30 pl-6">
            <p className="text-lg italic text-gray-300 mb-2">
              "The best hotel experience I've ever had. Exceptional service and stunning rooms!"
            </p>
            <p className="text-sm text-gray-400">- John Doe, Verified Guest</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">

          {/* Mobile Logo */}
          <div className="lg:hidden text-center">
            <NavLink to="/" className="inline-block">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">BookMyStay</h1>
              <p className="text-gray-600">Your Gateway to Exceptional Hospitality</p>
            </NavLink>
          </div>

          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full mb-6 shadow-xl">
              <UserCircleIcon className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-lg">
              Sign in to continue your journey
            </p>
          </div>

          {/* Login Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error Message */}
              {errors.general && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-red-800">{errors.general}</p>
                      {errors.helper && (
                        <p className="text-xs text-red-600 mt-1">{errors.helper}</p>
                      )}
                      {errors.general === 'User does not exist' && (
                        <NavLink 
                          to="/signup" 
                          className="text-xs text-red-700 hover:text-red-900 font-semibold underline mt-2 inline-block"
                        >
                          Create a new account →
                        </NavLink>
                      )}
                      {errors.general === 'Incorrect password' && (
                        <NavLink 
                          to="/forgot-password" 
                          className="text-xs text-red-700 hover:text-red-900 font-semibold underline mt-2 inline-block"
                        >
                          Reset your password →
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500 bg-red-50' 
                        : 'border-gray-300 focus:border-gray-900 hover:border-gray-400'
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <ExclamationCircleIcon className="h-4 w-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                      errors.password 
                        ? 'border-red-500 focus:border-red-500 bg-red-50' 
                        : 'border-gray-300 focus:border-gray-900 hover:border-gray-400'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <ExclamationCircleIcon className="h-4 w-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <NavLink 
                  to="/forgot-password" 
                  className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-all duration-300 ease-out hover:underline"
                >
                  Forgot password?
                </NavLink>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-6 rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-300 ease-out transform hover:scale-[1.02] font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In to BookMyStay'
                )}
              </button>
            </form>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <NavLink 
                to="/signup" 
                className="font-semibold text-gray-900 hover:text-gray-700 transition-all duration-300 ease-out hover:underline"
              >
                Sign up for free
              </NavLink>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Create an account in less than 2 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
