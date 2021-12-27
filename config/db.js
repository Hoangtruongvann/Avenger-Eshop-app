const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('Local instance MySQL80', 'root', '662255', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = 1;