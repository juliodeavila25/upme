const { Sequelize } = require('sequelize');
const sharedConfig = require('./sharedConfig');

// Initialize Sequelize with shared config
const sequelize = new Sequelize(
  sharedConfig.database,
  sharedConfig.username,
  sharedConfig.password,
  {
    host: sharedConfig.host,
    dialect: sharedConfig.dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: sharedConfig.logging,
  }
);

module.exports = sequelize;