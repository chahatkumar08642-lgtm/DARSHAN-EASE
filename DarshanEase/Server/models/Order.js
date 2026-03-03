const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  product: String,
  quantity: Number
});

module.exports = mongoose.model("Order", orderSchema);