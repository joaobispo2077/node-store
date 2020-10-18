/* eslint-disable no-unused-vars */
'use strict'

const router = require('express').Router();

const Customer = require('../controllers/customerController');

router.get('/', Customer.listAll);

router.post('/', Customer.post);

module.exports = router;