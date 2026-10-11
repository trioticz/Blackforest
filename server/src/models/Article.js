const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  excerpt: {
    type: DataTypes.STRING(1000),
    defaultValue: ''
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  coverImage: {
    type: DataTypes.TEXT('long'),
    defaultValue: ''
  },
  detailImage1: {
    type: DataTypes.TEXT('long'),
    defaultValue: ''
  },
  detailImage2: {
    type: DataTypes.TEXT('long'),
    defaultValue: ''
  },
  quote: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  quoteAuthor: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Travel Guides'
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  publishedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.ENUM('published', 'draft'),
    defaultValue: 'published'
  },
  seoTitle: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  seoDescription: {
    type: DataTypes.STRING(1000),
    defaultValue: ''
  },
  seoKeywords: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
}, {
  timestamps: true,
  indexes: [
    { unique: true, fields: ['slug'] },
    { fields: ['status'] },
    { fields: ['featured'] },
    { fields: ['category'] }
  ]
});

module.exports = Article;
