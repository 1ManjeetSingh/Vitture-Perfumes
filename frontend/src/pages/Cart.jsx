import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
// import ProductListing from './ProductListing';

const cartItems = [
  {
    id: 1,
    itemName: `Bacca Bucci® Zeus Men Fashion Sneakers/Running Shoes`,
    quantity: 2,
    image: 'https://m.media-amazon.com/images/I/716kSfEScGS._AC_AA180_.jpg',
    price: 2999,
    discount: 50,
    selected: true,
  }, {
    id: 2,
    itemName: `Bacca Bucci® Zeus Men Fashion Sneakers/Running Shoes`,
    quantity: 2,
    image: 'https://m.media-amazon.com/images/I/716kSfEScGS._AC_AA180_.jpg',
    price: 2999,
    discount: 50,
    selected: true,
  }, {
    id: 3,
    itemName: `Bacca Bucci® Zeus Men Fashion Sneakers/Running Shoes`,
    quantity: 2,
    image: 'https://m.media-amazon.com/images/I/716kSfEScGS._AC_AA180_.jpg',
    price: 2999,
    discount: 50,
    selected: true,
  },
];

const discountedPrice = (price, discount) => {
  return price * (1 - (discount) / 100);
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
      <Navbar />
      <div className="Cart flex gap-6 p-6 w-[90%] mx-auto">
        <div className="cart-counter min-w-[320px] border h-fit p-4 flex flex-col items-start gap-6 bg-white">
          <h1 className='text-xl'>Subtotal (2 items): <span className='font-bold'>₹1,298</span></h1>
          <h1 className='text-lg'>Delivery: <span className='font-semibold'><del className='font-light'>₹40</del> free delivery ✅</span></h1>
          <button className='rounded-full py-1 w-full text-md border border-[#FFCE12] bg-[#FFCE12] '>Proceed to Buy</button>
        </div>
        <div className="w-full">
          {cartItems.map((item) => {
            return (
              <div key={item.id} className="cart-items flex w-full bg-white shadow-md rounded-lg relative p-4 mb-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 absolute top-4 left-4 cursor-pointer"
                />
                <div className="w-[160px] h-auto flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col grow gap-3 ml-6 justify-center">
                  <h2 className="text-lg font-semibold">{item.itemName}</h2>
                  <div className='flex w-full gap-8'>
                    <div className='flex flex-col grow items-start'>
                      <div className='flex items-center'>
                        <span className='text-sm bg-red-600 text-white rounded-md p-1'>-{item.discount}%</span>
                        <span className='text-md sm:text-lg font-semibold'>&nbsp;₹{discountedPrice(item.price, item.discount)}</span>
                      </div>
                      <div>
                        <span className='text-sm sm:text-lg font-light'>M.R.P.: <del>₹{item.price}</del></span>
                      </div>
                    </div>
                    <div>
                    </div>
                  </div>
                  <div className='flex items-center gap-6'>
                    <div className="flex items-center grow space-x-4">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-md text-lg flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-lg">{quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-md text-lg flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <div className='text-sm text-[#7796B6] flex gap-4 cursor-default overflow-hidden whitespace-nowrap text-ellipsis'>
                      <span>Delete</span>
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
      <div className='w-full h-[40vh] bg-[#b1b1b1] mx-auto my-4 flex justify-center items-center'>
        recomanded
      </div>
      <Footer />
    </>
  )
}

export default Cart;