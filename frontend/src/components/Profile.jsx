import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  LockClosedIcon,
  CalendarIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setFormData({
      firstName: parsedUser.firstName || '',
      lastName: parsedUser.lastName || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || ''
    });
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
        })
      });

      const data = await response.json();

      if (data.success) {
        // Update localStorage with new user data
        const updatedUser = { ...user, ...data.data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrors({ general: data.message });
      }
    } catch (error) {
      console.error('Update error:', error);
      setErrors({ general: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setSuccessMessage('Password changed successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrors({ general: data.message });
      }
    } catch (error) {
      console.error('Password change error:', error);
      setErrors({ general: 'Failed to change password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || ''
    });
    setErrors({});
  };

  const cancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 mb-8 group"
        >
          <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <CheckIcon className="h-5 w-5 text-green-600" />
              <p className="text-sm text-green-700 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* General Error Message */}
        {errors.general && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600 font-medium">{errors.general}</p>
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl">
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600 mt-1">{user.email}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4" />
                <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-all duration-300"
            >
              <PencilIcon className="h-5 w-5" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>

          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <UserCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                        errors.firstName
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:border-gray-900'
                      }`}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <UserCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                        errors.lastName
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:border-gray-900'
                      }`}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

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
                    value={formData.email}
                    disabled
                    className="w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                      errors.phone
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-gray-900'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckIcon className="h-5 w-5" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold"
                >
                  <XMarkIcon className="h-5 w-5" />
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 py-3 border-b border-gray-100">
                <UserCircleIcon className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-base font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 py-3 border-b border-gray-100">
                <EnvelopeIcon className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-base font-semibold text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 py-3">
                <PhoneIcon className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-base font-semibold text-gray-900">{user.phone}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Security</h2>

          {!isChangingPassword ? (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-all duration-300"
            >
              <LockClosedIcon className="h-5 w-5" />
              Change Password
            </button>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                      errors.currentPassword
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-gray-900'
                    }`}
                    placeholder="Enter current password"
                  />
                </div>
                {errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                      errors.newPassword
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-gray-900'
                    }`}
                    placeholder="Enter new password"
                  />
                </div>
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                      errors.confirmPassword
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-gray-900'
                    }`}
                    placeholder="Confirm new password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckIcon className="h-5 w-5" />
                  {isLoading ? 'Changing...' : 'Change Password'}
                </button>
                <button
                  type="button"
                  onClick={cancelPasswordChange}
                  className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold"
                >
                  <XMarkIcon className="h-5 w-5" />
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
