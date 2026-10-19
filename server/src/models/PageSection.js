const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PageSection = sequelize.define('PageSection', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  page_slug: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: 'home'
  },
  section_key: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true
  },
  section_name: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  order_index: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_visible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  content: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {}
  },
  draft_content: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null
  },
  original_content: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null
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
  tableName: 'PageSections',
  timestamps: true,
  indexes: [
    { fields: ['page_slug'] },
    { fields: ['section_key'] },
    { fields: ['order_index'] }
  ]
});

module.exports = PageSection;
