/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const app = express();

const indexRoutes = require('./routes/index');
const productsRoutes = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));




app.use('/', indexRoutes);
app.use('/products', productsRoutes);


module.exports = app;