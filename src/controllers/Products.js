/* eslint-disable no-unused-vars */
'use strict'

const mongoose = require("mongoose");

const Product = mongoose.model('Product');

exports.listAll = async(req, res, next) => {

    await Product.find({ active: true }, 'title price slug tags')
        .then((data) => {
            console.log(data);
            res.status(200).json({ message: 'Produtos listados com sucesso', products: data });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: 'Falha ao listar todos os produtos', error: err });

        });


};

exports.getBySlug = async(req, res, next) => {
    const { slug } = req.params;
    await Product.findOne({ slug }, 'title description price slug tags')
        .then((data => {
            console.log(data);
            res.status(200).json({
                message: `O produto com o slug ${slug} foi encontrado!`,
                product: data
            });
        }))
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                message: `Falha ao listar o produto com o slug ${slug}`,
                error: err
            })
        });
};

exports.getByTags = async(req, res, next) => {
    const { tags } = req.params;
    await Product.find(tags, 'title price slug tags')
        .then((data => {
            console.log(data);
            res.status(200).json({
                message: `O produto com o tag ${tags} foi encontrado!`,
                product: data
            });
        }))
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                message: `Falha ao listar o produto com a tag ${tags}`,
                error: err
            })
        });
};

exports.getById = async(req, res, next) => {
    const { id } = req.params;
    await Product.findById(
            id,
            'title description price slug tags')
        .then((data => {
            console.log(data);
            res.status(200).json({
                message: `O produto com o id ${id} foi encontrado!`,
                product: data
            });
        }))
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                message: `Falha ao listar o produto com o id ${id}`,
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
    const { title, description, price, slug } = req.body;

    Product.findByIdAndUpdate(id, {
        $set: {
            title,
            description,
            price,
            slug
        }
    }).then(data => {
        res.status(201).json({
            message: `O produto com o id ${id} foi atualizado com sucesso!`,
            product: data
        });

    }).catch(err => {
        res.status(400).json({ message: `Falha ao atualizar o produto ${title}`, error: err })
    })

};

exports.delete = (req, res, next) => {
    const { id } = req.params;
    Product.findOneAndRemove(id).then(data => {
        res.status(200).json({
            message: `O produto com o id ${id} foi removido com sucesso!`,
            product: data
        });

    }).catch(err => {
        res.status(400).json({ message: `Falha ao remover o produto de id: ${id}`, error: err })
    })
};