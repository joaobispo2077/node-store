/* eslint-disable no-unused-vars */
'use strict'

const router = require('express').Router();

const Bikcraft = require('../controllers/Bikcraft');

router.post('/', Bikcraft.sendEmail);

module.exports = router;