/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';
require('dotenv/config');
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

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