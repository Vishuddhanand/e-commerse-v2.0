import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../styles/navbar.css"
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../translation/components/LanguageSwitcher';

const Navbar = () => {

  const { user, handleLogout } = useAuth();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  const scrollToSection = (sectionId) => {
    closeMenu();
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
    <>
      <nav className='navbar'>

        <div className="nav-left">
          <Link to="/" className="brand-logo" onClick={closeMenu}>
            <img
              src="/assets/image.png"
              alt="Logo"
              className="brand-icon"
            />
          </Link>
        </div>

        {/* Desktop nav links */}
        <div className="nav-middle">
          <span className="nav-link" onClick={() => scrollToSection('home')}>{t('navbar.home')}</span>
          <span className="nav-link" onClick={() => scrollToSection('products')}>{t('navbar.products')}</span>
          <span className="nav-link" onClick={() => scrollToSection('categories')}>{t('navbar.categories')}</span>
          <span className="nav-link" onClick={() => scrollToSection('about')}>{t('navbar.about')}</span>
          <span className="nav-link" onClick={() => scrollToSection('footer')}>{t('navbar.contact')}</span>
        </div>

        {/* Desktop right actions */}
        <div className="nav-right">
          <LanguageSwitcher />

          {!user ? (
            <Link to="/login" className="btn-login">{t('navbar.login')}</Link>
          ) : (
            <div className="profile-container">
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link admin-link" title={t('navbar.dashboard')}>{t('navbar.dashboard')}</Link>
              )}
              <Link to="/order-history" className="nav-link" title={t('navbar.orders')}>{t('navbar.orders')}</Link>
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
    </>
  )
}

export default Navbar