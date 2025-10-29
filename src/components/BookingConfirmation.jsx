import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import ReactCanvasConfetti from 'react-canvas-confetti';
import {
  CheckCircleIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  HomeIcon,
  ClockIcon,
  PrinterIcon,
  EnvelopeIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room;
  
  // Confetti setup
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  useEffect(() => {
    fire();
    // Fire confetti multiple times for celebration effect
    const id = setInterval(fire, 3000);
    setIntervalId(id);

    // Clear interval after 9 seconds
    setTimeout(() => {
      clearInterval(id);
    }, 9000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Redirect if no room data
  useEffect(() => {
    if (!room) {
      navigate('/rooms');
    }
  }, [room, navigate]);

  if (!room) return null;

  // Generate booking details
  const bookingNumber = `BMS${Math.floor(Math.random() * 1000000)}`;
  const checkInDate = new Date();
  checkInDate.setDate(checkInDate.getDate() + 1);
  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkOutDate.getDate() + 1);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Confetti Canvas */}
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Success Header */}
        <div className="text-center mb-8 animate-slideDown">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircleIcon className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Booking Confirmed! 
          </h1>
          <p className="text-xl text-gray-600">
            Your reservation has been successfully processed
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* Booking Number Banner */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 text-center">
            <p className="text-sm font-medium mb-1">Booking Confirmation Number</p>
            <p className="text-3xl font-bold tracking-wide">{bookingNumber}</p>
          </div>

          {/* Room Details */}
          <div className="p-6 md:p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reservation Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Room Image & Info */}
              <div>
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {room.type}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <UserGroupIcon className="h-4 w-4" />
                    <span>{room.capacity} guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HomeIcon className="h-4 w-4" />
                    <span>{room.size}</span>
                  </div>
                </div>
              </div>

              {/* Check-in/out Details */}
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-blue-900 mb-1">Check-in</p>
                      <p className="text-sm text-blue-700">{formatDate(checkInDate)}</p>
                      <p className="text-xs text-blue-600 mt-1">After 3:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-purple-900 mb-1">Check-out</p>
                      <p className="text-sm text-purple-700">{formatDate(checkOutDate)}</p>
                      <p className="text-xs text-purple-600 mt-1">Before 11:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <ClockIcon className="h-6 w-6 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Duration</p>
                      <p className="text-sm text-gray-700">1 night</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property Location */}
          <div className="p-6 md:p-8 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Property Information</h3>
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
              <MapPinIcon className="h-6 w-6 text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">BookMyStay Hotel</p>
                <p className="text-sm text-gray-600 mt-1">
                  123 Luxury Avenue, Downtown<br />
                  Mumbai, Maharashtra 400001<br />
                  India
                </p>
                <p className="text-sm text-blue-600 mt-2">+91 22 1234 5678</p>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="p-6 md:p-8 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>${room.price} × 1 night</span>
                <span className="font-medium">${room.price}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Service fee</span>
                <span className="font-medium">$15</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Taxes</span>
                <span className="font-medium">$0</span>
              </div>
              <div className="border-t border-gray-300 pt-3 flex justify-between text-lg font-bold text-gray-900">
                <span>Total Paid</span>
                <span className="text-green-600">${room.price + 15}</span>
              </div>
            </div>
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-800">Payment processed successfully via credit card</p>
            </div>
          </div>

          {/* Important Information */}
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Important Information</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <p>A confirmation email has been sent to your registered email address</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <p>Please carry a valid government ID for check-in</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <p>Free cancellation available up to 24 hours before check-in</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <p>Early check-in subject to availability</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-900 py-3 px-6 rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 font-semibold"
          >
            <PrinterIcon className="h-5 w-5" />
            Print
          </button>
          <button className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-900 py-3 px-6 rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 font-semibold">
            <EnvelopeIcon className="h-5 w-5" />
            Email
          </button>
          <button className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-900 py-3 px-6 rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 font-semibold">
            <ArrowDownTrayIcon className="h-5 w-5" />
            Download
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <NavLink
            to="/"
            className="flex-1 bg-white border-2 border-gray-300 text-gray-900 py-4 px-6 rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 font-semibold text-center"
          >
            ← Back to Home
          </NavLink>
          <NavLink
            to="/rooms"
            className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-6 rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 font-semibold text-center shadow-lg"
          >
            Book Another Room →
          </NavLink>
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Need help with your booking?</p>
          <NavLink to="/contact" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
            Contact Customer Support
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
