import {Sequelize} from "sequelize";

export default new Sequelize('internet_shop', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
})
