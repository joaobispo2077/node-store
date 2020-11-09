/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict'
require('dotenv/config');
const md5 = require('md5');

const ValidatorContract = require('../validators/fluidValidator');
const repository = require('../repositories/customerRepository');
const emailService = require('../services/email-service');
const authService = require('../services/authService');

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
    const isAdmin = req.body.roles == 'admin';

    const body = {
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + process.env.SALT_KEY),
      roles: (isAdmin ? ["user", "admin"] : ["user"])
    };
    console.log(body);
    const contract = new ValidatorContract();

    contract.hasMinLen(body.name, 3, 'O Nome deve conter pelo menos 3 caracteres');
    contract.isEmail(body.email, 'O Email inválido, tente o modelo: teste@teste.teste');
    contract.hasMinLen(body.password, 3, 'A Senha deve conter pelo menos 3 caracteres');

    if (!contract.isValid()) {
        res.status(500).send(contract.errors()).end();
        return;
    }



    try {
      const data = await repository.create(body);

      emailService.send(
        body.email, 
        'Bem vindo ao Node Store', 
        process.env.EMAIL_TMPL.replace('{0}', body.name)
        );

      res.status(201).json({ message: 'customer has created successfully', data});
    } catch (err) {
      console.log(err); 
      res.status(500).json({ message: 'internal server error' });
    }

}

exports.authenticate = async (req, res, next) => {
    const body = {
      email: req.body.email,
      password: md5(req.body.password + process.env.SALT_KEY)
    };

    try {
      const customer = await repository.authenticate(body);

      if (!customer) {
        res.status(404).json({ message: 'customer not found' });
        return;
      } else {

        const dataToToken = { 
          id: customer._id,
          email: customer.email,
          name: customer.name,
          roles: customer.roles
        };
        console.log(dataToToken);
        const token = await authService.generateToken(dataToToken);
  
        res.status(201).json({ token, dataToToken});
      }
    } catch (err) {
      console.log(err); 
      res.status(500).json({ message: 'internal server error' });
    }

}

exports.refreshToken = async (req, res, next) => {
  
  try {
      const token = (req.body.token || req.query.token || req.headers['x-access-token']);
      
      const userToken = await authService.decodeToken(token);

      const customerId = userToken.id;

      const customer = await repository.getById(customerId);

      if (!customer) {
        res.status(404).json({ message: 'Cliente não encontrado' });
        return;
      } else {

        const dataToToken = { 
          id: customer._id,
          email: customer.email,
          name: customer.name,
          roles: customer.roles
        };

        const token = await authService.generateToken(dataToToken);

        res.status(201).json({ token, dataToToken});
      }
    } catch (err) {
      console.log(err); 
      res.status(500).json({ message: 'internal server error' });
    }

}
