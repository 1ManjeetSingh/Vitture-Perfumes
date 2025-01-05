import React, { useState, useEffect } from 'react'
import './profileComponents.css';

const Orders = () => {
    const [rating, setRating] = useState();

    const handleClick = (rate) => {
        setRating(rate);
    };

    const orderItems = [
        {
            id: 1,
            itemName: `Bacca Bucci® Zeus Men Fashion Sneakers/Running Shoes`,
            quantity: 2,
            image: 'https://m.media-amazon.com/images/I/716kSfEScGS._AC_AA180_.jpg',
            price: 2999,
            discount: 50,
            orderDate: 'date',
            delivered: true,
        }, {
            id: 2,
            itemName: `Bacca Bucci® Zeus Men Fashion Sneakers/Running Shoes`,
            quantity: 1,
            image: 'https://m.media-amazon.com/images/I/716kSfEScGS._AC_AA180_.jpg',
            price: 2999,
            discount: 20,
            orderDate: 'date',
            delivered: true,
        },
        {
            id: 3,
            itemName: `Bacca Bucci® Zeus Men Fashion Sneakers/Running Shoes`,
            quantity: 2,
            image: 'https://m.media-amazon.com/images/I/716kSfEScGS._AC_AA180_.jpg',
            price: 2999,
            discount: 50,
            orderDate: 'date',
            delivered: false,
        },
    ];

    const discountedPrice = (price, discount) => {
        return Math.round(price * (1 - (discount) / 100) - 0.5);
    }

    return (
        <>
            <div className='flex w-full h-[92vh]'>

                <div className='left-space h-full w-[258px]'>
                </div>

                <div className='orders-container w-full h-full flex flex-col pr-8 pl-12 py-4 justify-start items-center'>
                    <p className='flex w-full bg-[#cecece] text-lg sm:text-2xl font-[600] h-[40px] justify-center items-center mb-2'>
                        Your Orders
                    </p>
                    <div className='orders-container w-full h-full flex flex-col gap-4 justify-start items-center overflow-y-auto custom-scrollbar pt-2'>
                        {orderItems.map((item) => {
                            return (
                                <div key={item.id} className="order-items flex flex-col w-full bg-white shadow-md rounded-lg">
                                    <div className='pt-2 px-4'>
                                        {item.delivered ? <span className='text-[#222222]'>Delivery Expexted &nbsp;</span> : <span className='text-[#AAAAAA]'>Delivered On &nbsp;</span>}
                                    </div>
                                    <div className="order-items flex w-full rounded-lg relative p-4 mb-2">
                                        <div className="item-image w-[100px] sm:w-[160px] h-auto flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.itemName}
                                                loading="lazy"
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col grow gap-3 ml-6 justify-center card-details">
                                            <h2 className="text-sm sm:text-lg font-semibold">{item.itemName}</h2>
                                            <h2 className="text-sm hidden sm:text-lg font-semibold">{`${item.itemName.slice(0, 40)}...`}</h2>
                                            <div className='flex w-full gap-8'>
                                                <div className='flex flex-col grow items-start'>
                                                    <div className='flex items-center gap-1'>
                                                        <span className='text-sm bg-red-600 text-white rounded-md p-[2px] sm:p-1'>-{item.discount}%</span>
                                                        <span className='text-sm sm:text-lg font-semibold'>&nbsp;₹{discountedPrice(item.price, item.discount)}</span>
                                                    </div>
                                                    <div>
                                                        <span className='text-sm sm:text-lg font-light'>M.R.P.: <del>₹{item.price}</del></span>
                                                    </div>
                                                </div>
                                                <div>
                                                </div>
                                            </div>
                                            <div className='order-items-bottom flex items-center justify-between gap-4'>
                                                <div className="flex items-center space-x-4 p-2 w-fit border rounded-lg">
                                                    <span className="text-sm sm:text-lg leading-tight">Quantity :</span>
                                                    <span className="text-sm sm:text-lg leading-tight">{item.quantity}</span>
                                                </div>
                                                <div className='order-items-bottom-buttons text-sm text-[#7796B6] flex gap-4 cursor-default overflow-hidden whitespace-nowrap text-ellipsis'>
                                                    <div className='flex flex-col'>
                                                        <div className='flex py-1'>
                                                            {Array.from({ length: 5 }, (_, index) => {
                                                                const starValue = index + 1;
                                                                return (
                                                                    <span
                                                                        key={index}
                                                                        className={`order-star ${starValue <= rating ? 'filled' : ''}`}
                                                                        onClick={() => handleClick(starValue)}
                                                                        role="button"
                                                                        aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
                                                                    >
                                                                        ★
                                                                    </span>
                                                                );
                                                            })}
                                                        </div>
                                                        <span className='order-star-rating text-sm sm:text-md'>Rate this Product &nbsp;</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            );
                        })}
                    </div>

                </div>

            </div>
        </>
    )
}

export default Orders;