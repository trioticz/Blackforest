const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ContentBlock = sequelize.define('ContentBlock', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  block_key: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true
  },
  block_name: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: 'general'
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
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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
  tableName: 'ContentBlocks',
  timestamps: true,
  indexes: [
    { fields: ['block_key'] },
    { fields: ['category'] }
  ]
});

module.exports = ContentBlock;
