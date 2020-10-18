/* eslint-disable no-unused-vars */
'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {
    return await Product.find({ active: true }, 'title price slug tags');
}

exports.getBySlug = async slug => {
    return await Product
        .findOne({
            slug: slug,
            active: true
        }, 'title description price slug tags');
}

exports.getById = async id => {
    return await Product
        .findById(id, 'title description price slug tags');
}

exports.getByTags = async(tags) => {
    return await Product
        .find({
            tags: tags,
            active: true
        }, 'title price slug tags');
}

exports.create = async(body) => {
    const product = new Product(body);
    return await product.save();
}

exports.update = async(id, data) => {
    return await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            slug: data.slug,
            price: data.price
        }
    });
}

exports.remove = async(id) => {
    return await Product.findByIdAndRemove(id);
}