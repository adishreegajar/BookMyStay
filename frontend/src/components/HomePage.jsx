import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPinIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  StarIcon,
  WifiIcon,
  TvIcon,
  FireIcon,
  HomeModernIcon
} from '@heroicons/react/24/outline';
import LoginRequiredModal from './LoginPrompt';

const Homepage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
  });

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    console.log('Search data:', formData);
    navigate('/rooms', { state: formData });
  };

  const handleViewDetails = (room) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    navigate(`/rooms/${room.id}`);
  };

  const handleBookNow = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    navigate('/book');
  };

  const featuredRooms = [
    {
      id: 1,
      name: "Deluxe Suite",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      price: 199,
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "Executive Room",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      price: 149,
      rating: 4.6,
      reviews: 98
    },
    {
      id: 3,
      name: "Premium Ocean View",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      price: 249,
      rating: 4.9,
      reviews: 156
    }
  ];

  const amenities = [
    { icon: WifiIcon, name: "Free WiFi" },
    { icon: TvIcon, name: "Smart TV" },
    { icon: FireIcon, name: "Climate Control" },
    { icon: HomeModernIcon, name: "Modern Interiors" }
  ];

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Login Required Modal */}
      <LoginRequiredModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        message="Please login to search and book rooms"
      />

      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-gray-900 to-gray-700 overflow-visible">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600')"
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center z-10">
          <div className="text-white animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-slideDown">
              Your Perfect Stay
              <br />
              <span className="text-gray-300">Awaits You</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slideUp">
              Experience luxury and comfort like never before
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20">
          <div className="max-w-6xl mx-auto px-4">
            <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Destination Input */}
                <div className="md:col-span-2">
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                    Where are you going?
                  </label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg p-3 hover:border-gray-900 focus-within:border-gray-900 transition-all duration-300 bg-white">
                    <MapPinIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                    <input 
                      type="text"
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder="City, hotel, or landmark" 
                      className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
                
                {/* Check-in Date */}
                <div>
                  <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in
                  </label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg p-3 hover:border-gray-900 focus-within:border-gray-900 transition-all duration-300 bg-white">
                    <CalendarIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                    <input 
                      type="date"
                      id="checkIn"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      min={today}
                      className="w-full outline-none bg-transparent text-gray-900 cursor-pointer"
                      required
                    />
                  </div>
                </div>
                
                {/* Check-out Date */}
                <div>
                  <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out
                  </label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg p-3 hover:border-gray-900 focus-within:border-gray-900 transition-all duration-300 bg-white">
                    <CalendarIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                    <input 
                      type="date"
                      id="checkOut"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      min={formData.checkIn || today}
                      className="w-full outline-none bg-transparent text-gray-900 cursor-pointer"
                      required
                    />
                  </div>
                </div>
                
                {/* Search Button */}
                <div className="flex items-end">
                  <button 
                    type="submit"
                    className="w-full bg-gray-900 text-white rounded-lg p-4 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold text-base"
                  >
                    Search Rooms
                  </button>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  <span className="text-sm text-gray-600 font-medium">Popular:</span>
                  <button 
                    type="button"
                    className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors duration-200"
                    onClick={() => setFormData(prev => ({ ...prev, destination: 'Mumbai' }))}
                  >
                    Mumbai
                  </button>
                  <button 
                    type="button"
                    className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors duration-200"
                    onClick={() => setFormData(prev => ({ ...prev, destination: 'Goa' }))}
                  >
                    Goa
                  </button>
                  <button 
                    type="button"
                    className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors duration-200"
                    onClick={() => setFormData(prev => ({ ...prev, destination: 'Delhi' }))}
                  >
                    Delhi
                  </button>
                  <button 
                    type="button"
                    className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors duration-200"
                    onClick={() => setFormData(prev => ({ ...prev, destination: 'Bangalore' }))}
                  >
                    Bangalore
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-28">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Rooms</h2>
          <p className="text-gray-600 text-lg">Discover our most popular accommodations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRooms.map((room, index) => (
            <div 
              key={room.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${room.price}/night
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{room.name}</h3>
                
                <div className="flex items-center mb-4">
                  <StarIcon className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-gray-700 font-medium">{room.rating}</span>
                  <span className="ml-2 text-gray-500">({room.reviews} reviews)</span>
                </div>
                
                <button 
                  onClick={() => handleViewDetails(room)}
                  className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Amenities</h2>
            <p className="text-gray-600 text-lg">Everything you need for a comfortable stay</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="bg-gray-100 p-4 rounded-full mb-4 group-hover:bg-gray-900 transition-colors duration-300">
                  <amenity.icon className="h-8 w-8 text-gray-900" />
                </div>
                <p className="text-gray-700 font-medium text-center">{amenity.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Book Your Stay?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied guests who chose BookMyStay
          </p>
          <button 
            onClick={handleBookNow}
            className="bg-white text-gray-900 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Book Now & Save 20%
          </button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
