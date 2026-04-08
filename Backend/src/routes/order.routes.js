const express = require("express");
const orderRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/order.controller");

// User routes
orderRouter.post("/create", authMiddleware, createOrder);
orderRouter.get("/history", authMiddleware, getUserOrders);

// Admin routes
orderRouter.get("/admin/all", authMiddleware, getAllOrders);
orderRouter.patch("/admin/status/:id", authMiddleware, updateOrderStatus);

module.exports = orderRouter;
