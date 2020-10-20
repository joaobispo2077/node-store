/* eslint-disable no-unused-vars */
'use strict';
const config = require('../../config/config');
const sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async(to, subject, body) => {
  sendgrid.send({ 
    to: to,
    from: 'manodj.gamer@gmail.com',
    subject: subject,
    html: body
  });
}