const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const destinationRoutes = require('./destinationRoutes');
const tourRoutes = require('./tourRoutes');
const experienceRoutes = require('./experienceRoutes');
const serviceRoutes = require('./serviceRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const articleRoutes = require('./articleRoutes');
const expertiseRoutes = require('./expertiseRoutes');
const enquiryRoutes = require('./enquiryRoutes');
const mediaRoutes = require('./mediaRoutes');
const settingsRoutes = require('./settingsRoutes');
const navigationRoutes = require('./navigationRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const searchRoutes = require('./searchRoutes');
const websiteImageRoutes = require('./websiteImageRoutes');

// API Health Check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date(),
    service: 'Blackforest Holidays API (MySQL)'
  });
});

router.use('/auth', authRoutes);
router.use('/destinations', destinationRoutes);
router.use('/tours', tourRoutes);
router.use('/experiences', experienceRoutes);
router.use('/services', serviceRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/articles', articleRoutes);
router.use('/expertise', expertiseRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/media', mediaRoutes);
router.use('/settings', settingsRoutes);
router.use('/navigation', navigationRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/search', searchRoutes);
router.use('/website-images', websiteImageRoutes);

module.exports = router;

