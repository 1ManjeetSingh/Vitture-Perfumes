import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import '../styles/cart.css'
// import ProductListing from './ProductListing';

const cartItems = [
  {
    id: 1,
    itemName: `Bacca Bucci® Zeus Men Fashion Sneakers/Running Shoes`,
    quantity: 2,
    image: 'https://m.media-amazon.com/images/I/716kSfEScGS._AC_AA180_.jpg',
    price: 2999,
    discount: 50,
  }, {
    id: 2,
    itemName: `Bacca Bucci® Zeus Men Fashion Sneakers/Running Shoes`,
    quantity: 2,
    image: 'https://m.media-amazon.com/images/I/716kSfEScGS._AC_AA180_.jpg',
    price: 2999,
    discount: 50,
  }, {
    id: 3,
    itemName: `Bacca Bucci® Zeus Men Fashion Sneakers/Running Shoes`,
    quantity: 2,
    image: 'https://m.media-amazon.com/images/I/716kSfEScGS._AC_AA180_.jpg',
    price: 2999,
    discount: 50,
  }, {
    id: 4,
    itemName: `Bacca Bucci® Zeus Men Fashion Sneakers/Running Shoes`,
    quantity: 2,
    image: 'https://m.media-amazon.com/images/I/716kSfEScGS._AC_AA180_.jpg',
    price: 2999,
    discount: 50,
  },
];

const discountedPrice = (price, discount) => {
  return Math.round(price * (1 - (discount) / 100) - 0.5);
}

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  return (
    <>
      <div className="Cart flex px-6 pt-6 w-[90%] h-[92vh] mx-auto relative">
        <div className="cart-counter min-w-[320px] h-fit p-4 flex flex-col items-start gap-6 bg-white">
          <h1 className='text-md sm:text-xl'>Subtotal (2 items): <span className='font-bold'>₹1,298</span></h1>
          <h1 className='text-sm sm:text-lg'>Delivery: <span className='font-semibold'><del className='font-light'>₹40</del> free delivery ✅</span></h1>
          <button className='rounded-full py-1 w-[95%] text-md border border-[#FFCE12] bg-[#FFCE12] font-semibold'>Proceed to Buy</button>
        </div>
        <div className='cart-counter-button hidden min-w-[320px] flex h-fit justify-center w-full bg-white py-3'>
          <button className='rounded-full py-1 w-[95%] text-md border border-[#FFCE12] bg-[#FFCE12] font-semibold'>Proceed to Buy</button>
        </div>
        <div className='cart-items-container w-full h-full flex flex-col pr-8 pl-12 pb-4 justify-start items-center'>
          <p className='flex w-full bg-[#cecece] text-lg sm:text-2xl font-[600] h-[40px] justify-center items-center mb-2'>
            Your Cart
          </p>
          <div className='w-full h-full flex flex-col gap-4 justify-start items-center overflow-y-auto custom-scrollbar pt-2'>
            {cartItems.map((item) => {
              return (
                <div key={item.id} className="cart-items flex w-full bg-white shadow-md rounded-lg relative p-4 mb-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 absolute top-4 left-4 cursor-pointer"
                  />
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
                    <div className='cart-items-bottom flex items-center gap-6'>
                      <div className="flex items-center grow space-x-4">
                        <button
                          onClick={() => handleDecrease(item.id)}
                          className="w-5 h-5 sm:w-8 sm:h-8 bg-gray-200 hover:bg-gray-300 rounded-md text-sm sm:text-lg flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-sm sm:text-lg">{quantity}</span>
                        <button
                          onClick={() => handleIncrease(item.id)}
                          className="w-5 h-5 sm:w-8 sm:h-8 bg-gray-200 hover:bg-gray-300 rounded-md text-sm sm:text-lg flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <div className='cart-items-bottom-buttons text-sm text-[#7796B6] flex gap-4 cursor-default overflow-hidden whitespace-nowrap text-ellipsis'>
                        <span >Delete</span>
                        <span>|</span>
                        <span>Save for later</span>
                        <span>|</span>
                        <span>Share</span>
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

export default Cart;