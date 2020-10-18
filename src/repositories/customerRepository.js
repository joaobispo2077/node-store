/* eslint-disable no-unused-vars */
'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');


exports.get = async () => {
        return await Customer.find();
}

exports.create = async (data) => {
				const customer =  new Customer(data);
				return customer.save();
}