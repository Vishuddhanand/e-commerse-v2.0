import React from 'react';
import '../styles/testimonials.css';

const Testimonials = () => {
    // Array approach allows for easy duplication to create a seamless infinite CSS loop
    const reviews = [
        { img: "/assets/client1.avif", rating: "★★★★★", text: "Best quality drum rubbers! Fast service and genuine rates.", name: "Auto Parts Dealer" },
        { img: "/assets/client2.avif", rating: "★★★★☆", text: "One stop for all two-wheeler rubber parts. Highly recommended.", name: "Workshop Owner" },
        { img: "/assets/client3.webp", rating: "★★★★★", text: "Excellent product quality and fast delivery every time.", name: "Bike Shop Owner" },
        { img: "/assets/client4.avif", rating: "★★★★☆", text: "Reliable parts supplier with great customer support.", name: "Auto Repair Mechanic" },
        { img: "/assets/client5.avif", rating: "★★★★★", text: "Competitive prices and genuine spare parts, highly recommend.", name: "Motorbike Dealer" },
        { img: "/assets/client6.webp", rating: "★★★★☆", text: "Best rubber parts for two-wheelers, top-notch quality every time.", name: "Workshop Manager" }
    ];

    return (
        <section className="testimonials">
            <div className="section-header">
                <h2>What Our Clients Say</h2>
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
