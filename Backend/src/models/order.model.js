import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  userName: String,
  userPhone: String,
  userAddress: String,

  products: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      total: Number
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  }

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);