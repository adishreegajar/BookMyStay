import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon,
  StarIcon,
  UserGroupIcon,
  HomeIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  WifiIcon,
  TvIcon,
  FireIcon
} from '@heroicons/react/24/outline';

const RoomsPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    roomType: 'all',
    capacity: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedRoom(null);
    }, 300); // Wait for fade animation to complete
    document.body.style.overflow = 'unset';
  };

  const handleBookNow = () => {
    closeModal();
    // Navigate to confirmed booking route with room data
    setTimeout(() => {
      navigate('/booking-confirmation', { state: { room: selectedRoom } });
    }, 300);
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

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

  const rooms = [
    {
      id: 1,
      name: "Standard Room",
      type: "standard",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      price: 99,
      capacity: 2,
      size: "250 sq ft",
      rating: 4.5,
      reviews: 89,
      amenities: ["Free WiFi", "Air Conditioning", "Smart TV", "Mini Fridge"],
      description: "Comfortable room with essential amenities for a pleasant stay",
      fullDescription: "Our Standard Room offers a cozy and comfortable space perfect for solo travelers or couples. Featuring modern decor and essential amenities, this room ensures a pleasant stay with all the basics you need. The room includes a comfortable queen-size bed, a work desk, and an ensuite bathroom with premium toiletries."
    },
    {
      id: 2,
      name: "Deluxe Suite",
      type: "deluxe",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      price: 199,
      capacity: 3,
      size: "450 sq ft",
      rating: 4.8,
      reviews: 124,
      amenities: ["Free WiFi", "Air Conditioning", "Smart TV", "Mini Bar", "Work Desk", "City View"],
      description: "Spacious suite with modern amenities and stunning city views",
      fullDescription: "Experience luxury in our Deluxe Suite, offering panoramic city views and spacious living areas. Perfect for business travelers or those seeking extra comfort, this suite features a separate living area, king-size bed, premium bedding, and a luxurious bathroom with a soaking tub. Enjoy complimentary high-speed internet and a fully stocked mini bar."
    },
    {
      id: 3,
      name: "Executive Room",
      type: "executive",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      price: 149,
      capacity: 2,
      size: "350 sq ft",
      rating: 4.6,
      reviews: 98,
      amenities: ["Free WiFi", "Air Conditioning", "Smart TV", "Work Desk", "Coffee Maker", "Premium Bedding"],
      description: "Perfect for business travelers with dedicated workspace",
      fullDescription: "Designed with business travelers in mind, our Executive Room features a spacious work desk, ergonomic chair, and multiple power outlets. The room includes premium bedding for a restful sleep, a Nespresso coffee maker, and complimentary access to our business center. Stay connected with high-speed WiFi and enjoy in-room entertainment on the 55-inch Smart TV."
    },
    {
      id: 4,
      name: "Premium Ocean View",
      type: "premium",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      price: 249,
      capacity: 4,
      size: "550 sq ft",
      rating: 4.9,
      reviews: 156,
      amenities: ["Free WiFi", "Air Conditioning", "Smart TV", "Balcony", "Ocean View", "Mini Bar", "Jacuzzi"],
      description: "Luxurious suite with breathtaking ocean views and premium amenities",
      fullDescription: "Indulge in pure luxury with our Premium Ocean View suite. Wake up to stunning sunrise views over the ocean from your private balcony. This spacious suite features a king-size bed, separate living area, private jacuzzi, and floor-to-ceiling windows. Perfect for romantic getaways or special occasions, complete with champagne service and premium amenities."
    },
    {
      id: 5,
      name: "Family Suite",
      type: "suite",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      price: 279,
      capacity: 6,
      size: "650 sq ft",
      rating: 4.7,
      reviews: 112,
      amenities: ["Free WiFi", "Air Conditioning", "2 Smart TVs", "Kitchenette", "Separate Living Area", "2 Bathrooms"],
      description: "Spacious suite ideal for families with separate living spaces",
      fullDescription: "Our Family Suite provides the perfect home away from home for families. With two separate bedrooms, two bathrooms, and a spacious living area, everyone has their own space. The kitchenette allows you to prepare simple meals, and the suite includes games and entertainment options for children. Connecting rooms are available upon request for larger families."
    },
    {
      id: 6,
      name: "Presidential Suite",
      type: "presidential",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      price: 499,
      capacity: 4,
      size: "1200 sq ft",
      rating: 5.0,
      reviews: 67,
      amenities: ["Free WiFi", "Air Conditioning", "Smart TV", "Private Bar", "Butler Service", "Panoramic View", "Jacuzzi", "Private Terrace"],
      description: "Ultimate luxury experience with exclusive amenities and services",
      fullDescription: "Experience unparalleled luxury in our Presidential Suite, the pinnacle of opulence. This expansive suite features a master bedroom with a king-size bed, separate dining area, private office, and a stunning private terrace with panoramic views. Enjoy 24/7 butler service, a fully equipped private bar, marble bathrooms with jacuzzi and rain shower, and exclusive access to our VIP lounge. Perfect for distinguished guests and special celebrations."
    }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = filters.priceRange === 'all' || 
                        (filters.priceRange === 'budget' && room.price < 150) ||
                        (filters.priceRange === 'mid' && room.price >= 150 && room.price < 250) ||
                        (filters.priceRange === 'luxury' && room.price >= 250);
    const matchesType = filters.roomType === 'all' || room.type === filters.roomType;
    const matchesCapacity = filters.capacity === 'all' || 
                           (filters.capacity === '2' && room.capacity <= 2) ||
                           (filters.capacity === '4' && room.capacity <= 4) ||
                           (filters.capacity === '6' && room.capacity >= 5);
    
    return matchesSearch && matchesPrice && matchesType && matchesCapacity;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600')"
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center z-10">
          <div className="text-white text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Rooms & Suites
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Find the perfect accommodation for your stay
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="flex items-center border-2 border-gray-300 rounded-lg p-3 hover:border-gray-900 focus-within:border-gray-900 transition-all duration-300">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search rooms..." 
                  className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg p-3 hover:border-gray-900 focus:border-gray-900 outline-none transition-all duration-300 cursor-pointer"
              >
                <option value="all">All Prices</option>
                <option value="budget">Budget (&lt; $150)</option>
                <option value="mid">Mid-Range ($150-$250)</option>
                <option value="luxury">Luxury ($250+)</option>
              </select>
            </div>

            <div>
              <select
                value={filters.capacity}
                onChange={(e) => handleFilterChange('capacity', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg p-3 hover:border-gray-900 focus:border-gray-900 outline-none transition-all duration-300 cursor-pointer"
              >
                <option value="all">All Capacities</option>
                <option value="2">Up to 2 Guests</option>
                <option value="4">Up to 4 Guests</option>
                <option value="6">5+ Guests</option>
              </select>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleFilterChange('roomType', 'all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filters.roomType === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Rooms
              </button>
              <button
                onClick={() => handleFilterChange('roomType', 'standard')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filters.roomType === 'standard'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => handleFilterChange('roomType', 'deluxe')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filters.roomType === 'deluxe'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Deluxe
              </button>
              <button
                onClick={() => handleFilterChange('roomType', 'executive')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filters.roomType === 'executive'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Executive
              </button>
              <button
                onClick={() => handleFilterChange('roomType', 'suite')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filters.roomType === 'suite'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Suite
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredRooms.length}</span> {filteredRooms.length === 1 ? 'room' : 'rooms'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room, index) => (
            <div 
              key={room.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                  ${room.price}/night
                </div>
                <div className="absolute top-4 left-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                  {room.type}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.name}</h3>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm text-gray-700 font-medium">{room.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({room.reviews})</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    <span>Up to {room.capacity}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{room.description}</p>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <HomeIcon className="h-4 w-4 mr-2" />
                  <span>{room.size}</span>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={() => openModal(room)}
                  className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-16">
            <AdjustmentsHorizontalIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setFilters({ priceRange: 'all', roomType: 'all', capacity: 'all' });
                setSearchQuery('');
              }}
              className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>

      {/* Enhanced User-Friendly Modal - Vertical Layout */}
{isModalOpen && selectedRoom && (
  <div 
    className="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    aria-describedby="modal-description"
  >
    {/* Enhanced Backdrop */}
    <div 
      className={`fixed inset-0 bg-black transition-opacity duration-500 ease-out ${
        isModalOpen ? 'bg-opacity-60' : 'bg-opacity-0'
      }`}
      onClick={closeModal}
      aria-hidden="true"
    ></div>

    {/* Modal Container - Vertical Centered */}
    <div className="flex min-h-screen items-center justify-center p-0 sm:p-4 py-8">
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 transform transition-all duration-500 ease-out ${
          isModalOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Fixed Position */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-30 bg-white hover:bg-gray-100 rounded-full p-2.5 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          aria-label="Close dialog"
        >
          <XMarkIcon className="h-6 w-6 text-gray-900" />
        </button>

        {/* Scrollable Vertical Content */}
        <div className="max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* Hero Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl bg-gray-900">
            <img 
              src={selectedRoom.image} 
              alt={selectedRoom.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* Type Badge */}
            <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {selectedRoom.type.toUpperCase()}
            </div>

            {/* Photo Counter */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium">
              📷 1 / 1 photos
            </div>
          </div>

          {/* Content Sections */}
          <div className="px-6 md:px-8 py-6 space-y-6">
            {/* Header Section */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 id="modal-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {selectedRoom.name}
                  </h2>
                  <div className="flex items-center gap-2 text-sm">
                    <StarIcon className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-900">{selectedRoom.rating}</span>
                    <span className="text-gray-500">({selectedRoom.reviews} reviews)</span>
                  </div>
                </div>
                {/* Price Display */}
                <div className="flex flex-col items-end bg-gray-50 px-4 py-3 rounded-xl border-2 border-gray-200">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">${selectedRoom.price}</span>
                    <span className="text-sm text-gray-600">/night</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Info Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg">
                  <UserGroupIcon className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">{selectedRoom.capacity} Guests</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 px-4 py-2 rounded-lg">
                  <HomeIcon className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-900">{selectedRoom.size}</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">About This Room</h3>
              <p id="modal-description" className="text-gray-600 leading-relaxed text-base">
                {selectedRoom.fullDescription}
              </p>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Amenities Grid */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedRoom.amenities.map((amenity, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100 hover:border-green-300 hover:bg-green-100 transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Policies */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Policies</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1 text-sm">Free Cancellation</h4>
                    <p className="text-xs text-blue-700">Cancel up to 24 hours before check-in for a full refund</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">
                    ⚡
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-1 text-sm">Instant Confirmation</h4>
                    <p className="text-xs text-purple-700">Your booking is confirmed immediately upon payment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Price Breakdown */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Price Breakdown</h3>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span className="text-sm">${selectedRoom.price} × 1 night</span>
                  <span className="text-sm font-medium">${selectedRoom.price}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="text-sm">Service fee</span>
                  <span className="text-sm font-medium">$15</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="text-sm">Taxes</span>
                  <span className="text-sm font-medium">$0</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">${selectedRoom.price + 15}</span>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4">
              <p className="text-xs text-center text-gray-600 leading-relaxed">
                💳 Secure Payment Processing • 🔒 SSL Encrypted Data Protection<br/>
                ⭐ Rated {selectedRoom.rating}/5 by {selectedRoom.reviews} Guests • ✅ Verified Property
              </p>
            </div>
          </div>

          {/* Action Buttons - Bottom */}
          <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 p-6 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={closeModal}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-900 py-4 px-6 rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                ← Continue Browsing
              </button>
              <button
                onClick={handleBookNow}
                className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-6 rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-[1.02] font-semibold text-base shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 flex items-center justify-center gap-2"
              >
                <span>Reserve This Room</span>
                <span className="text-xl">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}



      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Need Help Choosing?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our team is here to help you find the perfect room for your stay
          </p>
          <NavLink
            to="/contact"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Contact Us
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default RoomsPage;
