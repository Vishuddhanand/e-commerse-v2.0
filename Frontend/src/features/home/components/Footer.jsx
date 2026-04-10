import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/footer.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer id="footer" className="footer">
            <div className="footer-main">
                <div className="footer-section brand-section">
                    <h3>{t('footer.brandName')}</h3>
                    <p>{t('footer.address')}</p>
                </div>
                
                <div className="footer-section links-section">
                    <h4>{t('footer.quickLinks')}</h4>
                    <ul>
                        <li><a onClick={() => scrollToSection('home')} style={{cursor: 'pointer'}}>{t('footer.home')}</a></li>
                        <li><a onClick={() => scrollToSection('products')} style={{cursor: 'pointer'}}>{t('footer.products')}</a></li>
                        <li><a onClick={() => scrollToSection('categories')} style={{cursor: 'pointer'}}>{t('footer.categories')}</a></li>
                        <li><a onClick={() => scrollToSection('about')} style={{cursor: 'pointer'}}>{t('footer.aboutUs')}</a></li>
                        <li><a onClick={() => scrollToSection('footer')} style={{cursor: 'pointer'}}>{t('footer.contact')}</a></li>
                    </ul>
                </div>
                
                <div className="footer-section contact-section">
                    <h4>{t('footer.contactUs')}</h4>
                    <div className="contact-details">
                        <p><strong>Mr. Parth Bhojane</strong></p>
                        <p><span>{t('footer.phone')}:</span> +91 8149111602</p>
                        <p><span>{t('footer.email')}:</span> parthbhojane@gmail.com</p>
                    </div>
                </div>
                
                <div className="footer-section footer-logo">
                    <img src="/assets/image.png" alt="Shree Krishna Enterprises Logo" />
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
            </div>
        </footer>
    );
};

export default Footer;
