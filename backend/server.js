require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ============================================
// INITIALIZE EXPRESS APP
// ============================================
const app = express();

// ============================================
// MIDDLEWARE
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// ============================================
// MONGODB CONNECTION
// ============================================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// ============================================
// MONGOOSE SCHEMAS & MODELS
// ============================================

// Contact Schema
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        'Please provide a valid phone number'
      ]
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      enum: ['reservation', 'feedback', 'complaint', 'events', 'other'],
      default: 'other'
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    status: {
      type: String,
      enum: ['new', 'read', 'responded', 'archived'],
      default: 'new'
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      select: false
    }
  },
  {
    timestamps: true
  }
);

// Contact Indexes
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ email: 1 });

// Room Schema
const roomSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: [true, 'Room name is required'],
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ['standard', 'deluxe', 'executive', 'premium']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    image: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, 'Capacity must be at least 1']
    },
    size: {
      type: String,
      required: true
    },
    amenities: [{
      type: String
    }],
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Booking Schema
const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true
    },
    // Room Details
    roomType: {
      type: String,
      required: [true, 'Room type is required'],
      enum: ['standard', 'deluxe', 'executive', 'premium']
    },
    roomName: {
      type: String,
      required: true
    },
    roomPrice: {
      type: Number,
      required: true
    },
    
    // Booking Dates
    checkIn: {
      type: Date,
      required: [true, 'Check-in date is required']
    },
    checkOut: {
      type: Date,
      required: [true, 'Check-out date is required'],
      validate: {
        validator: function(value) {
          return value > this.checkIn;
        },
        message: 'Check-out date must be after check-in date'
      }
    },
    nights: {
      type: Number,
      required: true,
      min: [1, 'At least one night is required']
    },
    
    // Guest Information
    adults: {
      type: Number,
      required: [true, 'Number of adults is required'],
      min: [1, 'At least one adult is required'],
      max: [10, 'Maximum 10 adults allowed']
    },
    children: {
      type: Number,
      default: 0,
      min: [0, 'Children cannot be negative'],
      max: [5, 'Maximum 5 children allowed']
    },
    
    // Guest Details
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        'Please provide a valid phone number'
      ]
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true
    },
    specialRequests: {
      type: String,
      trim: true,
      maxlength: [500, 'Special requests cannot exceed 500 characters']
    },
    
    // Payment Information
    cardName: {
      type: String,
      required: [true, 'Cardholder name is required'],
      trim: true
    },
    cardNumberLast4: {
      type: String,
      required: true,
      length: [4, 'Card last 4 digits must be exactly 4 characters']
    },
    
    // Pricing
    roomTotal: {
      type: Number,
      required: true
    },
    serviceFee: {
      type: Number,
      default: 15
    },
    tax: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true
    },
    
    // Booking Status
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'confirmed'
    },
    
    // Additional Info
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Booking Indexes
bookingSchema.index({ bookingNumber: 1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ checkIn: 1, checkOut: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: -1 });

// Generate unique booking number
bookingSchema.pre('save', function(next) {
  if (!this.bookingNumber) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    this.bookingNumber = `BK${timestamp}${random}`;
  }
  next();
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Models
const Contact = mongoose.model('Contact', contactSchema);
const Room = mongoose.model('Room', roomSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const User = mongoose.model('User', userSchema);

// ============================================
// VALIDATION MIDDLEWARE
// ============================================

// Contact Form Validation
const contactValidationRules = () => {
  return [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('Name can only contain letters and spaces'),
    
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    
    body('phone')
      .optional()
      .trim()
      .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
      .withMessage('Please provide a valid phone number'),
    
    body('subject')
      .notEmpty()
      .withMessage('Subject is required')
      .isIn(['reservation', 'feedback', 'complaint', 'events', 'other'])
      .withMessage('Invalid subject selected'),
    
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ min: 10, max: 1000 })
      .withMessage('Message must be between 10 and 1000 characters')
  ];
};

