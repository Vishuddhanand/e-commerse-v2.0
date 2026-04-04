import React from 'react';
import '../styles/hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="hero-text">
                <h1>Shree Krishna Enterprises</h1>
                <h2>Leading Rubber Part Manufacturer</h2>
                <p>Best quality aftermarket & OEM rubber parts for all two-wheeler models.</p>
                <Link to="./assets/SHREE KRISHNA ENTERPRISES NEW PRICE LIST 2025.pdf" className="btn" download>Download Catalog</Link>
            </div>
        </section>
    );
};

export default Hero;
