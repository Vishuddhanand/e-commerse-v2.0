import React, { useState } from 'react';
import '../styles/faq.css';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const { t } = useTranslation();

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [0, 1, 2, 3, 4].map(i => ({
        question: t(`faq.items.${i}.question`),
        answer: t(`faq.items.${i}.answer`)
    }));

    return (
        <section id="faq" className="faq">
            <div className="section-header">
                <h2>{t('faq.sectionTitle')}</h2>
                <div className="header-underline"></div>
            </div>
            
            <div className="faq-container">
                {faqs.map((faq, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <div 
                            key={index} 
                            className={`faq-item ${isActive ? 'active' : ''}`}
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="faq-question">
                                <h3>{faq.question}</h3>
                                {/* The plus turns into a minus gracefully */}
                                <span className="faq-icon" style={{ transform: isActive ? 'rotate(180deg)' : 'rotate(0)' }}>
                                    {isActive ? '−' : '+'}
                                </span>
                            </div>
                            <div className="faq-answer-wrapper">
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FAQ;
