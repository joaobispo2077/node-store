/* eslint-disable no-unused-vars */
'use strict'

const router = require('express').Router();



router.post('/', (req, res, next) => {
    const body = req.body;
    res.status(201).json(body);
});

router.patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    res.status(200).json({ id: id, item: body });
});


router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    res.status(200).json({ id, item: body });
});

module.exports = router;