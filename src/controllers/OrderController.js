/* eslint-disable no-unused-vars */
'use strict'

const guid = require('guid');

const ValidatorContract = require('../validators/fluidValidator');
const repository = require('../repositories/orderRepository');
const authService = require('../services/authService');


exports.listAll = async (req, res, next) => {
  try {
    const orders = await repository.get();
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'internal server error'});
  }
}
exports.post = async (req, res, next) => {
  
  try {
    const token = (req.body.token || req.query.token || req.headers['x-access-token']);
    
    const dataToken = await authService.decodeToken(token);

      const body = {
        customer: dataToken.id,
        number: guid.raw().substring(0, 6),
        items: req.body.items
      };
    
    
      const contract = new ValidatorContract();
    
      contract.hasMinLen(body.customer, 3, 'O cliente deve ter um id válido');
    
    
    
      if (!contract.isValid()) {
          res.status(500).send(contract.errors()).end();
          return;
      }

    const orderCreated = await repository.create(body);
    res.status(201).json(orderCreated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'internal server error'});
  }
}