import React from 'react';
import '../styles/specialOffer.css';

const SpecialOffer = () => {
    return (
        <section className="special">
            <div className="section-header">
                <h2>Special Offer</h2>
                <div className="header-underline"></div>
            </div>
            
            <div className="special-content">
                <div className="special-card">
                    <div className="special-badge">Limited Time</div>
                    
                    <div className="special-img-wrapper">
                        <img src="/assets/splendor-drum-rubber-1000x1000.webp" alt="Splendor Drum Rubber Set" className="special-img" />
                    </div>
                    
                    <div className="special-info">
                        <h3>Featured: Splendor Drum Rubber Set</h3>
                        <p>Get special locked-in pricing on bulk orders. Essential for bike workshops, distributors, and resellers looking to maximize margins with OEM quality stock.</p>
                        <a href="#footer" className="btn special-btn">Contact for Bulk Rate</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffer;
