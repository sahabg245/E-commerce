const express = require('express');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { items, totalPrice } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }
  if (!totalPrice || totalPrice <= 0) {
    return res.status(400).json({ message: 'Invalid total price' });
  }

  const order = new Order({
    user: req.user._id,
    items,
    totalPrice,
  });

  const created = await order.save();
  res.status(201).json(created);
});

router.get('/my', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

router.put('/:id/cancel', protect, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  order.status = 'Cancelled';
  await order.save();
  res.json(order);
});

router.get('/', protect, admin, async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');
  res.json(orders);
});

module.exports = router;
