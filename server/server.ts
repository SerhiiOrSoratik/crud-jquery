import app from './app'
import sequalize from './sequelize'
// import modelDb from './modelsDb'
import express from 'express';

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

start()
    .then(() => console.log('server started'));


