const express = require('express');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { orderItems, total } = req.body;
  const order = new Order({ user: req.user._id, orderItems, total });
  await order.save();
  res.status(201).json(order);
});

router.get('/', protect, admin, async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');
  res.json(orders);
});

module.exports = router;
