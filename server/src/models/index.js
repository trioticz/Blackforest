const { sequelize } = require('../config/db');
const User = require('./User');
const Destination = require('./Destination');
const TourPackage = require('./TourPackage');
const Experience = require('./Experience');
const Service = require('./Service');
const Testimonial = require('./Testimonial');
const Article = require('./Article');
const Expertise = require('./Expertise');
const Enquiry = require('./Enquiry');
const Settings = require('./Settings');
const Navigation = require('./Navigation');
const Media = require('./Media');
const AuditLog = require('./AuditLog');
const WebsiteImage = require('./WebsiteImage');

// Define Relationships
TourPackage.belongsTo(Destination, { foreignKey: 'destinationId', as: 'destination' });
Destination.hasMany(TourPackage, { foreignKey: 'destinationId', as: 'packages' });

Article.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(Article, { foreignKey: 'authorId', as: 'articles' });

Enquiry.belongsTo(User, { foreignKey: 'assignedToId', as: 'assignee' });
User.hasMany(Enquiry, { foreignKey: 'assignedToId', as: 'assignedEnquiries' });

AuditLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Media.belongsTo(User, { foreignKey: 'uploadedById', as: 'uploader' });

module.exports = {
  sequelize,
  User,
  Destination,
  TourPackage,
  Experience,
  Service,
  Testimonial,
  Article,
  Expertise,
  Enquiry,
  Settings,
  Navigation,
  Media,
  AuditLog,
  WebsiteImage
};

