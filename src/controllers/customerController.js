/* eslint-disable no-unused-vars */
'use strict'

const md5 = require('md5');

const ValidatorContract = require('../validators/fluidValidator');
const repository = require('../repositories/customerRepository');
const emailService = require('../services/email-service');

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
    const body = {
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    };

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
        global.EMAIL_TMPL.replace('{0}', body.name)
        );

      res.status(201).json({ message: 'customer has created successfully', data});
    } catch (err) {
      console.log(err); 
      res.status(500).json({ message: 'internal server error' });
    }

}
