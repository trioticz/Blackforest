const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Media = sequelize.define('Media', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  data: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  alt: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  width: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  height: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  size: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  mimeType: {
    type: DataTypes.STRING,
    defaultValue: 'image/jpeg'
  },
  uploadedById: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['createdAt'] }
  ]
});

module.exports = Media;
