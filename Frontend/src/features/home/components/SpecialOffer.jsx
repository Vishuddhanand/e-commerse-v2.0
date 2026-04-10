import React from 'react';
import '../styles/specialOffer.css';
import { useTranslation } from 'react-i18next';

const SpecialOffer = () => {
    const { t } = useTranslation();
    return (
        <section className="special">
            <div className="section-header">
                <h2>{t('specialOffer.sectionTitle')}</h2>
                <div className="header-underline"></div>
            </div>
            
            <div className="special-content">
                <div className="special-card">
                    <div className="special-badge">{t('specialOffer.limitedTime')}</div>
                    
                    <div className="special-img-wrapper">
                        <img src="/assets/splendor-drum-rubber-1000x1000.webp" alt="Splendor Drum Rubber Set" className="special-img" />
                    </div>
                    
                    <div className="special-info">
                        <h3>{t('specialOffer.featuredTitle')}</h3>
                        <p>{t('specialOffer.featuredDescription')}</p>
                        <a onClick={(e) => { e.preventDefault(); document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn special-btn" style={{cursor: 'pointer'}}>{t('specialOffer.contactForBulk')}</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffer;
