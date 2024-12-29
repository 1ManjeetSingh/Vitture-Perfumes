import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './featured.css';


const Featured = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/allproducts/products`); // Your API endpoint
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const calculateDiscountedPrice = (price, discount) => {
        return Math.round(price - (price * (discount / 100))); // Calculate the discounted price and round it to the nearest integer
    };

  return (
    <section className="showcase">
        <div className="searchBar">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input type="text" id="searchInput" placeholder="Search..." />
                    <span className="underline"></span>
                </div>
                <h2>Popular Products</h2>
                <div className="container">
                {Array.isArray(products) && products.length > 0 ? (
                        products.map(product => (
                            <Link to={`/Product/${product._id}`} className="product-card" key={product._id}>
                                <span>-{product.discount}%</span>
                                <img
                                    src={product.images.length > 0 ? `${import.meta.env.VITE_BACKEND_BASE_URL}/api/productImages/files/${product.images[0]}` : 'placeholder_image.jpg'}
                                    alt={product.name}
                                />
                                <h3>{product.name}</h3>
                                <p>₹ <del>{product.price.toLocaleString()}</del>
                                    &nbsp;
                                    {product.discount > 0 && (
                                        <b>{calculateDiscountedPrice(product.price, product.discount).toLocaleString()}</b>
                                    )}
                                </p>
                                <div className="cta-button">
                                    <div className='anchor'>Buy Now</div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>fetching products...</p>
                    )}
                </div>
            </section>
  )
}

export default Featured;