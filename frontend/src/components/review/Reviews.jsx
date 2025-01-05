// src/components/review/Reviews.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './review.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Reviews = ({ id }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const productId = id;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/reviews/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) {
            console.error('Invalid date:', dateString);
            return 'Invalid date';
        }

        const date = new Date(dateString);

        if (isNaN(date.getTime())) { // Check if date is valid
            console.error('Invalid date:', dateString);
            return 'Invalid date';
        }

        // Set options for formatting the date
        const options = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        };

        // Convert to Indian Standard Time (IST)
        const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

        return istDate.toLocaleDateString('en-IN', options);
    };


    // Function to handle star click
    const handleClick = (rate) => {
        setRating(rate); // Set the rating state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/reviews`, {
                productId,
                rating,
                comment
            });

            if (response.status === 201) {
                const newReview = response.data;
                setReviews((prevReviews) => [...prevReviews, newReview]);
                toast.success("Review submitted successfully!");
                setRating(0);
                setComment('');
            }

        } catch (error) {
            console.error("Error submitting review", error);
            if(error.status === 400){
                toast.error("All fields are Required");
            }
            else if(error.status === 500){
                toast.error("Error submitting review!");
            }
        }
    };

    const [reviewsLength,setReviewsLength] = useState(2);

    const toggleReview=()=>{
        if(reviewsLength===2){
            setReviewsLength(reviews.length);
        }
        else{
            setReviewsLength(2);
        }
    }

    return (
        <div className='review-section flex flex-col items-center'>
            <h3>Reviews</h3>
            <form onSubmit={handleSubmit} className='review-card'>
                <div className="star-rating">
                    {Array.from({ length: 5 }, (_, index) => {
                        const starValue = index + 1;
                        return (
                            <span
                                key={index}
                                className={`star ${starValue <= rating ? 'filled' : ''}`}
                                onClick={() => handleClick(starValue)}
                                role="button"
                                aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
                            >
                                ★
                            </span>
                        );
                    })}
                </div>
                <div className='comment'>
                    <input
                        type="text"
                        id="comment"
                        placeholder="comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button type='submit' className='send'><FontAwesomeIcon icon={faPaperPlane} /></button>
                    <p className="underline"></p>
                </div>
            </form>
            {reviews.length > 0 ? (
                reviews.slice(0,reviewsLength).map((review) => (
                    <div key={review._id} className="review-card">
                        <h4>{review.userName}</h4>
                        <span className="review-date" style={{ float: 'right', fontSize: '12px', color: '#999' }}>
                            {formatDate(review.createdAt)}
                        </span>
                        <p>{'⭐'.repeat(review.rating)}</p>
                        <p>{review.comment}</p>
                    </div>
                ))
            ) : (
                <p className='my-6'>No reviews available for this product.</p>
            )}

            <hr className='w-full' />
            {(reviews.length <= 2) ? '' :<h2 className='text-[#2291ff] w-full font-bold text-md px-3 py-2 sm:pb-6'><span onClick={toggleReview} className='cursor-pointer'>{reviewsLength > 2 ? '< See less reviews' : 'See more reviews >'}</span></h2>}
            <hr className='w-full sm:hidden' />
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default Reviews;
