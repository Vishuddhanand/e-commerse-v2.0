import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export async function createOrder(orderData) {
    const response = await api.post("/api/orders/create", orderData);
    return response.data;
}

export async function getOrderHistory() {
    const response = await api.get("/api/orders/history");
    return response.data;
}

export async function getAllOrders() {
    const response = await api.get("/api/orders/admin/all");
    return response.data;
}

export async function updateOrderStatus(orderId, status) {
    const response = await api.patch(`/api/orders/admin/status/${orderId}`, { status });
    return response.data;
}
