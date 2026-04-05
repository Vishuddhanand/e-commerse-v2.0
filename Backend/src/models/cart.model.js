const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
}, { timestamps: true });


const cartModel = mongoose.model("carts", cartSchema);

module.exports = cartModel