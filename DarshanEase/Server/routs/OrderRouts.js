const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
});

router.get("/", auth, async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;