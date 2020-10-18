/* eslint-disable no-unused-vars */
'use strict'

const mongoose = require("mongoose");

const Customer = mongoose.model('Customer');
const ValidationContract = require('../validators/fluidValidator');
const repository = require('../repositories/customerRepository');

exports.listAll = async (req, res, next) => {

    try {
      const data = await repository.get();
      console.log(data);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }
  }

exports.post = async (req, res, next) => {
    const body = req.body;

    try {
      const data = await repository.create(body);
      res.status(201).json({ message: 'customer has created successfully', data});
    } catch (err) {
      console.log(err); 
      res.status(500).json({ message: 'internal server error' });
    }

}
