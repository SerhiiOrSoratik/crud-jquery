const express = require('express');
const router = express.Router();

const product = require('./productsRoute');

router.use('/product', product);

module.exports = router;
