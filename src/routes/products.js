/* eslint-disable no-unused-vars */
'use strict'

const router = require('express').Router();

const Products = require('../controllers/Products');

router.post('/', Products.post);

router.patch('/:id', Products.patch);

router.delete('/:id', Products.delete);

module.exports = router;