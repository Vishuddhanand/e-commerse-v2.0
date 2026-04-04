const Cart = require("../models/cart.model");


async function addToCart(req, res) {
  const userId = req.user.id;
  const { productId, name, price } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [{ productId, name, price }]
    });
  } else {
    const itemIndex = cart.items.findIndex(
      item => item.productId === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId, name, price });
    }

    await cart.save();
  }

  res.json(cart);
}



async function getCart(req, res) {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId });

  res.json(cart || { items: [] });
}



async function removeFromCart(req, res) {
  const userId = req.user.id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) return res.json({ message: "Cart empty" });

  cart.items = cart.items.filter(
    item => item.productId != productId
  );

  await cart.save();

  res.json(cart);
}


async function clearCart(req, res) {
  const userId = req.user.id;

  await Cart.findOneAndDelete({ user: userId });

  res.json({ message: "Cart cleared" });
}

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart
};