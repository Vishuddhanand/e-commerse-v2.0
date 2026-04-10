import React from 'react';
import '../styles/about.css';
import { useTranslation, Trans } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();
    return (
        <section id="about" className="about">
            <div className="about-container">
                <div className="about-content">
                    <div className="section-header align-left">
                        <h2>{t('about.sectionTitle')}</h2>
                        <div className="header-underline"></div>
                    </div>
                    
                    <p className="lead-text">
                        <Trans i18nKey="about.leadText">
                            <strong>Shree Krishna Enterprises</strong> is a trusted manufacturer and supplier of high-quality two-wheeler spare parts and rubber components.
                        </Trans>
                    </p>
                    <p>{t('about.description')}</p>
                    
                    <div className="about-stats">
                        <div className="stat-item">
                            <h4>15+</h4>
                            <span>{t('about.yearsExperience')}</span>
                        </div>
                        <div className="stat-item">
                            <h4>OEM</h4>
                            <span>{t('about.qualityStandard')}</span>
                        </div>
                        <div className="stat-item">
                            <h4>{t('about.manufacturingHub') === 'Manufacturing Hub' ? 'Pune' : 'पुणे'}</h4>
                            <span>{t('about.manufacturingHub')}</span>
                        </div>
                    </div>
                </div>
                
                <div className="about-image-wrapper">
                     <div className="about-img-box">
                         <img src="/assets/generated-image.png" alt="Shree Krishna Enterprises Manufacturing" />
                         <div className="experience-badge">{t('about.since')}<br/>2010</div>
                     </div>
                </div>
            </div>
        </section>
    );
};

export default About;
