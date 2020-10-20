/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require("mongoose");

const app = express();

const config = require('../config/config');

//loading Models
const Product = require('./models/Product');
const Customer = require('./models/Customer');
const Order = require('./models/Order');

const indexRoutes = require('./routes/index');
const productsRoutes = require('./routes/Products');
const customersRoutes = require('./routes/Customer');
const ordersRoutes = require('./routes/Order');

const bikcraftRoutes = require('./routes/Bikcraft');

const uri = config.connectionString;

// mongoose.connect(uri, {
//     useNewUrlParser: true
// });

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err + '\n \n could not connect!'));


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/', indexRoutes);
app.use('/products', productsRoutes);
app.use('/customers', customersRoutes);
app.use('/orders', ordersRoutes);
app.use('/bikcraft', bikcraftRoutes);


module.exports = app;