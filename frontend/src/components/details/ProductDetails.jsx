import React, { useState } from 'react';
import { message } from 'antd';
import './details.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ProductDetails = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

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

    const handleAddToCart = async () => {
        const token = JSON.parse(localStorage.getItem("token"));        
            if (!token) {
                navigate("/login");
                return;
            }
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/cartItems/addItem/${product._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.value}`
                },
                body: JSON.stringify({ quantity }),
            });

            const data = await response.json();

            if(response.status === 500){
                message.error("Internal Server Error");
                return;
            } else if(!data.success){
                navigate("/login");
                return;
              }

            message.success(data.message);

        } catch (error) {
            console.error("Error adding item to cart:", error);
            message.error("Something went wrong. Please try again.");
        }
    }

    // Calculate discount price
    const salePrice = (product.price - (product.price * product.discount) / 100).toFixed(0);

    return (
        <div className='inline-component'>
            <div className="productContainer">
                <h1 className='leading-tight sm:leading-normal'>{product.name}</h1>
                <p className="sub-heading leading-tight sm:leading-normal">{product.flavour || "Product Category"}</p>

                <div className="rating leading-tight sm:leading-normal">
                    <span>⭐ 4.6</span>
                    <span>|</span>
                    <span>(1033 Reviews)</span>
                </div>

                <div className="priceSection leading-tight sm:leading-normal">
                    <p className="sale-price">₹ {salePrice}</p>
                    <p className="regular-price">MRP: ₹ {product.price}</p>
                    <p className="discount">-{product.discount}%</p>
                    <p className="inclusive-tax">Inclusive of all taxes</p>
                </div>

                <p className="description leading-tight sm:leading-normal">
                    {isExpanded
                        ? product.description
                        : `${product.description.slice(0, 100)}...`}
                    <button onClick={handleToggleDescription} className="read-more">
                        {isExpanded ? "Read less" : "Read more"}
                    </button>
                </p>

                <div className="quantity leading-tight sm:leading-normal">
                    <button onClick={handleDecrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>

                <button className="addToCart" onClick={handleAddToCart}>Add to cart</button>
                <button className="buyNow">Buy Now</button>
            </div>
        </div>
    );
};

export default ProductDetails;
