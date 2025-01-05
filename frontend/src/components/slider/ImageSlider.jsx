// src/ImageSlider.js
import React from 'react';
import Slider from 'react-slick';
import './slider.css';
import NextArrow from './NextArrow'; // Import NextArrow component
import PrevArrow from './PrevArrow'; // Import PrevArrow component

export default function ImageSlider({ images = [] }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 4000,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    const imageUrls = images.map((imageId) => 
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/productImages/files/${imageId}`
    );

    return (
        <div className="image-slider py-8">
            <Slider {...settings}>
                {imageUrls.map((url, index) => (
                    <div key={index} className="product-image">
                        <img src={url} alt={`Slide ${index + 1}`} loading="lazy" />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
