import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function getCart() {
    const response = await api.get("/api/cart")
    return response.data
}

export async function addToCart({ productId, name, price }) {
    const response = await api.post("/api/cart/add", {
        productId, name, price
    })
    return response.data
}

export async function removeFromCart(productId) {
    const response = await api.delete(`/api/cart/remove/${productId}`)
    return response.data
}

export async function clearCart() {
    const response = await api.delete("/api/cart/clear")
    return response.data
}
