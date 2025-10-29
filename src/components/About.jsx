import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon,
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  TrophyIcon,
  GlobeAltIcon,
  BuildingOffice2Icon,
  StarIcon
} from '@heroicons/react/24/outline';

const AboutPage = () => {
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

  const values = [
    {
      icon: HeartIcon,
      title: "Guest Satisfaction",
      description: "We prioritize your comfort and happiness above everything else, ensuring every stay exceeds expectations.",
      color: "red"
    },
    {
      icon: SparklesIcon,
      title: "Excellence",
      description: "Committed to delivering the highest quality service and maintaining impeccable standards in everything we do.",
      color: "yellow"
    },
    {
      icon: ShieldCheckIcon,
      title: "Trust & Safety",
      description: "Your security and privacy are paramount. We maintain strict safety protocols and secure environments.",
      color: "green"
    },
    {
      icon: GlobeAltIcon,
      title: "Sustainability",
      description: "Dedicated to eco-friendly practices and reducing our environmental footprint for a better tomorrow.",
      color: "blue"
    }
  ];

  const stats = [
    { number: "15+", label: "Years of Excellence" },
    { number: "50K+", label: "Happy Guests" },
    { number: "250+", label: "Luxury Rooms" },
    { number: "4.9", label: "Average Rating" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "General Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      bio: "15+ years of hospitality leadership experience"
    },
    {
      name: "Michael Chen",
      role: "Head Chef",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      bio: "Award-winning culinary expertise"
    },
    {
      name: "Emily Rodriguez",
      role: "Guest Relations Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      bio: "Passionate about creating memorable experiences"
    },
    {
      name: "David Kumar",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      bio: "Expert in hospitality operations"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600')"
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center z-10 text-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About BookMyStay
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Crafting unforgettable experiences through exceptional hospitality since 2010
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Founded in 2010, BookMyStay began with a simple vision: to create a home away from home for travelers seeking comfort, luxury, and personalized service. What started as a boutique hotel with 50 rooms has grown into a premier hospitality destination with over 250 luxury accommodations.
              </p>
              <p>
                Our journey has been guided by an unwavering commitment to excellence and a deep understanding that every guest deserves not just a place to stay, but an experience to remember. We've continuously evolved, incorporating cutting-edge amenities while maintaining the warm, personal touch that has become our hallmark.
              </p>
              <p>
                Today, we're proud to be recognized as one of the leading hotels in the region, consistently earning top ratings from our guests and industry accolades for our service, design, and sustainability initiatives.
              </p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800" 
              alt="Hotel Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${value.color}-100 rounded-full mb-6`}>
                  <Icon className={`h-8 w-8 text-${value.color}-600`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>


      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Experience the Difference</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied guests who have made BookMyStay their preferred choice
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/rooms"
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Explore Our Rooms
            </NavLink>
            <NavLink
              to="/contact"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
