/* eslint-disable no-unused-vars */
'use strict'

const router = require('express').Router();

const Order = require('../controllers/orderController');
const authService = require('../services/authService');

router.get('/', authService.authorize, Order.listAll);

router.post('/', authService.authorize, Order.post);

module.exports = router;