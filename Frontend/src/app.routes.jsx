import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Home from './features/home/pages/Home';
import Cart from './features/cart/pages/Cart';
import Order from './features/order/pages/Order';
import Category from './features/categories/pages/Category'
import Profile from './features/auth/pages/Profile';
import AuthSuccess from './features/auth/pages/AuthSuccess';
import OrderHistory from './features/order/pages/OrderHistory';
import Admin from './features/admin/pages/Admin';
import AllProducts from './features/allProducts/pages/AllProducts';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/order" element={<Order />} />
                <Route path="/category/:categoryName" element={<Category />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/auth/success" element={<AuthSuccess />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
