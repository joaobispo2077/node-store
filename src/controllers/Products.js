/* eslint-disable no-unused-vars */
'use strict'

exports.post = (req, res, next) => {
    const body = req.body;
    res.status(201).json(body);
};

exports.patch = (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    res.status(200).json({ id: id, item: body });
};

exports.delete = (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    res.status(200).json({ id, item: body });
};