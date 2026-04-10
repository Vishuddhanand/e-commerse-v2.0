import React from 'react';
import '../styles/testimonials.css';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
    const { t } = useTranslation();
    
    const reviewImages = [
        "/assets/client1.avif",
        "/assets/client2.avif",
        "/assets/client3.webp",
        "/assets/client4.avif",
        "/assets/client5.avif",
        "/assets/client6.webp"
    ];
    
    const ratings = ["★★★★★", "★★★★☆", "★★★★★", "★★★★☆", "★★★★★", "★★★★☆"];

    const reviews = reviewImages.map((img, i) => ({
        img,
        rating: ratings[i],
        text: t(`testimonials.reviews.${i}.text`),
        name: t(`testimonials.reviews.${i}.name`)
    }));

    return (
        <section className="testimonials">
            <div className="section-header">
                <h2>{t('testimonials.sectionTitle')}</h2>
                <div className="header-underline"></div>
            </div>
            
            <div className="testimonial-marquee">
                <div className="testimonial-track">
                    {/* Render first set */}
                    {reviews.map((review, i) => (
                        <div className="testimonial-card" key={`original-${i}`}>
                            <img src={review.img} alt="Client Photo" className="testimonial-img" />
                            <div className="testimonial-rating">{review.rating}</div>
                            <p>"{review.text}"</p>
                            <span>- {review.name}</span>
                        </div>
                    ))}
                    {/* Render duplicated set for seamless loop */}
                    {reviews.map((review, i) => (
                        <div className="testimonial-card" key={`duplicate-${i}`}>
                            <img src={review.img} alt="Client Photo" className="testimonial-img" />
                            <div className="testimonial-rating">{review.rating}</div>
                            <p>"{review.text}"</p>
                            <span>- {review.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
