
const express = require('express');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// Create new order
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

// Get my orders (user)
router.get('/my', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// Cancel my order
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

// ✅ Get all orders (admin) - exclude Placed & Shipped
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $nin: ['Placed', 'Shipped'] } // Exclude Placed & Shipped
    }).populate('user', 'name email');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// ✅ Admin: Place order
router.put('/:id/place', protect, admin, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.status = 'Placed';
  await order.save();
  res.json(order);
});

// ✅ Admin: Mark as shipped
router.put('/:id/ship', protect, admin, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.status = 'Shipped';
  await order.save();
  res.json(order);
});

module.exports = router;

