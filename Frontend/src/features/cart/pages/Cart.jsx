import React, { useState, useEffect } from 'react';
import '../styles/cart.css';
import { getCart, removeFromCart, addToCart, clearCart } from '../services/cart.api';
import products from '../../../data/product';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    userName: '',
    userPhone: '',
    userAddress: ''
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  // Pre-fill username when user loads
  useEffect(() => {
    if (user) {
      setCheckoutForm(prev => ({
        ...prev,
        userName: user.username || ''
      }));
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const data = await getCart();

      const itemsWithImages = data.items.map(item => {
        const productDetail = products.find(p => p.id === String(item.productId));
        return {
          ...item,
          image: productDetail?.img || 'https://images.unsplash.com/photo-1596647413661-bc935da66f07?auto=format&fit=crop&q=80&w=200',
          category: productDetail?.category || 'General'
        };
      });

      setCartItems(itemsWithImages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleUpdateQuantity = async (productId, currentQty, delta) => {
    if (currentQty + delta < 1) return;

    try {
      if (delta > 0) {
        const item = cartItems.find(i => i.productId === productId);
        await addToCart({ productId, name: item.name, price: item.price });
      } else {
        if (currentQty === 1) {
          await removeFromCart(productId);
          toast.success("Item removed from cart");
        } else {
          toast("Use remove button to delete item", { icon: "ℹ️" });
          return;
        }
      }
      await fetchCartItems();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
      toast.success("Item removed from cart");
      await fetchCartItems();
    } catch (err) {
      toast.error("Remove failed");
    }
  };

  const handleSinglePurchase = async (item) => {
    try {
      await removeFromCart(item.productId);
      await fetchCartItems();
      navigate(`/order?product=${item.productId}`);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // Just opens the modal
  const handleCheckout = () => {
    if (!user) {
      toast.error("🔒 Please login to place an order");
      navigate("/login");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setCheckoutVisible(true);
  };

  // Sends WhatsApp after form is filled
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();

    const { userName, userPhone, userAddress } = checkoutForm;

    const itemsList = cartItems.map(item =>
      `• ${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`
    ).join("\n");

    const message = `🛒 Cart Order - Shree Krishna Enterprises

 Name: ${userName}
 Phone: ${userPhone}
 Address: ${userAddress}

Items:
${itemsList}

Subtotal: ₹${subtotal.toFixed(2)}
Shipping: ${shipping === 0 ? "Free" : `₹${shipping}`}
Total: ₹${total.toFixed(2)}
Payment: Cash on Delivery`;

    const ownerNumber = "919637401456";
    const whatsappUrl = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    setCheckoutVisible(false);
    toast.success("Order sent via WhatsApp! 🎉");
  };

  if (!user && !loading) {
    return (
      <div className="cart-page-wrapper">
        <div className="cart-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h2>Please log in to view your cart</h2>
          <button className="btn-primary" style={{ marginTop: '20px' }} onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cart-page-wrapper" style={{ textAlign: 'center', padding: '100px 0' }}>
        Loading cart...
      </div>
    );
  }

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty-state">
            <div className="empty-cart-icon-wrapper">
              <svg className="empty-cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items yet.</p>
            <button className="btn-primary" onClick={() => navigate("/")}>
              Start Shopping
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
                        <button className="qty-btn" onClick={() => handleUpdateQuantity(item.productId, item.quantity, -1)}>-</button>
                        <input type="number" value={item.quantity} readOnly />
                        <button className="qty-btn" onClick={() => handleUpdateQuantity(item.productId, item.quantity, 1)}>+</button>
                      </div>
                      <div className="item-total">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <div className="item-buttons">
                      <button className="btn-buy-single" onClick={() => handleSinglePurchase(item)}>
                        Buy Now
                      </button>
                      <button className="btn-remove" onClick={() => handleRemoveItem(item.productId)}>
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

      {/* CHECKOUT FORM MODAL */}
      {checkoutVisible && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.75)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000, padding: "1rem"
        }}>
          <div style={{
            background: "#22262c",
            border: "1px solid #2e3440",
            borderRadius: "16px",
            padding: "2rem",
            width: "100%",
            maxWidth: "440px"
          }}>
            <h3 style={{ marginBottom: "1.5rem", color: "white", fontFamily: "sans-serif" }}>
              📦 Confirm Your Order
            </h3>

            <form onSubmit={handleCheckoutSubmit}>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: ".8rem", color: "#8a9099", display: "block", marginBottom: ".4rem" }}>Full Name</label>
                <input
                  type="text"
                  value={checkoutForm.userName}
                  onChange={e => setCheckoutForm(prev => ({ ...prev, userName: e.target.value }))}
                  placeholder="Full Name"
                  required
                  style={{ width: "100%", padding: ".75rem", background: "#2c3139", border: "1px solid #2e3440", borderRadius: "8px", color: "white", fontSize: ".9rem" }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: ".8rem", color: "#8a9099", display: "block", marginBottom: ".4rem" }}>Mobile Number</label>
                <input
                  type="tel"
                  value={checkoutForm.userPhone}
                  onChange={e => setCheckoutForm(prev => ({ ...prev, userPhone: e.target.value }))}
                  placeholder="Mobile Number"
                  required
                  style={{ width: "100%", padding: ".75rem", background: "#2c3139", border: "1px solid #2e3440", borderRadius: "8px", color: "white", fontSize: ".9rem" }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontSize: ".8rem", color: "#8a9099", display: "block", marginBottom: ".4rem" }}>Delivery Address</label>
                <textarea
                  value={checkoutForm.userAddress}
                  onChange={e => setCheckoutForm(prev => ({ ...prev, userAddress: e.target.value }))}
                  placeholder="Full delivery address"
                  required
                  rows={3}
                  style={{ width: "100%", padding: ".75rem", background: "#2c3139", border: "1px solid #2e3440", borderRadius: "8px", color: "white", fontSize: ".9rem", resize: "vertical" }}
                />
              </div>

              {/* Order Summary Preview */}
              <div style={{ background: "#1a1d22", borderRadius: "8px", padding: "1rem", marginBottom: "1.5rem", fontSize: ".82rem", color: "#8a9099" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".4rem" }}>
                  <span>Items</span><span>{cartItems.length}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".4rem" }}>
                  <span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".4rem" }}>
                  <span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "#ff9800", marginTop: ".5rem", paddingTop: ".5rem", borderTop: "1px solid #2e3440" }}>
                  <span>Total</span><span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button type="submit" style={{
                  flex: 1, padding: ".85rem",
                  background: "#ff9800", color: "#000",
                  border: "none", borderRadius: "8px",
                  fontWeight: 700, fontSize: ".9rem", cursor: "pointer"
                }}>
                  Confirm via WhatsApp
                </button>
                <button type="button" onClick={() => setCheckoutVisible(false)} style={{
                  padding: ".85rem 1.2rem",
                  background: "transparent",
                  border: "1.5px solid #555",
                  color: "#aaa", borderRadius: "8px", cursor: "pointer"
                }}>
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Cart;