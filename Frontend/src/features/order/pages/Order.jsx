import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/order.css';
import products from '../../../data/product'; // ✅ IMPORT YOUR MAIN DATA

const Order = () => {
  const [searchParams] = useSearchParams();

  // ✅ Get product ID from URL
  const productId = searchParams.get('product');

  // ✅ Find product from array
  const productInfo =
    products.find((p) => p.id === productId) || products[0];

  const [quantity, setQuantity] = useState(1);

  const [formData, setFormData] = useState({
    userName: '',
    userPhone: '',
    userAddress: ''
  });

  const [formVisible, setFormVisible] = useState(false);
  const [thankYouVisible, setThankYouVisible] = useState(false);

  // Add to Cart state
  const [cartToast, setCartToast] = useState(null); // { type: 'success' | 'error' | 'login', msg: '' }
  const [cartLoading, setCartLoading] = useState(false);

  const showToast = (type, msg) => {
    setCartToast({ type, msg });
  };

  useEffect(() => {
    if (!cartToast) return;
    const t = setTimeout(() => setCartToast(null), 3000);
    return () => clearTimeout(t);
  }, [cartToast]);

  const handleAddToCart = async () => {
    setCartLoading(true);
    try {
      await axios.post(
        'http://localhost:3000/api/cart/add',
        {
          productId: productInfo.id,
          name: productInfo.name,
          price: productInfo.price
        },
        { withCredentials: true }
      );
      showToast('success', '🛒 Added to cart successfully!');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        showToast('login', '🔒 Please log in to add items to cart');
      } else {
        showToast('error', 'Server unreachable. Is the backend running?');
      }
    } finally {
      setCartLoading(false);
    }
  };

  const handleOrderClick = () => {
    setFormVisible(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { userName, userPhone, userAddress } = formData;

    const message = `New order received!%0A
Name: ${userName}%0A
Phone: ${userPhone}%0A
Address: ${userAddress}%0A
Product: ${productInfo.name}%0A
Quantity: ${quantity}%0A
Payment: Cash on Delivery`;

    const ownerNumber = "919112162207";

    const whatsappUrl = `https://wa.me/${ownerNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      setFormVisible(false);
      setThankYouVisible(true);
    }, 500);
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1596647413661-bc935da66f07?w=300";
  };

  return (
    <div className="order-page-wrapper">
      {/* Cart Toast Notification */}
      {cartToast && (
        <div className={`cart-toast cart-toast--${cartToast.type}`}>
          {cartToast.msg}
        </div>
      )}
      <div className="order-page-inner">
        <section className="product-detail">

          {/* ✅ PRODUCT INFO */}
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
              <span className="price-order-page">
                ₹{productInfo.price}
              </span>

              {!formVisible && !thankYouVisible && (
                <>
                  <div className="quantity-section">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Number(e.target.value))
                      }
                    />
                  </div>

                  <div className="order-btn-group">
                    <button
                      className="btn-order-page"
                      onClick={handleOrderClick}
                    >
                      🚚 Place Order (COD)
                    </button>

                    <button
                      className="btn-add-to-cart"
                      onClick={handleAddToCart}
                      disabled={cartLoading}
                    >
                      {cartLoading ? (
                        <span className="cart-btn-spinner" />
                      ) : (
                        '🛒'
                      )}
                      {cartLoading ? 'Adding...' : 'Add to Cart'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ✅ FORM */}
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

                <button type="submit" className="btn-order-page">
                  Confirm via WhatsApp
                </button>
              </form>
            </div>
          )}

          {/* ✅ THANK YOU */}
          {thankYouVisible && (
            <div className="thankyou-msg">
              <h3>✅ Order Placed Successfully!</h3>
              <p>We will contact you on WhatsApp soon.</p>
            </div>
          )}

        </section>
      </div>
    </div>
  );
};

export default Order;