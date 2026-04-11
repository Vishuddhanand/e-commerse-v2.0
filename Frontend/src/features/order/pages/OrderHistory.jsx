import React, { useState, useEffect } from 'react';
import { getOrderHistory } from '../services/order.api';
import { generateInvoice } from '../services/invoice.service';
import { toast } from 'react-hot-toast';
import Navbar from '../../home/components/Navbar';
import '../styles/order-history.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderHistory();
        setOrders(data);
      } catch (err) {
        toast.error("Failed to load order history");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="order-history-container" style={{ textAlign: 'center', padding: '100px 0', color: 'white' }}>
          Loading your orders...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="order-history-page">
        <div className="order-history-container">
          <header className="page-header">
            <h1>My Order History</h1>
            <p>Track and view all your past orders</p>
          </header>

          {orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h2>No orders found</h2>
              <p>You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <div className="order-id">
                      <span className="label">Order ID:</span>
                      <span className="value">#{order._id.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </div>
                  </div>

                  <div className="order-body">
                    <div className="products-list">
                      {order.products.map((item, idx) => (
                        <div key={idx} className="product-item">
                          <span className="product-name">{item.name}</span>
                          <span className="product-qty">x{item.quantity}</span>
                          <span className="product-price">₹{item.total.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-info">
                      <div className="shipping-address">
                        <span className="label">Delivery to:</span>
                        <p>{order.userAddress}</p>
                      </div>
                      <div className="order-status-total">
                        <div className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </div>
                        <div className="total-amount">
                          <span className="label">Total:</span>
                          <span className="value">₹{order.totalAmount.toFixed(2)}</span>
                        </div>
                        <button 
                          onClick={() => generateInvoice(order)}
                          style={{ marginLeft: "auto", padding: "6px 12px", background: "#ff9800", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                          Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
