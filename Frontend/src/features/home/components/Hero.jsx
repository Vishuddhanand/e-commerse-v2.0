import React from 'react';
import '../styles/hero.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();
    return (
        <section className="hero" id="home">
            <div className="hero-text">
                <h1>{t('hero.title')}</h1>
                <h2>{t('hero.subtitle')}</h2>
                <p>{t('hero.description')}</p>
                <Link  target="_blank" to="/assets/SHREE KRISHNA ENTERPRISES NEW PRICE LIST 2025.pdf" className="btn" download>{t('hero.downloadCatalog')}</Link>
            </div>
        </section>
    );
};

export default Hero;
