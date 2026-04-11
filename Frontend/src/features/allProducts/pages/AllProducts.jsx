import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import productsData from '../../../data/product';
import { Link } from 'react-router-dom';
import '../styles/allProducts.css';
import '../../home/styles/products.css'; // Reuse existing product grid styling

const AllProducts = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('default');

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredAndSortedProducts = useMemo(() => {
        // 1. Filter
        let result = productsData.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.desc.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // 2. Sort
        if (sortOrder === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [searchQuery, sortOrder]);

    return (
        <>
            <Navbar />
            <div className="all-products-page">
                <div className="all-products-header">
                    <h1>Our Products</h1>
                    
                    <div className="all-products-controls">
                        <input 
                            type="text" 
                            className="search-bar-input" 
                            placeholder="🔍 Search for products by name or category..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        
                        <select 
                            className="sort-select" 
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="default">Sort by: Recommended</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="all-products-container">
                    {filteredAndSortedProducts.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "100px 0", color: "#6b7280", fontSize: "1.2rem", fontWeight: "500" }}>
                            No products found matching "{searchQuery}".
                        </div>
                    ) : (
                        <div className="product-grid">
                            {filteredAndSortedProducts.map(product => (
                                <Link to={`/order?product=${product.id}`} className="product-card" key={product.id}>
                                    <div className="product-img">
                                        <img src={product.img} alt={product.name} />
                                    </div>
                                    <h3>{product.name}</h3>
                                    <p>{product.desc}</p>
                                    <span className="price">₹{product.price} per item</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AllProducts;
