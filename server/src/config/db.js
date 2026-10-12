const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const socketPath = process.env.DB_SOCKET;
const socketExists = Boolean(socketPath && fs.existsSync(socketPath));

const dialectOptions = {};
if (socketExists) {
  dialectOptions.socketPath = socketPath;
}

const sequelize = new Sequelize(
  process.env.DB_NAME || 'blackforest',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root123',
  {
    dialect: 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialectOptions,
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ MySQL connected successfully via ${socketExists ? 'Socket (' + socketPath + ')' : 'TCP (' + (process.env.DB_HOST || '127.0.0.1') + ':' + (process.env.DB_PORT || '3306') + ')'}`);
    await sequelize.sync({ alter: false });
    console.log('✅ MySQL models synchronized');

    // Ensure WebsiteImages table exists and seed default images
    try {
      const WebsiteImage = require('../models/WebsiteImage');
      await WebsiteImage.sync();
      const { seedWebsiteImages } = require('../seeds/websiteImagesSeed');
      await seedWebsiteImages();
    } catch (tblErr) {
      console.warn('WebsiteImages table sync/seed warning:', tblErr.message);
    }

    // Safe inline migrations to ensure new media & article columns exist in MySQL
    try {
      await sequelize.query('ALTER TABLE `Media` ADD COLUMN `data` LONGTEXT NULL').catch(() => {});
      await sequelize.query('ALTER TABLE `Articles` ADD COLUMN `detailImage1` LONGTEXT NULL').catch(() => {});
      await sequelize.query('ALTER TABLE `Articles` ADD COLUMN `detailImage2` LONGTEXT NULL').catch(() => {});
      await sequelize.query('ALTER TABLE `Articles` ADD COLUMN `quote` TEXT NULL').catch(() => {});
      await sequelize.query('ALTER TABLE `Articles` ADD COLUMN `quoteAuthor` VARCHAR(255) NULL').catch(() => {});
      await sequelize.query('ALTER TABLE `Articles` MODIFY COLUMN `coverImage` LONGTEXT NULL').catch(() => {});
    } catch (_) {}
  } catch (error) {
    console.error('❌ MySQL Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