// Booking Validation
const bookingValidationRules = () => {
  return [
    body('roomType')
      .notEmpty()
      .withMessage('Room type is required')
      .isIn(['standard', 'deluxe', 'executive', 'premium'])
      .withMessage('Invalid room type'),
    
    body('checkIn')
      .notEmpty()
      .withMessage('Check-in date is required')
      .isISO8601()
      .withMessage('Invalid check-in date format')
      .custom((value) => {
        const checkIn = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (checkIn < today) {
          throw new Error('Check-in date cannot be in the past');
        }
        return true;
      }),
    
    body('checkOut')
      .notEmpty()
      .withMessage('Check-out date is required')
      .isISO8601()
      .withMessage('Invalid check-out date format')
      .custom((value, { req }) => {
        const checkOut = new Date(value);
        const checkIn = new Date(req.body.checkIn);
        if (checkOut <= checkIn) {
          throw new Error('Check-out date must be after check-in date');
        }
        return true;
      }),
    
    body('adults')
      .isInt({ min: 1, max: 10 })
      .withMessage('Number of adults must be between 1 and 10'),
    
    body('children')
      .optional()
      .isInt({ min: 0, max: 5 })
      .withMessage('Number of children must be between 0 and 5'),
    
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('First name must be between 2 and 50 characters')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('First name can only contain letters and spaces'),
    
    body('lastName')
      .trim()
      .notEmpty()
      .withMessage('Last name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Last name must be between 2 and 50 characters')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('Last name can only contain letters and spaces'),
    
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    
    body('phone')
      .trim()
      .notEmpty()
      .withMessage('Phone number is required')
      .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
      .withMessage('Please provide a valid phone number'),
    
    body('country')
      .trim()
      .notEmpty()
      .withMessage('Country is required'),
    
    body('specialRequests')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Special requests cannot exceed 500 characters'),
    
    body('cardName')
      .trim()
      .notEmpty()
      .withMessage('Cardholder name is required'),
    
    body('cardNumber')
      .trim()
      .notEmpty()
      .withMessage('Card number is required')
      .matches(/^[0-9\s]{13,19}$/)
      .withMessage('Please provide a valid card number'),
    
    body('expiryDate')
      .trim()
      .notEmpty()
      .withMessage('Expiry date is required')
      .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)
      .withMessage('Expiry date must be in MM/YY format'),
    
    body('cvv')
      .trim()
      .notEmpty()
      .withMessage('CVV is required')
      .matches(/^[0-9]{3,4}$/)
      .withMessage('CVV must be 3 or 4 digits'),
    
    body('agreeTerms')
      .isBoolean()
      .custom((value) => value === true)
      .withMessage('You must agree to the terms and conditions')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

const signupValidation = () => {
  return [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain uppercase, lowercase, and number'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
  ];
};

const loginValidation = () => {
  return [
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ];
};

// ============================================
// HELPER FUNCTIONS
// ============================================

// Calculate nights between two dates
const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 0;
};

// Calculate total pricing
const calculatePricing = (roomPrice, nights) => {
  const roomTotal = roomPrice * nights;
  const serviceFee = 15;
  const tax = 0;
  const totalAmount = roomTotal + serviceFee + tax;
  
  return {
    roomTotal,
    serviceFee,
    tax,
    totalAmount
  };
};

// Get last 4 digits of card
const getCardLast4 = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  return cleaned.slice(-4);
};

// ============================================
// ROUTES
// ============================================

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// CONTACT FORM ROUTES
// ============================================

