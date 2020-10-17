/* eslint-disable no-unused-vars */
'use strict'

const router = require('express').Router();

const Products = require('../controllers/Products');

router.get('/', Products.listAll);

router.get('/admin/:id', Products.getById);

router.get('/tags/:tags', Products.getByTags);

router.get('/:slug', Products.getBySlug);

router.post('/', Products.post);

router.patch('/:id', Products.patch);

router.delete('/:id', Products.delete);

module.exports = router;