/* eslint-disable no-unused-vars */
'use strict'

const mongoose = require("mongoose");

const Product = mongoose.model('Product');

exports.listAll = async(req, res, next) => {

    await Product.find({ active: true }, 'title price slug tags')
        .then((data) => {
            console.log(data);
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: 'Falha ao listar todos os produtos', error: err });

        });


};

exports.getProductBySlug = async(req, res, next) => {
    const { slug } = req.params;
    await Product.find({ slug }, 'title description price slug tags')
        .then((data => {
            console.log(data);
            res.status(200).json(data);
        }))
        .catch((err) => {
            console.log(err);
            res.status(204).json({
                message: `Falha ao listar o produto com o slug ${slug}`,
                error: err
            })
        });
};

exports.post = (req, res, next) => {
    const body = req.body;

    const product = new Product(body);
    product
        .save()
        .then((productSaved) => {

            console.log(productSaved);
            res.status(201).json({
                message: 'O produto foi criado com sucesso!',
                product: productSaved
            });

        }).catch((err) => {

            console.log(err);
            res.status(400).json({
                message: 'Não foi possível criar o produto!',
                error: err
            });
        });

}
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