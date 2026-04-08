import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../order/services/order.api';
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
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>#{order._id.slice(-6).toUpperCase()}</td>
                                    <td>
                                        <div className="customer-info">
                                            <strong>{order.userName}</strong>
                                            <span>{order.userPhone}</span>
                                        </div>
                                    </td>
                                    <td>{order.products.length} Items</td>
                                    <td>₹{order.totalAmount.toFixed(2)}</td>
                                    <td>
                                        <span className={`status-pill ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
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
