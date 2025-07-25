const { Sequelize } = require('sequelize');
const sharedConfig = require('./sharedConfig');

// Initialize Sequelize with shared config
const sequelize = new Sequelize(sharedConfig.database, sharedConfig.username, sharedConfig.password, {
  host: sharedConfig.host,
  dialect: sharedConfig.dialect,
  logging: sharedConfig.logging,
});

module.exports = sequelize;
