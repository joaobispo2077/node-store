/* eslint-disable no-unused-vars */
'use strict'

const router = require('express').Router();

const Products = require('../controllers/Products');

const upload = require('../../config/multer-v2');
const authService = require('../services/authService');

router.get('/', Products.listAll);

router.get('/admin/:id', Products.getById);

router.get('/tags/:tags', Products.getByTags);

router.get('/:slug', Products.getBySlug);

router.post('/', authService.authorize,upload.single('file'), Products.post);

router.patch('/:id', authService.authorize, Products.patch);

router.delete('/:id', authService.authorize, Products.delete);

module.exports = router;