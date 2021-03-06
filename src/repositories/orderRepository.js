/* eslint-disable no-unused-vars */
'use strict';
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async () => {
  return await Order.find({}, 'number status items')
  .populate('customer', 'name')
  .populate('items.product', 'title');
}

exports.create = async (data) => {
  const order = new Order(data);
  return await order.save();
}