import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer id="footer" className="footer">
            <div className="footer-main">
                <div className="footer-section brand-section">
                    <h3>Shree Krishna Enterprises</h3>
                    <p>
                        Gat No. 1780, Chakan - Shikrapur Road<br />
                        Shel Pimpalgaon, Pune, Maharashtra - 410501
                    </p>
                </div>
                
                <div className="footer-section links-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/categories">Categories</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                
                <div className="footer-section contact-section">
                    <h4>Contact Us</h4>
                    <div className="contact-details">
                        <p><strong>Mr. Parth Bhojane</strong></p>
                        <p><span>Phone:</span> +91 8149111602</p>
                        <p><span>Email:</span> parthbhojane@gmail.com</p>
                    </div>
                </div>
                
                <div className="footer-section footer-logo">
                    <img src="/assets/image.png" alt="Shree Krishna Enterprises Logo" />
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Shree Krishna Enterprises. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
