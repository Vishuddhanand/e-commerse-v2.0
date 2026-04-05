import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/navbar.css"
import { useAuth } from '../../auth/hooks/useAuth';

const Navbar = () => {

  const { user, handleLogout } = useAuth();

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
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/categories" className="nav-link">Categories</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>

      <div className="nav-right">

        {!user ? (
          <Link to="/login" className="btn-login">Login</Link>
        ) : (
          <div className="profile-container">
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

            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        )}

      </div>

    </nav>
  )
}

export default Navbar