// Submit contact form (PUBLIC)
app.post('/api/contact', contactValidationRules(), validate, async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      ipAddress,
      userAgent
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all contacts with pagination (ADMIN)
app.get('/api/contact', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;

    const query = status ? { status } : {};

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('-userAgent -ipAddress');

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: contacts
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get contact statistics (ADMIN)
app.get('/api/contact/stats', async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const subjectStats = await Contact.aggregate([
      {
        $group: {
          _id: '$subject',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalContacts = await Contact.countDocuments();
    const todayContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });

    res.status(200).json({
      success: true,
      data: {
        total: totalContacts,
        today: todayContacts,
        byStatus: stats,
        bySubject: subjectStats
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get single contact by ID (ADMIN)
app.get('/api/contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }

    res.status(200).json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update contact status (ADMIN)
app.patch('/api/contact/:id', async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete contact (ADMIN)
app.delete('/api/contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ============================================
// ROOM ROUTES
// ============================================

// Get all rooms (PUBLIC)
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true }).sort({ price: 1 });
    
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve rooms',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get single room by ID (PUBLIC)
app.get('/api/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findOne({ id: req.params.id });
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve room',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Check room availability (PUBLIC)
app.post('/api/rooms/check-availability', async (req, res) => {
  try {
    const { roomType, checkIn, checkOut } = req.body;
    
    const overlappingBookings = await Booking.find({
      roomType,
      status: { $in: ['confirmed', 'pending'] },
      $or: [
        {
          checkIn: { $lte: new Date(checkIn) },
          checkOut: { $gt: new Date(checkIn) }
        },
        {
          checkIn: { $lt: new Date(checkOut) },
          checkOut: { $gte: new Date(checkOut) }
        },
        {
          checkIn: { $gte: new Date(checkIn) },
          checkOut: { $lte: new Date(checkOut) }
        }
      ]
    });
    
    const isAvailable = overlappingBookings.length === 0;
    
    res.status(200).json({
      success: true,
      available: isAvailable,
      message: isAvailable 
        ? 'Room is available for selected dates' 
        : 'Room is not available for selected dates'
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check availability',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ============================================
// BOOKING ROUTES
// ============================================

// Create a new booking (PUBLIC)
app.post('/api/bookings', bookingValidationRules(), validate, async (req, res) => {
  try {
    const {
      roomType,
      checkIn,
      checkOut,
      adults,
      children,
      firstName,
      lastName,
      email,
      phone,
      country,
      specialRequests,
      cardName,
      cardNumber
    } = req.body;
    
    const room = await Room.findOne({ type: roomType, isAvailable: true });
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Selected room is not available'
      });
    }
    
    // Check availability
    const overlappingBookings = await Booking.find({
      roomType,
      status: { $in: ['confirmed', 'pending'] },
      $or: [
        {
          checkIn: { $lte: new Date(checkIn) },
          checkOut: { $gt: new Date(checkIn) }
        },
        {
          checkIn: { $lt: new Date(checkOut) },
          checkOut: { $gte: new Date(checkOut) }
        },
        {
          checkIn: { $gte: new Date(checkIn) },
          checkOut: { $lte: new Date(checkOut) }
        }
      ]
    });
    
    if (overlappingBookings.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Room is not available for the selected dates'
      });
    }
    
    const nights = calculateNights(checkIn, checkOut);
    const pricing = calculatePricing(room.price, nights);
    
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');
    
    const booking = await Booking.create({
      roomType,
      roomName: room.name,
      roomPrice: room.price,
      checkIn,
      checkOut,
      nights,
      adults,
      children: children || 0,
      firstName,
      lastName,
      email,
      phone,
      country,
      specialRequests: specialRequests || '',
      cardName,
      cardNumberLast4: getCardLast4(cardNumber),
      ...pricing,
      ipAddress,
      userAgent
    });
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        bookingNumber: booking.bookingNumber,
        roomName: booking.roomName,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        nights: booking.nights,
        totalAmount: booking.totalAmount,
        status: booking.status,
        guestName: `${booking.firstName} ${booking.lastName}`,
        email: booking.email
      }
    });
    
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get booking by booking number (PUBLIC)
app.get('/api/bookings/:bookingNumber', async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      bookingNumber: req.params.bookingNumber.toUpperCase() 
    }).select('-cardName -cardNumberLast4 -ipAddress -userAgent');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get bookings by email (PUBLIC)
app.get('/api/bookings/user/:email', async (req, res) => {
  try {
    const bookings = await Booking.find({ 
      email: req.params.email.toLowerCase() 
    })
    .select('-cardName -cardNumberLast4 -ipAddress -userAgent')
    .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Cancel booking (PUBLIC)
app.patch('/api/bookings/:bookingNumber/cancel', async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      bookingNumber: req.params.bookingNumber.toUpperCase() 
    });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }
    
    // Check if cancellation is allowed (24 hours before check-in)
    const now = new Date();
    const checkInDate = new Date(booking.checkIn);
    const hoursDifference = (checkInDate - now) / (1000 * 60 * 60);
    
    if (hoursDifference < 24) {
      return res.status(400).json({
        success: false,
        message: 'Cancellation is only allowed up to 24 hours before check-in'
      });
    }
    
    booking.status = 'cancelled';
    await booking.save();
    
    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: {
        bookingNumber: booking.bookingNumber,
        status: booking.status
      }
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all bookings (ADMIN)
app.get('/api/admin/bookings', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    
    const query = status ? { status } : {};
    
    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('-cardName -cardNumberLast4 -ipAddress -userAgent');
    
    const total = await Booking.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: bookings
    });
  } catch (error) {
    console.error('Get admin bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get booking statistics (ADMIN)
app.get('/api/admin/bookings/stats', async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });
    
    const todayBookings = await Booking.countDocuments({
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });
    
    const totalRevenue = await Booking.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    
    const bookingsByRoom = await Booking.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: '$roomType', count: { $sum: 1 } } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        total: totalBookings,
        confirmed: confirmedBookings,
        cancelled: cancelledBookings,
        today: todayBookings,
        revenue: totalRevenue[0]?.total || 0,
        byRoomType: bookingsByRoom
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Seed rooms (Run once to populate database)
app.post('/api/admin/seed-rooms', async (req, res) => {
  try {
    const roomsData = [
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
    
    await Room.deleteMany({});
    const rooms = await Room.insertMany(roomsData);
    
    res.status(201).json({
      success: true,
      message: 'Rooms seeded successfully',
      count: rooms.length,
      data: rooms
    });
  } catch (error) {
    console.error('Seed rooms error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to seed rooms',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Signup
app.post('/api/auth/signup', signupValidation(), validate, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        },
        token
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create account'
    });
  }
});

// Login
app.post('/api/auth/login', loginValidation(), validate, async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Find user with password
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const tokenExpiry = rememberMe ? '30d' : '7d';
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: tokenExpiry }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// Get current user
app.get('/api/auth/me', protect, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        phone: req.user.phone
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get user'
    });
  }
});

// Logout (client-side token removal)
app.post('/api/auth/logout', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

// ============================================
// 404 HANDLER
// ============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ============================================
// ERROR HANDLER
// ============================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : undefined
  });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});
