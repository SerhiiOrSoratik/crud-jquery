const express = require('express');
const app = express();
const router = require('./routes')

const cors = require('cors');

async function parser(req, res, next) {
    await req.on('data', (data) => {
        if (req.headers['content-type'] === 'application/json') {
            req.body = JSON.parse(data);
        }
    });
    next();
}

app.use(cors())
app.use(parser)
app.use(router)

module.exports = app;
