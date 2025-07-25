'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../config/config.js').development;

const db = {};

const sequelize = new Sequelize(config);

fs
  .readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.values(db).forEach(model => {
  if (model.associate) model.associate(db);
});

console.log('Models loaded:', Object.keys(db).join(', '));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;