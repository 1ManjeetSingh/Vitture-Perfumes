import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './featured.css';


const Featured = () => {

    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");  
    const [filteredProducts, setFilteredProducts] = useState([]); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/allproducts/products`); // Your API endpoint
                const data = await response.json();
                console.log(data);
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

     const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter products based on search query
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.description.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    };

    const calculateDiscountedPrice = (price, discount) => {
        return Math.round(price - (price * (discount / 100)) - 0.5); 
    };

  return (
    <section className="showcase pt-4">
        <div className="searchBar">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input className='pb-1 px-2' type="text" id="searchInput" placeholder="Search..." value={searchQuery}
                    onChange={handleSearch}/>
                    <span className="underline"></span>
                </div>
                <h2>Popular Products</h2>
                <div className="container">
                {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <Link to={`/Product/${product._id}`} className="product-card" key={product._id}>
                                <span className='absolute text-xs sm:text-lg'>-{product.discount}%</span>
                                <div>
                                <img
                                    src={product.images.length > 0 ? `${import.meta.env.VITE_BACKEND_BASE_URL}/api/productImages/files/${product.images[0]}` : './perfume.webp'}
                                    alt={product.name}
                                    onError={(e) => { e.target.src = "./perfume.webp"; }} 
                                    loading="lazy"
                                />
                                </div>
                                <h3 className='text-sm sm:text-lg overflow-hidden whitespace-nowrap text-ellipsis'>{product.name}</h3>
                                <p className='text-sm sm:text-lg'>₹ <del>{product.price.toLocaleString()}</del>
                                    &nbsp;
                                    {product.discount > 0 && (
                                        <b>{calculateDiscountedPrice(product.price, product.discount).toLocaleString()}</b>
                                    )}
                                </p>
                                <div className="cta-button">
                                    <div className='anchor'>Buy Now</div>
                                </div>
                            </Link>
                        ))) : (<p>No products found</p>)}
                </div>
            </section>
  )
}

export default Featured;