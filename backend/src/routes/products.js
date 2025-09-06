const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET single product by id
router.get('/:id', async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
});

// CREATE new product (admin only)
router.post('/', protect, admin, async (req, res) => {
  const data = req.body;
  const p = new Product(data);
  await p.save();
  res.status(201).json(p);
});

// UPDATE product (admin only)
router.put('/:id', protect, admin, async (req, res) => {
  const { name, price, description, countInStock } = req.body;
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });

  p.name = name ?? p.name;
  p.price = price ?? p.price;
  p.description = description ?? p.description;
  p.countInStock = countInStock ?? p.countInStock;

  const updated = await p.save();
  res.json(updated);
});

// DELETE product (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });

  await p.deleteOne();
  res.json({ message: 'Product removed' });
});

module.exports = router;
