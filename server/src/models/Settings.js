const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Settings = sequelize.define('Settings', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  siteName: {
    type: DataTypes.STRING,
    defaultValue: 'Black Forest Holidays'
  },
  logo: {
    type: DataTypes.STRING(1000),
    defaultValue: 'https://blackforestholidays.com/wp-content/uploads/2021/07/white_logo.png'
  },
  darkLogo: {
    type: DataTypes.STRING(1000),
    defaultValue: '/assets/images/white_logo.png'
  },
  favicon: {
    type: DataTypes.STRING(1000),
    defaultValue: '/assets/images/cropped-cropped-Logo-02-1-1-32x32.png'
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: '+91 94470 12345'
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: 'info@blackforestholidays.com'
  },
  whatsapp: {
    type: DataTypes.STRING,
    defaultValue: '+919447012345'
  },
  address: {
    type: DataTypes.STRING(500),
    defaultValue: 'Black Forest Holidays, Premium Travel Lounge, Cochin, Kerala, India'
  },
  socialLinks: {
    type: DataTypes.JSON,
    defaultValue: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  footerText: {
    type: DataTypes.STRING(2000),
    defaultValue: 'Black Forest Holidays is a premier destination management and experiential luxury tour operator offering bespoke journeys across the globe and India.'
  },
  copyright: {
    type: DataTypes.STRING,
    defaultValue: '© 2026 Black Forest Holidays. All Rights Reserved.'
  },
  googleMapsUrl: {
    type: DataTypes.STRING(2000),
    defaultValue: 'https://maps.google.com'
  },
  analyticsId: {
    type: DataTypes.STRING,
    defaultValue: 'G-HVE7N8BQ63'
  },
  facebookPixelId: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  defaultSeoTitle: {
    type: DataTypes.STRING,
    defaultValue: 'Black Forest Holidays – Luxury Travel Packages, Honeymoon & International Tours'
  },
  defaultSeoDescription: {
    type: DataTypes.STRING(2000),
    defaultValue: 'Discover unforgettable bespoke travel experiences, custom international tours, Kerala backwaters, and luxury holiday packages with Black Forest Holidays.'
  }
}, {
  timestamps: true
});

module.exports = Settings;
