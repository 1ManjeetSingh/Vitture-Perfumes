import React, { useState } from 'react';
import './details.css';

const ProductDetails = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    // Calculate discount price
    const salePrice = (product.price - (product.price * product.discount) / 100).toFixed(0);

    return (
        <div className='inline-component'>
            <div className="productContainer">
                <h1>{product.name}</h1>
                <p className="sub-heading">{product.flavour || "Product Category"}</p>

                <div className="rating">
                    <span>⭐ 4.6</span>
                    <span>|</span>
                    <span>(1033 Reviews)</span>
                </div>

                <div className="priceSection">
                    <p className="sale-price">₹ {salePrice}</p>
                    <p className="regular-price">MRP: ₹ {product.price}</p>
                    <p className="discount">-{product.discount}%</p>
                    <p className="inclusive-tax">Inclusive of all taxes</p>
                </div>

                <p className="description">
                    {isExpanded 
                        ? product.description
                        : `${product.description.slice(0, 100)}...`}
                    <button onClick={handleToggleDescription} className="read-more">
                        {isExpanded ? "Read less" : "Read more"}
                    </button>
                </p>

                <div className="quantity">
                    <button onClick={handleDecrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>

                <button className="addToCart">Add to cart</button>
                <button className="buyNow">Buy Now</button>
            </div>
        </div>
    );
};

export default ProductDetails;
