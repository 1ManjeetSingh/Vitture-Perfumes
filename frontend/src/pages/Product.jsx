import React, { useEffect, useState , lazy, Suspense} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import '../styles/product.css';
const ImageSlider = lazy(() => import('../components/slider/ImageSlider'));
const ProductDetails = lazy(() => import('../components/details/ProductDetails'));
const Loader = lazy(() => import('../components/loader/Loader'));
const Review = lazy(() => import('../components/review/Reviews'));

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


    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error,setError] = useState(null);

    useEffect(() => {
        // Fetch the product data from your backend API
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/allproducts/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setError('Error fetching product data:', error);
            }
        };

        fetchProduct();
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

    }, [id]);

    if (!product) {
        return (<Loader />);
    }

    return (
        <>
        <Suspense fallback={<Loader/>}>
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
        </Suspense>
        </>
    );
};

export default Product;
