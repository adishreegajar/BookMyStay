import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const ContactPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general submit error
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but if provided must be valid)
    if (formData.phone.trim() && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Subject validation
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message cannot exceed 1000 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    setSubmitError('');

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success
        setIsSubmitted(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
          setIsSubmitted(false);
        }, 5000);
      } else {
        // Handle validation errors from backend
        if (data.errors && Array.isArray(data.errors)) {
          const backendErrors = {};
          data.errors.forEach(err => {
            backendErrors[err.field] = err.message;
          });
          setErrors(backendErrors);
        } else {
          setSubmitError(data.message || 'Failed to send message. Please try again.');
        }
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
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

  const contactInfo = [
    {
      icon: MapPinIcon,
      title: "Visit Us",
      details: ["123 Luxury Avenue, Downtown", "Mumbai, Maharashtra 400001", "India"],
      color: "blue"
    },
    {
      icon: PhoneIcon,
      title: "Call Us",
      details: ["+91 22 1234 5678", "+91 98765 43210", "Toll Free: 1800 123 4567"],
      color: "green"
    },
    {
      icon: EnvelopeIcon,
      title: "Email Us",
      details: ["info@bookmystay.com", "reservations@bookmystay.com", "support@bookmystay.com"],
      color: "purple"
    },
    {
      icon: ClockIcon,
      title: "Working Hours",
      details: ["Front Desk: 24/7", "Restaurant: 7 AM - 11 PM", "Spa: 9 AM - 9 PM"],
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[350px] bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600')"
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center z-10 text-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              We're here to help and answer any questions you might have
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-${info.color}-100 rounded-full mb-4`}>
                  <Icon className={`h-7 w-7 text-${info.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <ChatBubbleBottomCenterTextIcon className="h-8 w-8 text-gray-900" />
              <h2 className="text-3xl font-bold text-gray-900">Send Us a Message</h2>
            </div>
            
            {isSubmitted ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center animate-fadeIn">
                <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-900 mb-2">Message Sent!</h3>
                <p className="text-green-700">Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            ) : (
              <>
                {/* General Error Message */}
                {submitError && (
                  <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <ExclamationCircleIcon className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-red-900 font-semibold mb-1">Error</h4>
                      <p className="text-red-700 text-sm">{submitError}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-600' 
                          : 'border-gray-300 focus:border-gray-900'
                      }`}
                      placeholder="John Doe"
                      disabled={isLoading}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <ExclamationCircleIcon className="h-4 w-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                          errors.email 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-gray-300 focus:border-gray-900'
                        }`}
                        placeholder="john@example.com"
                        disabled={isLoading}
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <ExclamationCircleIcon className="h-4 w-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                          errors.phone 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-gray-300 focus:border-gray-900'
                        }`}
                        placeholder="+91 98765 43210"
                        disabled={isLoading}
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <ExclamationCircleIcon className="h-4 w-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 cursor-pointer ${
                        errors.subject 
                          ? 'border-red-500 focus:border-red-600' 
                          : 'border-gray-300 focus:border-gray-900'
                      }`}
                      disabled={isLoading}
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Reservation Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="complaint">Complaint</option>
                      <option value="events">Events & Catering</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <ExclamationCircleIcon className="h-4 w-4" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message * <span className="text-gray-500 font-normal">({formData.message.length}/1000)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="6"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 resize-none ${
                        errors.message 
                          ? 'border-red-500 focus:border-red-600' 
                          : 'border-gray-300 focus:border-gray-900'
                      }`}
                      placeholder="Tell us how we can help you..."
                      disabled={isLoading}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <ExclamationCircleIcon className="h-4 w-4" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 px-6 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gray-900 text-white hover:bg-gray-800 transform hover:scale-105 hover:shadow-xl'
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Map & Additional Info */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.082177513320454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1730209000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Location"
              ></iframe>
            </div>

            {/* FAQ Section */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Answers</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">What's your cancellation policy?</h4>
                  <p className="text-sm text-gray-600">Free cancellation up to 24 hours before check-in.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Do you offer airport shuttle?</h4>
                  <p className="text-sm text-gray-600">Yes, complimentary shuttle service is available 24/7.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Is WiFi available?</h4>
                  <p className="text-sm text-gray-600">Free high-speed WiFi throughout the property.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Do you have parking?</h4>
                  <p className="text-sm text-gray-600">Secure valet parking and garage facilities available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="bg-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Emergency Assistance</h3>
          <p className="text-red-100 mb-4">Available 24/7 for urgent matters</p>
          <a href="tel:+919876543210" className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300">
            <PhoneIcon className="h-5 w-5" />
            Call Now: +91 98765 43210
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
