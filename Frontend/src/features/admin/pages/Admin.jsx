import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../order/services/order.api';
import Navbar from '../../home/components/Navbar';
import { toast } from 'react-hot-toast';
import '../styles/admin.css';

const Admin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllOrders = async () => {
        try {
            const data = await getAllOrders();
            setOrders(data);
        } catch (err) {
            toast.error("Failed to load admin orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            toast.success("Order status updated");
            // Refresh local state
            setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
        } catch (err) {
            toast.error("Status update failed");
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to completely delete this order? This action cannot be undone.")) return;
        
        try {
            await deleteOrder(orderId);
            toast.success("Order removed successfully!");
            setOrders(prev => prev.filter(o => o._id !== orderId));
        } catch (err) {
            toast.error("Failed to delete order");
        }
    };

    if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>Admin Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="admin-dashboard">
                <div className="admin-container">
                <header className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <p>Manage customer orders and status</p>
                </header>

                <div className="orders-table-wrapper">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Mobile Number</th>
                                <th>Delivery Address</th>
                                <th>Products</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td data-label="Order ID">#{order._id.slice(-6).toUpperCase()}</td>
                                    <td data-label="Customer Name">
                                        <div className="customer-info">
                                            <strong>{order.userName}</strong>
                                        </div>
                                    </td>
                                    <td data-label="Mobile Number">
                                        <span style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: '500' }}>{order.userPhone}</span>
                                    </td>
                                    <td data-label="Delivery Address">
                                        <div style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.4', minWidth: '150px' }}>
                                            {order.userAddress ? order.userAddress : 'Not Provided'}
                                        </div>
                                    </td>
                                    <td data-label="Products">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            {order.products.map((item, idx) => (
                                                <div key={idx} style={{ fontSize: '0.85rem', color: '#374151' }}>
                                                    • {item.name || 'Product'} <span style={{ color: '#6b7280', fontWeight: '600' }}>x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td data-label="Total">₹{order.totalAmount.toFixed(2)}</td>
                                    <td data-label="Status">
                                        <span className={`status-pill ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td data-label="Actions">
                                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                className="status-select"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                            <button 
                                                onClick={() => handleDeleteOrder(order._id)}
                                                title="Delete Order"
                                                style={{
                                                    background: "rgba(255, 77, 77, 0.1)",
                                                    border: "1px solid rgba(255, 77, 77, 0.3)",
                                                    color: "#ff4d4d",
                                                    borderRadius: "6px",
                                                    padding: "6px 10px",
                                                    cursor: "pointer",
                                                    transition: "all 0.2s"
                                                }}
                                                onMouseOver={(e) => { e.currentTarget.style.background = "#ff4d4d"; e.currentTarget.style.color = "#fff"; }}
                                                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255, 77, 77, 0.1)"; e.currentTarget.style.color = "#ff4d4d"; }}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
    );
};

export default Admin;
