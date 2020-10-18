'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    // _id - mongoose schema auto created id
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Customer', customerSchema);