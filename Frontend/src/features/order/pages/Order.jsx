import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { addToCart } from '../../cart/services/cart.api';
import '../styles/order.css';
import products from '../../../data/product';
import { useAuth } from '../../auth/hooks/useAuth';
import { toast } from 'react-hot-toast';
import Navbar from '../../home/components/Navbar';

const Order = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const productId = searchParams.get('product');
  const productInfo = products.find((p) => p.id === productId) || products[0];

  const [quantity, setQuantity] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [thankYouVisible, setThankYouVisible] = useState(false);

  const [formData, setFormData] = useState({
    userName: user?.username || '',
    userPhone: '',
    userAddress: ''
  });

  // Pre-fill username when user loads
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        userName: user.username || ''
      }))
    }
  }, [user]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("🔒 Please log in to add items to cart");
      navigate("/login");
      return;
    }

    setCartLoading(true);
    try {
      // Uses cart.api.js which now sends token
      await addToCart({
        productId: productInfo.id,
        name: productInfo.name,
        price: productInfo.price
      });
      toast.success('🛒 Added to cart successfully!');
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('🔒 Please log in to add items to cart');
        navigate("/login");
      } else {
        toast.error('Failed to add to cart');
      }
    } finally {
      setCartLoading(false);
    }
  };

  // Login check before showing form
  const handleOrderClick = () => {
    if (!user) {
      toast.error("🔒 Please login to place an order");
      navigate("/login");
      return;
    }
    setFormVisible(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fixed WhatsApp message
  const handleSubmit = (e) => {
    e.preventDefault();

    const { userName, userPhone, userAddress } = formData;
    const total = productInfo.price * quantity;

    const message = `New Order - Shree Krishna Enterprises

Name: ${userName}
Phone: ${userPhone}
Address: ${userAddress}

Product: ${productInfo.name}
Quantity: ${quantity}
Total: ₹${total}
Payment: Cash on Delivery`;

    const ownerNumber = "919637401456";
    const whatsappUrl = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      setFormVisible(false);
      setThankYouVisible(true);
    }, 500);
  };

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1596647413661-bc935da66f07?w=300";
  };

  return (
    <>
      <Navbar />

      <div className="order-page-wrapper">
        <div className="order-page-inner">
          <section className="product-detail">

            <div className="product-detail-container">
              <img
                className="detail-img"
                src={productInfo.img}
                alt={productInfo.name}
                onError={handleImageError}
              />

              <div className="detail-info">
                <h2>{productInfo.name}</h2>
                <p>{productInfo.desc}</p>
                <span className="price-order-page">₹{productInfo.price}</span>

                {!formVisible && !thankYouVisible && (
                  <>
                    <div className="quantity-section">
                      <label>Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      />
                    </div>

                    <div className="order-btn-group">
                      <button className="btn-order-page" onClick={handleOrderClick}>
                        🚚 Place Order (COD)
                      </button>

                      <button
                        className="btn-add-to-cart"
                        onClick={handleAddToCart}
                        disabled={cartLoading}
                      >
                        {cartLoading ? <span className="cart-btn-spinner" /> : '🛒'}
                        {cartLoading ? 'Adding...' : 'Add to Cart'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* FORM */}
            {formVisible && (
              <div className="order-form">
                <h3>Place Your Order</h3>
                <form onSubmit={handleSubmit}>

                  <input
                    type="text"
                    name="userName"
                    placeholder="Full Name"
                    value={formData.userName}
                    onChange={handleFormChange}
                    required
                  />

                  <input
                    type="tel"
                    name="userPhone"
                    placeholder="Mobile Number"
                    value={formData.userPhone}
                    onChange={handleFormChange}
                    required
                  />

                  <textarea
                    name="userAddress"
                    placeholder="Delivery Address"
                    value={formData.userAddress}
                    onChange={handleFormChange}
                    required
                  />

                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button type="submit" className="btn-order-page">
                      Confirm via WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormVisible(false)}
                      style={{
                        padding: ".7rem 1.5rem",
                        background: "transparent",
                        border: "1.5px solid #555",
                        color: "#aaa",
                        borderRadius: "8px",
                        cursor: "pointer"
                      }}
                    >
                      Cancel
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* THANK YOU */}
            {thankYouVisible && (
              <div className="thankyou-msg">
                <h3>✅ Order Placed Successfully!</h3>
                <p>We will contact you on WhatsApp soon.</p>
                <button
                  className="btn-order-page"
                  style={{ marginTop: "1rem" }}
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </button>
              </div>
            )}

          </section>
        </div>
      </div>
    </>
  );
};

export default Order;