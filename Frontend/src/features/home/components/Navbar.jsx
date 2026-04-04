import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/navbar.css"

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) setIsLoggedIn(true)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  }

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

        {!isLoggedIn ? (
          <Link to="/login" className="btn-login">Login</Link>
        ) : (
          <div className="profile-container">
            <Link to="/cart" className="cart-icon" title="Cart">🛒</Link>

            {/* Default Profile Image */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="profile"
              className="profile-icon"
              title="Profile"
            />

            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        )}

      </div>

    </nav>
  )
}

export default Navbar