import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import '../styles/home.css';
// import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
// import Featured from '../components/featured/Featured';
const Featured = lazy(() => import('../components/featured/Featured'));

const Home = () => {

    return (
        <>
            <section className='highlights'>
                <img src='https://irfe.com/wp-content/uploads/2024/04/A-collection-of-the-expensive-perfumes-for-women-displayed-on-a-luxurious-vanity.jpg' loading="lazy" alt='' />
                <div className='offer-heading' style={{userSelect: "none"}}>
                    Special Offer
                    <span></span>
                </div>
                <a href='#offerProducts' className='offer-link'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Buy any 3 for 1999/- Only
                </a>
            </section>

            <section className='featuredProducts' id='offerProducts'>
                <Suspense fallback={<div className='py-10'>Loading...</div>}>
                    <Featured />
                </Suspense>
            </section>
        </>
    );
};

export default Home;
