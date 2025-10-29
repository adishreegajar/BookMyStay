import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon,
  CalendarIcon,
  UserGroupIcon,
  HomeIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const BookNowPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    // Step 1: Room Selection
    roomType: '',
    
    // Step 2: Booking Details
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    
    // Step 3: Guest Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'India',
    specialRequests: '',
    
    // Step 4: Payment
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    agreeTerms: false
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to confirmation page with booking data
    const selectedRoom = roomTypes.find(room => room.id === bookingData.roomType);
    navigate('/booking-confirmation', { 
      state: { 
        room: {
          ...selectedRoom,
          bookingDetails: bookingData
        }
      } 
    });
  };

  const getNavLinkClass = ({ isActive }) => {
    return `relative text-gray-700 hover:text-gray-900 transition-all duration-300 ease-out group ${
      isActive ? 'text-gray-900 font-semibold' : ''
    }`;
  };

  const getUnderlineClass = (isActive) => {
    return `absolute left-0 bottom-0 h-0.5 bg-gray-900 transition-all duration-300 ease-out ${
      isActive ? 'w-full' : 'w-0 group-hover:w-full'
    }`;
  };

  const getMobileNavLinkClass = ({ isActive }) => {
    return `block px-3 py-2 rounded-md transition-all duration-300 ease-out hover:translate-x-2 ${
      isActive
        ? 'bg-gray-100 text-gray-900 font-semibold'
        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
    }`;
  };

  const roomTypes = [
    {
      id: 'standard',
      name: 'Standard Room',
      type: 'standard',
      price: 99,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
      capacity: 2,
      size: '250 sq ft',
      amenities: ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Mini Fridge']
    },
    {
      id: 'deluxe',
      name: 'Deluxe Suite',
      type: 'deluxe',
      price: 199,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
      capacity: 3,
      size: '450 sq ft',
      amenities: ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'City View']
    },
    {
      id: 'executive',
      name: 'Executive Room',
      type: 'executive',
      price: 149,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      capacity: 2,
      size: '350 sq ft',
      amenities: ['Free WiFi', 'Smart TV', 'Work Desk', 'Coffee Maker']
    },
    {
      id: 'premium',
      name: 'Premium Ocean View',
      type: 'premium',
      price: 249,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      capacity: 4,
      size: '550 sq ft',
      amenities: ['Free WiFi', 'Balcony', 'Ocean View', 'Jacuzzi']
    }
  ];

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const start = new Date(bookingData.checkIn);
      const end = new Date(bookingData.checkOut);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    const selectedRoom = roomTypes.find(room => room.id === bookingData.roomType);
    if (selectedRoom) {
      const nights = calculateNights();
      const roomPrice = selectedRoom.price * nights;
      const serviceFee = 15;
      const tax = 0;
      return {
        roomPrice,
        serviceFee,
        tax,
        total: roomPrice + serviceFee + tax
      };
    }
    return { roomPrice: 0, serviceFee: 0, tax: 0, total: 0 };
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <NavLink 
                to="/" 
                className="text-2xl font-semibold text-gray-900 hover:text-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                BookMyStay
              </NavLink>
            </div>

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
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <NavLink to="/" className={getMobileNavLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/rooms" className={getMobileNavLinkClass} onClick={() => setIsOpen(false)}>Rooms</NavLink>
            <NavLink to="/services" className={getMobileNavLinkClass} onClick={() => setIsOpen(false)}>Services</NavLink>
            <NavLink to="/about" className={getMobileNavLinkClass} onClick={() => setIsOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={getMobileNavLinkClass} onClick={() => setIsOpen(false)}>Contact</NavLink>
          </div>
        </div>
      </nav>

      {/* Progress Steps */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    currentStep >= step 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step ? <CheckCircleIcon className="h-6 w-6" /> : step}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    currentStep >= step ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step === 1 && 'Room'}
                    {step === 2 && 'Dates'}
                    {step === 3 && 'Details'}
                    {step === 4 && 'Payment'}
                  </span>
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    currentStep > step ? 'bg-gray-900' : 'bg-gray-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={currentStep === 4 ? handleSubmit : handleNext}>
              {/* Step 1: Room Selection */}
              {currentStep === 1 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Select Your Room</h2>
                  <div className="space-y-4">
                    {roomTypes.map((room) => (
                      <label
                        key={room.id}
                        className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          bookingData.roomType === room.id
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="roomType"
                          value={room.id}
                          checked={bookingData.roomType === room.id}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <UserGroupIcon className="h-4 w-4" />
                                  {room.capacity} guests
                                </span>
                                <span className="flex items-center gap-1">
                                  <HomeIcon className="h-4 w-4" />
                                  {room.size}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">${room.price}</div>
                              <div className="text-sm text-gray-500">per night</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {room.amenities.slice(0, 3).map((amenity, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Booking Details */}
              {currentStep === 2 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Choose Your Dates</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Check-in Date *
                        </label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="date"
                            name="checkIn"
                            value={bookingData.checkIn}
                            onChange={handleInputChange}
                            min={getTodayDate()}
                            required
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Check-out Date *
                        </label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="date"
                            name="checkOut"
                            value={bookingData.checkOut}
                            onChange={handleInputChange}
                            min={bookingData.checkIn || getTodayDate()}
                            required
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Adults *
                        </label>
                        <select
                          name="adults"
                          value={bookingData.adults}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Children
                        </label>
                        <select
                          name="children"
                          value={bookingData.children}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none cursor-pointer"
                        >
                          {[0, 1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {calculateNights() > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-blue-900">
                          <ClockIcon className="h-5 w-5" />
                          <span className="font-semibold">
                            {calculateNights()} {calculateNights() === 1 ? 'night' : 'nights'} selected
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Guest Information */}
              {currentStep === 3 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Information</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={bookingData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={bookingData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={bookingData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Country *
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={bookingData.country}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        name="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none resize-none"
                        placeholder="Any special requirements or requests..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {currentStep === 4 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Payment Details</h2>
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                      <ShieldCheckIcon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">Secure Payment</p>
                        <p className="text-blue-700">Your payment information is encrypted and secure.</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={bookingData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <div className="relative">
                        <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="cardNumber"
                          value={bookingData.cardNumber}
                          onChange={handleInputChange}
                          required
                          maxLength="19"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={bookingData.expiryDate}
                          onChange={handleInputChange}
                          required
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={bookingData.cvv}
                          onChange={handleInputChange}
                          required
                          maxLength="3"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-4">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={bookingData.agreeTerms}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                      <label className="text-sm text-gray-600">
                        I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> *
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 bg-white border-2 border-gray-300 text-gray-900 py-4 px-6 rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 font-semibold"
                  >
                    ← Back
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
                >
                  {currentStep === 4 ? 'Complete Booking' : 'Continue →'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h3>
              
              {bookingData.roomType && (
                <div className="mb-6">
                  <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                    <img
                      src={roomTypes.find(r => r.id === bookingData.roomType)?.image}
                      alt="Selected Room"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    {roomTypes.find(r => r.id === bookingData.roomType)?.name}
                  </h4>
                </div>
              )}

              {bookingData.checkIn && bookingData.checkOut && (
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Check-in</span>
                    <span className="font-medium">{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Check-out</span>
                    <span className="font-medium">{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Guests</span>
                    <span className="font-medium">{bookingData.adults} Adults, {bookingData.children} Children</span>
                  </div>
                  {calculateNights() > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Nights</span>
                      <span className="font-medium">{calculateNights()}</span>
                    </div>
                  )}
                </div>
              )}

              {bookingData.roomType && calculateNights() > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      ${roomTypes.find(r => r.id === bookingData.roomType)?.price} × {calculateNights()} nights
                    </span>
                    <span className="font-medium">${calculateTotal().roomPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service fee</span>
                    <span className="font-medium">${calculateTotal().serviceFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-medium">${calculateTotal().tax}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">${calculateTotal().total}</span>
                  </div>
                </div>
              )}

              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <p className="font-semibold mb-1">Free Cancellation</p>
                    <p className="text-green-700">Cancel up to 24 hours before check-in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNowPage;
