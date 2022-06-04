const app = require('./app');
const sequalize = require('./sequelize');
const modelDb = require('./modelsDb')
const express = require("express");

const start = async () => {
    try {
        await sequalize.authenticate();
        await sequalize.sync();
        app.listen(3001);
        app.use(express.json())
    } catch (e) {
        console.log(e);
    }
}

start();


