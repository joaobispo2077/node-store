/* eslint-disable no-unused-vars */
'use strict';
const config = require('../../config/config');
const sendgrid = require('@sendgrid/mail');
const { log } = require('debug');

sendgrid.setApiKey(config.sendgridKey);

exports.send = async(to, subject, body) => {
  const msg = { 
    to: to,
    from: 'manodj.gamer@gmail.com',
    subject: subject,
    html: body
  }
  console.log(msg);
  sendgrid.send(msg)
  .then(object => { console.log(object)})
  .catch(err => console.log(err));
}