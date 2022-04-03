const sequelize = require('./sequelize');
const {DataTypes} = require('sequelize');

const product = sequelize.define('products', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    caption: {type: DataTypes.STRING, allowNull: false},
    availability: {type: DataTypes.BOOLEAN, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true},
});

module.exports = {
    product
}
