import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/navbar.css"
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {

  const { user, handleLogout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // Not on home page → navigate first then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Delay to ensure home page has rendered
    } else {
      // Already on home page → just scroll
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className='navbar'>

      <div className="nav-left">
        <Link to="/" className="brand-logo">
          <img
            src="/assets/image.png"
            alt="Logo"
            className="brand-icon"
          />
        </Link>
      </div>

      <div className="nav-middle">
        <span className="nav-link" onClick={() => scrollToSection('home')}>Home</span>
        <span className="nav-link" onClick={() => scrollToSection('products')}>Products</span>
        <span className="nav-link" onClick={() => scrollToSection('categories')}>Categories</span>
        <span className="nav-link" onClick={() => scrollToSection('about')}>About</span>
        <span className="nav-link" onClick={() => scrollToSection('footer')}>Contact</span>
      </div>

      <div className="nav-right">

        {!user ? (
          <Link to="/login" className="btn-login">Login</Link>
        ) : (
          <div className="profile-container">
            {user.role === 'admin' && (
              <Link to="/admin" className="nav-link admin-link" title="Admin Dashboard">Dashboard</Link>
            )}
            <Link to="/order-history" className="nav-link" title="My Orders">Orders</Link>
            <Link to="/cart" className="cart-icon" title="Cart">🛒</Link>

            {/* Default Profile Image */}
            <Link to="/profile">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="profile"
                className="profile-icon"
                title="Profile"
              />
            </Link>

            {/* <button onClick={handleLogout} className="btn-logout">Logout</button> */}
          </div>
        )}

      </div>

    </nav>
  )
}

export default Navbar