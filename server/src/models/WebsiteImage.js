const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const WebsiteImage = sequelize.define('WebsiteImage', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  image_key: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true
  },
  image_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: 'Homepage'
  },
  page_name: {
    type: DataTypes.STRING(128),
    allowNull: false,
    defaultValue: 'Home'
  },
  section_name: {
    type: DataTypes.STRING(128),
    allowNull: false,
    defaultValue: 'General'
  },
  image_url: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  draft_image_url: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  original_image_url: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  alt_text: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  dimensions: {
    type: DataTypes.STRING(64),
    allowNull: true,
    defaultValue: 'Responsive'
  },
  aspect_ratio: {
    type: DataTypes.STRING(32),
    allowNull: true,
    defaultValue: '16:9'
  },
  publication_status: {
    type: DataTypes.ENUM('published', 'draft'),
    allowNull: false,
    defaultValue: 'published'
  },
  updated_by: {
    type: DataTypes.STRING(128),
    allowNull: true,
    defaultValue: 'Admin'
  },
  version_history: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  }
}, {
  tableName: 'WebsiteImages',
  timestamps: true
});

module.exports = WebsiteImage;
