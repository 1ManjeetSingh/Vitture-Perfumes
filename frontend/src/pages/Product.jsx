import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ImageSlider from '../components/slider/ImageSlider';
import ProductDetails from '../components/details/ProductDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import '../styles/product.css';
import Loader from '../components/loader/Loader';
import Review from '../components/review/Reviews';

const Product = () => {

    const navigate = useNavigate();

    const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Check out this webpage!',
              text: 'I found this interesting and wanted to share it with you.',
              url: window.location.href,
            });
            console.log("Shared successfully");
          } catch (error) {
            console.error("Error sharing:", error);
          }
        } else {
          console.log("Web Share API is not supported in this browser.");
        }
      };

    window.scrollTo({
        top: 60,
        behavior: 'smooth',
    });
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch the product data from your backend API
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/allproducts/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return (<Loader />);
    }

    return (
        <>
            <div className='product-row'>
                    <FontAwesomeIcon onClick={()=>navigate(-1)} icon={faArrowLeft} className='home home-icon' />
                <button onClick={handleShare} className='share-icon'>
                    <FontAwesomeIcon icon={faShareNodes} className='share' />
                </button>
                <div className='relative'>
                <ImageSlider images={product.images} />
                </div>
                <ProductDetails product={product} />  
            </div>
            <hr/>
            <div className='reviews pb-4 flex justify-center'>
                <Review id={id} />
            </div>
        </>
    );
};

export default Product;
