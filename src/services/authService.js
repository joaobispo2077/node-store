/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require('dotenv/config');
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    const token = await jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d' });
    return token;
  }
  
exports.decodeToken = async (token) => {
  const data = await jwt.verify(token, process.env.SALT_KEY);
  return data;
}

exports.authorize = function (req, res, next) {
  const token = (req.body.token || req.query.token || req.headers['x-access-token']);

  if (!token) {
    res.status(401).json({ message: 'Acesso restrito'});
  } else {
    jwt.verify(token, process.env.SALT_KEY, function (err, decodedToken) {
      if (err) {
        res.status(401).json({ message: 'Token inválido'});
      } else {
        next();
      }
    });
  }

}

exports.isAdmin = function (req, res, next) {
  const token = (req.body.token || req.query.token || req.headers['x-access-token']);
  
  if (!token) {
    res.status(401).json({ message: 'Acesso restrito'});
  } else {
    jwt.verify(token, process.env.SALT_KEY, function (err, decodedToken) {
      if (err) {
        res.status(401).json({ message: 'Token inválido'});
      } else {

        if (decodedToken.roles.includes('admin')) {
          console.log('admnistrator logged');
          next();
        } else {
          res.status(401).json({ message: 'Esta funcionalidade é restrita para os administradores'});
        }




      }



    })
  }
}