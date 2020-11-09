/* eslint-disable no-unused-vars */
'use strict'

const router = require('express').Router();

const Customer = require('../controllers/customerController');
const authService = require('../services/authService');

router.get('/', Customer.listAll);

router.post('/', Customer.post);

router.post('/authenticate', Customer.authenticate);
router.post('/refresh-token', authService.authorize ,Customer.refreshToken);

module.exports = router;