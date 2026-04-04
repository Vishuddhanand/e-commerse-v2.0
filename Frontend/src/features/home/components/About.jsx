import React from 'react';
import '../styles/about.css';

const About = () => {
    return (
        <section id="about" className="about">
            <div className="about-container">
                <div className="about-content">
                    <div className="section-header align-left">
                        <h2>About Us</h2>
                        <div className="header-underline"></div>
                    </div>
                    
                    <p className="lead-text">
                        <strong>Shree Krishna Enterprises</strong> is a trusted manufacturer and supplier of high-quality two-wheeler spare parts
                        and rubber components.
                    </p>
                    <p>
                        Founded in 2010, we specialize in products like Splendor drum rubbers, Activa air
                        pipes, and brake accessories that meet strict OEM standards. Located in Pune, Maharashtra, we are committed to
                        delivering highly durable parts with reliable service to workshops and dealers across India. Our ongoing focus remains on
                        product quality, customer satisfaction, and continuous improvement to support the growing aftermarket industry.
                    </p>
                    
                    <div className="about-stats">
                        <div className="stat-item">
                            <h4>15+</h4>
                            <span>Years Experience</span>
                        </div>
                        <div className="stat-item">
                            <h4>OEM</h4>
                            <span>Quality Standard</span>
                        </div>
                        <div className="stat-item">
                            <h4>Pune</h4>
                            <span>Manufacturing Hub</span>
                        </div>
                    </div>
                </div>
                
                <div className="about-image-wrapper">
                     <div className="about-img-box">
                         <img src="/assets/generated-image.png" alt="Shree Krishna Enterprises Manufacturing" />
                         <div className="experience-badge">Since<br/>2010</div>
                     </div>
                </div>
            </div>
        </section>
    );
};

export default About;
