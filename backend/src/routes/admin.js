const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

router.get("/stats", protect, admin, async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();
    const users = await User.countDocuments();
    res.json({ products, orders, users });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

router.get("/orders", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

router.put("/orders/:id/status", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to update order" });
  }
});

module.exports = router;
