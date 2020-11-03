/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';
require('dotenv/config');
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.send = async(from, subject, body) => {
  const msg = { 
    to: 'manodj.gamer@gmail.com',
    from: 'manodj.gamer@gmail.com',
    subject: subject,
    html: body
  }

  console.log(msg);
  const response =  await sendgrid.send(msg);
  return response;
}