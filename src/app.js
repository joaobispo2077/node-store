/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require("mongoose");

const app = express();
const uri = 'mongodb://admin:admin@ndstr-shard-00-00.chsnt.azure.mongodb.net:27017,ndstr-shard-00-01.chsnt.azure.mongodb.net:27017,ndstr-shard-00-02.chsnt.azure.mongodb.net:27017/ndstr?ssl=true&replicaSet=atlas-1395iu-shard-0&authSource=admin&retryWrites=true&w=majority';

// mongoose.connect(uri, {
//     useNewUrlParser: true
// });

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err + '\n \n could not connect!'));


const indexRoutes = require('./routes/index');
const productsRoutes = require('./routes/Products');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));




app.use('/', indexRoutes);
app.use('/products', productsRoutes);


module.exports = app;