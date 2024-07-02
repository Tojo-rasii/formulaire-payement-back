require ('dotenv').config;
const mysql = require('mysql2');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('husky_bdd','root', '',{
    host: 'localhost',
    dialect: 'mysql2',
});

module.exports = sequelize;