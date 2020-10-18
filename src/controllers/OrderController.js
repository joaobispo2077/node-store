/* eslint-disable no-unused-vars */
'use strict'

const ValidatorContract = require('../validators/fluidValidator');
const repository = require('../repositories/orderRepository');


exports.listAll = async () => {
  return await repository.get();
}
exports.post = async (req, res, next) => {
  const body = req.body;
  const contract = new ValidatorContract();

  contract.hasMinLen(body.customer, 3, 'O Nome deve conter pelo menos 3 caracteres');
  contract.hasMinLen(body.number, 'O Email inválido, tente o modelo: teste@teste.teste');
  contract.hasMinLen(body.status, 3, 'A Senha deve conter pelo menos 3 caracteres');
  contract.hasMinLen(body.status, 3, 'A Senha deve conter pelo menos 3 caracteres');

  if (!contract.isValid()) {
      res.status(500).send(contract.errors()).end();
      return;
  }

  try {
    const orderCreated = repository.create(body);
    res.status(201).json(orderCreated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'internal server error'});
  }
}