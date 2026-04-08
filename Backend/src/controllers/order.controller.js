const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

async function createOrder(req, res) {
  try {
    const userId = req.user.id;
    const { userName, userPhone, userAddress, products, totalAmount } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    const newOrder = new Order({
      user: userId,
      userName,
      userPhone,
      userAddress,
      products,
      totalAmount,
      status: "Pending"
    });

    await newOrder.save();

    // Optionally clear cart after order
    // await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.error("createOrder error:", err.message);
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
}

async function getUserOrders(req, res) {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("getUserOrders error:", err.message);
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
}

async function getAllOrders(req, res) {
  try {
    // Check if user is admin (this check can also be in middleware)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const orders = await Order.find().populate('user', 'username email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("getAllOrders error:", err.message);
    res.status(500).json({ message: "Failed to fetch all orders", error: err.message });
  }
}

async function updateOrderStatus(req, res) {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error("updateOrderStatus error:", err.message);
    res.status(500).json({ message: "Failed to update order status", error: err.message });
  }
}

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};
