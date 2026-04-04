import React, { useState } from 'react';
import '../styles/cart.css'; 

const initialCart = [
  {
    productId: 1,
    name: "Premium Kashmiri Saffron (1g)",
    price: 450,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1596647413661-bc935da66f07?auto=format&fit=crop&q=80&w=200",
    category: "Pooja Essentials"
  },
  {
    productId: 2,
    name: "Sandalwood Incense Sticks",
    price: 150,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1603517173367-a006c64606ff?auto=format&fit=crop&q=80&w=200",
    category: "Aromatherapy"
  },
  {
    productId: 3,
    name: "Pure Cow Ghee (500ml)",
    price: 650,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1627485937980-221c88ce04ea?auto=format&fit=crop&q=80&w=200",
    category: "Daily Essentials"
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCart);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (productId) => {
    setCartItems(cartItems.filter(item => item.productId !== productId));
  };

  const handleSinglePurchase = (item) => {
    alert(`Proceeding to securely buy ${item.quantity}x ${item.name} for ₹${(item.price * item.quantity).toFixed(2)}`);
  };

  const handleCheckout = () => {
    alert('Proceeding to Checkout with all items!');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50; 
  const total = subtotal + shipping;

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty-state">
            <div className="empty-cart-icon-wrapper">
              <svg className="empty-cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items yet.</p>
            <button className="btn-primary" onClick={() => window.history.back()}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-section">
              {cartItems.map(item => (
                <div key={item.productId} className="cart-item">
                  <div className="item-image-wrapper">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <div className="item-info">
                      <span className="item-category">{item.category}</span>
                      <h3>{item.name}</h3>
                      <div className="item-price">₹{item.price.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="item-actions-right">
                    <div className="quantity-and-total">
                      <div className="quantity-control">
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                          -
                        </button>
                        <input type="number" value={item.quantity} readOnly />
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                      <div className="item-total">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <div className="item-buttons">
                      <button className="btn-buy-single" onClick={() => handleSinglePurchase(item)}>
                        Buy Now
                      </button>
                      <button className="btn-remove" onClick={() => removeItem(item.productId)}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary-section">
              <div className="summary-card">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping estimate</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="summary-row">
                  <span>Tax estimate</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <button className="btn-purchase" onClick={handleCheckout}>
                  Checkout Total
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <div className="secure-checkout">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
