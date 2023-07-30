const { Sequelize } = require('sequelize');
const { DateTime } = require('luxon');
require('dotenv').config();

const localDateTime = DateTime.local();
const databaseTimezoneOffset = localDateTime.toFormat('ZZ');

// Configuration de base de données pour les différents environnements
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  }
};

// Création de l'instance Sequelize
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  sync: true,
  define: {
    timestamps: false
  },
  timezone: databaseTimezoneOffset
});

module.exports.sequelize = sequelize;
