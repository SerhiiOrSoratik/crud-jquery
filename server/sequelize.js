const { Sequelize} = require('sequelize');

module.exports = new Sequelize('internet_shop', 'postgres', 'root', {
        host: 'localhost',
        dialect: 'postgres'
      });
