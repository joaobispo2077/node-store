/* eslint-disable no-unused-vars */
'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product.find({ active: true }, 'title price slug tags');
}

exports.getBySlug = slug => {
    return Product
        .findOne({
            slug: slug,
            active: true
        }, 'title description price slug tags');
}

exports.getById = id => {
    return Product
        .findById(id, 'title description price slug tags');
}

exports.getByTags = (tags) => {
    return Product
        .find({
            tags: tags,
            active: true
        }, 'title price slug tags');
}

exports.create = (body) => {
    return Product.save(body);
}

exports.update = (id, data) => {
    return Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug,

        }
    });
}

exports.remove = (id) => {
    return Product.findByIdAndRemove(id);
}