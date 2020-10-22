/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict'

const azure = require('azure-storage');
const guid = require('guid');

const ValidatorContract = require('../validators/fluidValidator');
const repository = require('../repositories/productRepository');
const config = require('../../config/config');

exports.listAll = async(req, res, next) => {

    try {
        const data = await repository.get();
        console.log(data);
        res.status(200).json({ message: 'Produtos listados com sucesso', products: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Falha ao listar todos os produtos', error: err });
    }

};

exports.getBySlug = async(req, res, next) => {

    const { slug } = req.params;

    try {
        const data = await repository.getBySlug(slug);
        console.log(data);
        res.status(200)
            .json({
                message: `O produto com o slug ${slug} foi encontrado!`,
                product: data
            });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Falha ao listar o produto com o slug ${slug}`,
            error: err
        });
    }

};

exports.getByTags = async(req, res, next) => {

    const { tags } = req.params;

    try {

        const data = await repository.getByTags(tags);

        console.log(data);

        res.status(200).json({
            message: `O produto com o tag ${tags} foi encontrado!`,
            product: data
        });
    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: `Falha ao listar o produto com a tag ${tags}`,
            error: err
        });
    }
};

exports.getById = async(req, res, next) => {
    const { id } = req.params;

    try {
        const data = await repository.getById(id);
        console.log(data);
        res.status(200).json({
            message: `O produto com o id ${id} foi encontrado!`,
            product: data
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Falha ao listar o produto com o id ${id}`,
            error: err
        });
    }
}


exports.post = async(req, res, next) => {
    const body = req.body;

    const contract = new ValidatorContract();

    contract.hasMinLen(body.title, 3, 'O Título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(body.slug, 3, 'O Slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(body.description, 3, 'A Descrição deve conter pelo menos 3 caracteres');

    if (!contract.isValid()) {
        res.status(500).send(contract.errors()).end();
        return;
    }

    try {
        const blobService = azure.createBlobService(config.userImagesBlobConnectionString);

        let fileName = guid.raw().toString( + '.jpeg');
        const rawData = req.body.image;
        
        //const regex = /^data:([A-Za-z-+\/]+);base64,(.+)$/; need Fix

        const matches = rawData.match(regex);
        const type = matches[1];
        //const buffer = new Buffer(matches[2], 'base64'); need Fix

        await blobService.createBlockBlobFromText('product-images', filename, buffer, {
            contentType: type
        }, (error, result, response) => {
            if (error) {
                fileName = 'default-product.png';
            }
        });

        const data = {
            ...body,
            image: 'https://nodestorestorage.blob.core.windows.net/product-images/' + filename
        }

        const productSaved = await repository.create();

        console.log(productSaved);
        res.status(201).json({
            message: 'O produto foi criado com sucesso!',
            product: productSaved
        });

    } catch (err) {

        console.log(err);
        res.status(500).json({
            message: 'Não foi possível criar o produto!',
            error: err
        });
    }

}

exports.patch = async(req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    try {

        const data = await repository.update(id, body);

        res.status(201).json({
            message: `O produto com o id ${data.id} foi atualizado com sucesso!`,
            product: data
        });
    } catch (err) {

        res.status(500).json({ message: `Falha ao atualizar o produto ${body.title}`, error: err });
    }
};

exports.delete = async(req, res, next) => {
    const { id } = req.params;

    try {
        const data = await repository.remove(id);

        res.status(200).json({
            message: `O produto com o id ${id} foi removido com sucesso!`,
            product: data
        });
    } catch (err) {

        res.status(500).json({ message: `Falha ao remover o produto de id: ${id}`, error: err });
    }
};