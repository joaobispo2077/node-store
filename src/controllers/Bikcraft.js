/* eslint-disable no-unused-vars */

const emailService = require('../services/bikcraft-email-service');

exports.sendEmail = async (req, res, next) => {
  const body = req.body;

  const templateEmail = `Nome do cliente: <p><strong>${body.name}</strong></p> ||| Email do Cliente: <p><strong>${body.email}</strong></p> ||| Telefone do cliente: <p><strong>${body.phone}</strong></p> ||| Mensagem do cliente: <p><strong>${body.msg}</strong></p>`
  try {
    const response = await emailService.send(
        body.email, 
        'CONTATO - BIKCRAFT',
        templateEmail
    );
      
    res.status(202).json({ message: 'E-mail enviado com sucesso', response})
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err})
  }
}