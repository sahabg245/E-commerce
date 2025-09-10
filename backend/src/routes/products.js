const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// Public: get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Public: get one product
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// Admin only: create product
router.post('/', protect, admin, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

// Admin only: update product
router.put('/:id', protect, admin, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// Admin only: delete product
router.delete('/:id', protect, admin, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product removed' });
});

module.exports = router;
