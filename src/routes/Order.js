/* eslint-disable no-unused-vars */
'use strict'

const router = require('express').Router();

const Order = require('../controllers/orderController');

router.get('/', Order.listAll);

router.post('/', Order.post);

module.exports = router;