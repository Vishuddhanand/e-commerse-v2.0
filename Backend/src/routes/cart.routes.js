const express = require("express");
const cartRouter = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart
} = require("../controllers/cart.controller");

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.get("/", authMiddleware, getCart);
cartRouter.delete("/remove/:productId", authMiddleware, removeFromCart);
cartRouter.delete("/clear", authMiddleware, clearCart);

module.exports = cartRouter;