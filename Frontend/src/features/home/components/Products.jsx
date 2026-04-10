import React from 'react';
import '../styles/products.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Products = () => {
    const { t } = useTranslation();
    return (
        <section id="products" className="products">
            <div className="section-header">
                <h2>{t('products.sectionTitle')}</h2>
                <div className="header-underline"></div>
            </div>
            
            <div className="product-grid">

                <Link to="/order?product=splendor-drum-rubber" className="product-card">
                    <div className="product-img">
                        <img src="/assets/splendor-drum-rubber-1000x1000.webp" alt="" />
                    </div>
                    <h3>Splendor Drum Rubber</h3>
                    <p>OE Quality, Set of 5</p>
                    <span className="price">₹24 per item</span>
                </Link>

                <Link to="/order?product=pulsar-drum-rubber" className="product-card">
                    <div className="product-img">
                        <img src="/assets/Pulsar 4 hole Drum rubber.jpeg" alt="" />
                    </div>
                    <h3>Pulsar Drum Rubber</h3>
                    <p>OE Quality</p>
                    <span className="price">₹38 per item</span>
                </Link>

                <Link to="/order?product=activa-air-pipe" className="product-card">
                    <div className="product-img">
                        <img src="/assets/Activa air pipe.jpeg" alt="" />
                    </div>
                    <h3>Activa Air Pipe</h3>
                    <p>OE Quality</p>
                    <span className="price">₹20 per item</span>
                </Link>

                <Link to="/order?product=unicorn-shocker-seal" className="product-card">
                    <div className="product-img">
                        <img src="/assets/honda-unicorn-fork-oil-seal-500x500.webp" alt="" />
                    </div>
                    <h3>Shocker Seal Unicorn</h3>
                    <p>OE Quality</p>
                    <span className="price">₹19 per item</span>
                </Link>

                <Link to="/order?product=unicorn-air-filter" className="product-card">
                    <div className="product-img">
                        <img src="/assets/Unicorn.jpg" alt="" />
                    </div>
                    <h3>Unicorn Air Filter</h3>
                    <p>OE Quality</p>
                    <span className="price">₹67 per item</span>
                </Link>

                <Link to="/order?product=bullet-air-filter" className="product-card">
                    <div className="product-img">
                        <img src="/assets/Bullet Air Filter.webp" alt="" />
                    </div>
                    <h3>Bullet Air Filter</h3>
                    <p>OE Quality</p>
                    <span className="price">₹90 per item</span>
                </Link>

                <Link to="/order?product=brek-liver-hero-honda" className="product-card">
                    <div className="product-img">
                        <img src="/assets/Brake liver hero honda.webp" alt="" />
                    </div>
                    <h3>Brake Lever Hero Honda</h3>
                    <p>OE Quality</p>
                    <span className="price">₹35 per item</span>
                </Link>

                <Link to="/order?product=break-pad-pulsur" className="product-card">
                    <div className="product-img">
                        <img src="/assets/Brake Pad Pulsur.webp" alt="" />
                    </div>
                    <h3>Brake Pad Pulsar</h3>
                    <p>OE Quality</p>
                    <span className="price">₹60 per item</span>
                </Link>

            </div>
        </section>
    );
};

export default Products;