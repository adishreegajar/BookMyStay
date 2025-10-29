import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon,
  WifiIcon,
  TvIcon,
  FireIcon,
  HomeModernIcon,
  SparklesIcon,
  ShieldCheckIcon,
  TruckIcon,
  ClockIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  BuildingOffice2Icon,
  CakeIcon,
  UsersIcon,
  MapIcon,
  PhoneIcon,
  GlobeAltIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

const ServicesPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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

  const services = [
    {
      id: 1,
      category: "Room Amenities",
      icon: HomeModernIcon,
      color: "blue",
      items: [
        { name: "Free High-Speed WiFi", icon: WifiIcon, description: "Complimentary wireless internet throughout the property" },
        { name: "Smart TV & Streaming", icon: TvIcon, description: "55-inch smart TV with Netflix, Amazon Prime, and more" },
        { name: "Climate Control", icon: FireIcon, description: "Individual temperature control in every room" },
        { name: "Premium Bedding", icon: SparklesIcon, description: "Luxury linens and pillow menu for ultimate comfort" }
      ]
    },
    {
      id: 2,
      category: "Guest Services",
      icon: UsersIcon,
      color: "purple",
      items: [
        { name: "24/7 Concierge", icon: ChatBubbleBottomCenterTextIcon, description: "Round-the-clock assistance for all your needs" },
        { name: "Room Service", icon: ClockIcon, description: "In-room dining available 24 hours a day" },
        { name: "Laundry Service", icon: SparklesIcon, description: "Same-day laundry and dry cleaning services" },
        { name: "Airport Shuttle", icon: TruckIcon, description: "Complimentary shuttle service to and from airport" }
      ]
    },
    {
      id: 3,
      category: "Wellness & Recreation",
      icon: HeartIcon,
      color: "green",
      items: [
        { name: "Fitness Center", icon: HeartIcon, description: "State-of-the-art gym equipment available 24/7" },
        { name: "Swimming Pool", icon: SparklesIcon, description: "Heated outdoor pool with poolside bar service" },
        { name: "Spa & Massage", icon: SparklesIcon, description: "Full-service spa with massage and beauty treatments" },
        { name: "Yoga Classes", icon: UsersIcon, description: "Complimentary morning yoga sessions" }
      ]
    },
    {
      id: 4,
      category: "Business Services",
      icon: BuildingOffice2Icon,
      color: "orange",
      items: [
        { name: "Business Center", icon: BuildingOffice2Icon, description: "Computers, printers, and office supplies available" },
        { name: "Meeting Rooms", icon: UsersIcon, description: "Fully equipped conference rooms with AV equipment" },
        { name: "High-Speed Printing", icon: BuildingOffice2Icon, description: "Professional printing and scanning services" },
        { name: "Video Conferencing", icon: GlobeAltIcon, description: "Advanced video conferencing facilities" }
      ]
    },
    {
      id: 5,
      category: "Dining & Events",
      icon: CakeIcon,
      color: "red",
      items: [
        { name: "Restaurant & Bar", icon: CakeIcon, description: "Fine dining restaurant and rooftop bar" },
        { name: "Breakfast Buffet", icon: CakeIcon, description: "Complimentary breakfast with local and international cuisine" },
        { name: "Event Planning", icon: UsersIcon, description: "Professional event planning for weddings and conferences" },
        { name: "Private Dining", icon: CakeIcon, description: "Exclusive private dining experiences" }
      ]
    },
    {
      id: 6,
      category: "Additional Services",
      icon: ShieldCheckIcon,
      color: "gray",
      items: [
        { name: "Secure Parking", icon: ShieldCheckIcon, description: "Valet parking and secure garage facilities" },
        { name: "Travel Assistance", icon: MapIcon, description: "Local tour bookings and travel arrangements" },
        { name: "Currency Exchange", icon: CreditCardIcon, description: "Foreign currency exchange at reception" },
        { name: "Multilingual Staff", icon: GlobeAltIcon, description: "Staff fluent in multiple languages" }
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-900',
        icon: 'text-blue-600',
        hover: 'hover:bg-blue-100'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-900',
        icon: 'text-purple-600',
        hover: 'hover:bg-purple-100'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-900',
        icon: 'text-green-600',
        hover: 'hover:bg-green-100'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-900',
        icon: 'text-orange-600',
        hover: 'hover:bg-orange-100'
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-900',
        icon: 'text-red-600',
        hover: 'hover:bg-red-100'
      },
      gray: {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-900',
        icon: 'text-gray-600',
        hover: 'hover:bg-gray-100'
      }
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600')"
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center z-10 text-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Our Services & Amenities
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 max-w-3xl">
              Experience exceptional hospitality with our comprehensive range of services designed for your comfort and convenience
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {services.map((service, index) => {
            const colors = getColorClasses(service.color);
            const CategoryIcon = service.icon;
            
            return (
              <div 
                key={service.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`${colors.bg} ${colors.border} border-2 p-3 rounded-xl`}>
                    <CategoryIcon className={`h-8 w-8 ${colors.icon}`} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{service.category}</h2>
                </div>

                {/* Service Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.items.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={idx}
                        className={`${colors.bg} ${colors.border} border rounded-xl p-6 ${colors.hover} transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`flex-shrink-0 ${colors.bg} p-3 rounded-lg`}>
                            <ItemIcon className={`h-6 w-6 ${colors.icon}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-lg font-semibold ${colors.text} mb-2`}>
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose BookMyStay?</h2>
            <p className="text-lg text-gray-300">Experience world-class hospitality with our exceptional features</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <ClockIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-400 text-sm">Round-the-clock assistance whenever you need it</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Safe</h3>
              <p className="text-gray-400 text-sm">Your safety and security is our top priority</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <SparklesIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-400 text-sm">Highest standards of service and comfort</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <HeartIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Guest Satisfaction</h3>
              <p className="text-gray-400 text-sm">Committed to exceeding your expectations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
