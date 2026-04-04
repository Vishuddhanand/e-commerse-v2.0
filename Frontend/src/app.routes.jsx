import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Home from './features/home/pages/Home';
import Cart from './features/cart/pages/Cart';
import Order from './features/order/pages/Order';
import Category from './features/categories/pages/Category'



function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
                <Route path="/category/:categoryName" element={<Category />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;