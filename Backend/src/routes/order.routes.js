const express = require("express");
const orderRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/order.controller");

const adminMiddleware = require("../middlewares/admin.middleware");

// User routes
orderRouter.post("/create", authMiddleware, createOrder);
orderRouter.get("/history", authMiddleware, getUserOrders);

// Admin routes
orderRouter.get("/admin/all", authMiddleware, adminMiddleware, getAllOrders);
orderRouter.patch("/admin/status/:id", authMiddleware, adminMiddleware, updateOrderStatus);
orderRouter.delete("/admin/delete/:id", authMiddleware, adminMiddleware, deleteOrder);

module.exports = orderRouter;
