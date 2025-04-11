import React, { useState, useEffect } from 'react'
import './profileComponents.css';
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const [rating, setRating] = useState();
    const navigate = useNavigate();
    const { user } = useUser();
    const token = JSON.parse(localStorage.getItem("token"));
    const [orderItems, setOrderItems] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user]);

    const handleClick = (rate) => {
        setRating(rate);
    };

    const fetchUserOrders = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/gateway/user-orders`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token?.value}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user orders");
            }

            const data = await response.json();
            // Optionally set state here
            setOrderItems(data.orders);

            // console.log(typeof(data.orders[0].products[0].id));
            ;
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };


    useEffect(() => {
        fetchUserOrders();
    }, [])

    const discountedPrice = (price, discount) => {
        return Math.round(price * (1 - (discount) / 100) - 0.5);
    }

    const generateRandomDate = () => {
        const num = Math.floor(Math.random() * 6) + 10; // Random number between 10 and 15
        const today = new Date();
        const futureDate = new Date(today.getTime() + num * 24 * 60 * 60 * 1000); // Add num days

        // Format to dd/mm/yyyy
        const formattedDate = `${String(futureDate.getDate()).padStart(2, '0')}/${String(futureDate.getMonth() + 1).padStart(2, '0')}/${futureDate.getFullYear()}`;

        return (`Date after ${num} days:`, formattedDate);

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
                        {orderItems && orderItems.length == 0 ? <div className='flex flex-col w-[60%] h-auto items-center gap-6'>
                            <img src="./emptyOrders.png" alt="" style={{ objectFit: "contain" }} />
                            <h1>No Order Placed</h1>
                        </div> : orderItems && orderItems?.map((order) => {
                            return (
                                <div
                                    key={order._id}
                                    className="flex flex-col w-full bg-white shadow-md rounded-lg mb-6">
                                    <div className="pt-2 px-4">
                                        {order.orderStatus === "Delivered" ? (
                                            <span className="text-[#AAAAAA]">Delivered On&nbsp;</span>
                                        ) : (
                                            <span className="text-[#222222]">Delivery Expected :&nbsp;{generateRandomDate()}</span>
                                        )}
                                    </div>

                                    {order.products.map((item, idx) => (
                                        <div
                                            key={item._id || idx}
                                            className="order-items flex w-full rounded-lg relative p-4 mb-2"
                                        >
                                            <div className="item-image w-[100px] sm:w-[160px] h-auto flex-shrink-0">
                                                <img
                                                    src={item.image ? `${import.meta.env.VITE_BACKEND_BASE_URL}/api/productImages/files/${item.image}` : './perfume.webp'}
                                                    alt={item.itemName}
                                                    loading="lazy"
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                            <div className="flex flex-col grow gap-3 ml-6 justify-center card-details">
                                                <h2 className="text-sm sm:text-lg font-semibold">{item.itemName || "Product Name"}</h2>

                                                <div className="flex w-full gap-8">
                                                    <div className="flex flex-col grow items-start">
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-sm bg-red-600 text-white rounded-md p-[2px] sm:p-1">
                                                                -{item.discount || 10}%
                                                            </span>
                                                            <span className="text-sm sm:text-lg font-semibold">
                                                                &nbsp;₹{discountedPrice(item.price, item.discount || 10)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="text-sm sm:text-lg font-light">
                                                                M.R.P.: <del>₹{item.price}</del>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="order-items-bottom flex items-center justify-between gap-4">
                                                    <div className="flex items-center space-x-4 p-2 w-fit border rounded-lg">
                                                        <span className="text-sm sm:text-lg leading-tight">Quantity :</span>
                                                        <span className="text-sm sm:text-lg leading-tight">{item.quantity}</span>
                                                    </div>

                                                    <div className="order-items-bottom-buttons text-sm text-[#7796B6] flex gap-4 cursor-default">
                                                        <div className="flex flex-col">
                                                            <div className="flex py-1">
                                                                {Array.from({ length: 5 }, (_, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className={`order-star ${index < 4 ? "filled" : ""}`} // Replace 4 with dynamic rating
                                                                        role="button"
                                                                        aria-label={`Rate ${index + 1} star`}
                                                                    >
                                                                        ★
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <span className="order-star-rating text-sm sm:text-md">
                                                                Rate this Product &nbsp;
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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