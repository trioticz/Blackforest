const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { connectDB } = require('./config/db');
const apiRoutes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MySQL
connectDB();

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false // Allows serving static uploads to frontend
}));

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://blackforest-sho9.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in development
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

// Request Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount API Routes
app.use('/api', apiRoutes);

// Serve client build in production if available
const clientDist = path.resolve(__dirname, '../../client/dist');
const fs = require('fs');

if (fs.existsSync(clientDist)) {
  // Serve static assets from client dist
  app.use(express.static(clientDist, {
    maxAge: '1y',
    immutable: true,
    index: false // do not automatically serve index.html for all subdirs
  }));

  // Frontend SPA Fallback: All page routes serve index.html
  app.get('*', (req, res, next) => {
    // 1. Never serve index.html for API or uploads routes
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }

    // 2. Never serve index.html for missing static assets (images, css, js, fonts)
    // to avoid MIME-type mismatch errors in the browser
    const isStaticAsset = /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?|ttf|eot|webp|avif|mp4|webm|json)$/i.test(req.path);
    if (isStaticAsset) {
      return res.status(404).send('Not found');
    }

    // 3. Serve SPA index.html for all client-side routes (/about, /contact, /destinations/*, etc.)
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  // Root Welcome Route fallback
  app.get('/', (req, res) => {
    res.json({
      name: 'Blackforest Holidays API Server',
      status: 'Running',
      version: '1.0.0',
      documentation: '/api/health'
    });
  });
}

// 404 and Error Middleware
app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`🚀 Blackforest Holidays Server running on port ${PORT}`);
  console.log(`📡 API Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = { app, server };
