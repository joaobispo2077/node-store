/* eslint-disable no-unused-vars */
'use strict'

const mongoose = require("mongoose");

const ValidatorContract = require('../validators/fluidValidator');
const repository = require('../repositories/productRepository');

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
        const productSaved = await repository.create(body);

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