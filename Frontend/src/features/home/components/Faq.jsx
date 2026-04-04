import React, { useState } from 'react';
import '../styles/faq.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What types of two-wheeler rubber parts do you manufacture?",
            answer: "We manufacture a wide range of OEM-quality rubber components including drum rubbers (Splendor, Pulsar), shocker seals, air pipes (Activa), air filters, and brake/clutch parts for major two-wheeler brands."
        },
        {
            question: "Do you supply parts for bulk or wholesale orders?",
            answer: "Yes! We specialize in B2B wholesale distribution. Special discounted pricing is actively available for bike workshops, local dealers, and direct resellers ordering in bulk quantities."
        },
        {
            question: "Are your rubber components compatible with all bike models?",
            answer: "Our components are precision-engineered to perfectly fit specific models like Hero Honda, Pulsar, Activa, Enfield Bullet, and Unicorn. Please refer to our product catalog for exact compatibility."
        },
        {
            question: "Do you ship nationwide across India?",
            answer: "Absolutely. Our manufacturing hub is located in Pune, but we boast a robust logistics network capable of delivering safely packaged bulk orders to workshops anywhere across India."
        },
        {
            question: "How can I request a sample or a complete product catalog?",
            answer: "You can download our full 2025 Price List directly from the homepage. Alternatively, contact Mr. Parth Bhojane directly via phone or email for specific sample requests and custom requirements."
        }
    ];

    return (
        <section id="faq" className="faq">
            <div className="section-header">
                <h2>Frequently Asked Questions</h2>
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
