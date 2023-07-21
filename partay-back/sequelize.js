const { Sequelize } = require('sequelize');
const { DateTime } = require('luxon');

require('dotenv').config();

const localDateTime = DateTime.local();
const databaseTimezoneOffset = localDateTime.toFormat('ZZ');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  sync: true,
  define: {
    timestamps: false
  },
  timezone: databaseTimezoneOffset
});

module.exports = sequelize;
