// https://www.youtube.com/watch?v=g5ij7NIPR2s
const Sequelize = require('sequelize');
require('dotenv').config()

// criando uma instância de Sequelize 
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER,process.env.MYSQL_PASSWORD,{
dialect:process.env.MYSQL_DIALECT,
host:process.env.MYSQL_HOST,

});

module.exports = sequelize;


