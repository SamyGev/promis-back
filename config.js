const Sequelize = require('sequelize');

// module.exports = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD,{
module.exports = new Sequelize('promis', 'phpmyadmin', 'promis',{

    // port: process.env.DATABASE_PORT,
    host: 'localhost',
    dialect:'mysql',    
    port: 3306,
    logging: false,
})