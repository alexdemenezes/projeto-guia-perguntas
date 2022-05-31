const Sequelize = require('sequelize');

const connection = new Sequelize('questions_db', 'root', 'seattle6565301', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;
