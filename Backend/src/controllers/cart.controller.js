const Cart = require("../models/cart.model");

async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId, name, price } = req.body;

    // ✅ Validate required fields
    if (!productId || !name || !price) {
      return res.status(400).json({ message: "productId, name and price are required" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ productId: String(productId), name, price }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => String(item.productId) === String(productId)  // compare as strings
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId: String(productId), name, price });
      }

      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    console.error("addToCart error:", err.message);
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
}

async function getCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });
    res.json(cart || { items: [] });
  } catch (err) {
    console.error("getCart error:", err.message);
    res.status(500).json({ message: "Failed to get cart", error: err.message });
  }
}

async function removeFromCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.json({ message: "Cart empty" });

    // ✅ compare as strings
    cart.items = cart.items.filter(
      item => String(item.productId) !== String(productId)
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("removeFromCart error:", err.message);
    res.status(500).json({ message: "Failed to remove item", error: err.message });
  }
}

async function decrementFromCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      item => String(item.productId) === String(productId)
    );

    if (itemIndex > -1) {
      if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
      } else {
        // If quantity is 1, remove the item
        cart.items.splice(itemIndex, 1);
      }
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    console.error("decrementFromCart error:", err.message);
    res.status(500).json({ message: "Failed to decrement item", error: err.message });
  }
}

async function clearCart(req, res) {
  try {
    const userId = req.user.id;
    await Cart.findOneAndDelete({ user: userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("clearCart error:", err.message);
    res.status(500).json({ message: "Failed to clear cart", error: err.message });
  }
}



module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  decrementFromCart,
  clearCart
};