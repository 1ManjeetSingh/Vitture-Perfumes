import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import '../styles/cart.css'
import { lazy } from 'react';
import { useUser } from '../contexts/UserContext';
const Loader = lazy(() => import('../components/loader/Loader'));

// import ProductListing from './ProductListing';

// const cartItems = [
//   {
//     id: 1,
//     itemName: `Bacca Bucci® Zeus Men Fashion Sneakers/Running Shoes`,
//     quantity: 2,
//     image: 'https://m.media-amazon.com/images/I/716kSfEScGS._AC_AA180_.jpg',
//     price: 2999,
//     discount: 50,
//   }, {
//     id: 2,
//     itemName: `Bacca Bucci® Zeus Men Fashion Sneakers/Running Shoes`,
//     quantity: 2,
//     image: 'https://m.media-amazon.com/images/I/716kSfEScGS._AC_AA180_.jpg',
//     price: 2999,
//     discount: 50,
//   }, {
//     id: 3,
//     itemName: `Bacca Bucci® Zeus Men Fashion Sneakers/Running Shoes`,
//     quantity: 2,
//     image: 'https://m.media-amazon.com/images/I/716kSfEScGS._AC_AA180_.jpg',
//     price: 2999,
//     discount: 50,
//   }, {
//     id: 4,
//     itemName: `Bacca Bucci® Zeus Men Fashion Sneakers/Running Shoes`,
//     quantity: 2,
//     image: 'https://m.media-amazon.com/images/I/716kSfEScGS._AC_AA180_.jpg',
//     price: 2999,
//     discount: 50,
//   },
// ];

const discountedPrice = (price, discount) => {
  return Math.round(price * (1 - (discount) / 100) - 0.5);
}

const Cart = () => {
  const [cartItems, setCartItems] = useState(null);
  const [success, setSuccess] = useState(null);
  const [itemsNo, setItemsNo] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [orderItems, setOrderItems] = useState(null);
  const { user } = useUser();


  // add Address before gateway page opening
  const selected = user?.address.find(addr => addr.isDefault === true);
  const others = user?.address.filter(addr => addr.isDefault === false);
  const [addressArray, setAddressArray] = useState([selected, ...others]);
  const [defaultAddress, setDefaultAddress] = useState(selected);
  const [editAddress, setEditAddress] = useState(false);
  const editAddressRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editAddressRef.current && !editAddressRef.current.contains(event.target)) {
        setEditAddress(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // const [checkedItems, setCheckedItems] = useState({});
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/cartItems`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token?.value}` },
        }
      );
      const data = await response.json();
      setCartItems(data.cartItems);
      setSuccess(data.success);

      const checkedItems = data.cartItems.filter(item => item.isChecked !== false);

      console.log(checkedItems);

      setOrderItems(checkedItems);

    } catch (error) {
      console.error('Error fetching product data:', error);
      message.error('Error fetching product data:');
    }
  }

  const handleIncrease = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/cartItems/increaseQuantity/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      });

      if (response.ok) {
        const { cartItem } = await response.json();
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.id === id ? { ...item, quantity: cartItem.quantity } : item
          )
        );
      } else {
        const data = await response.json();
        message.error(data.message);
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
      message.error("Error updating cart");
    }
  };


  const handleDecrease = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/cartItems/decreaseQuantity/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`
        },
      });
      if (response.status == 200) {
        const { cartItem } = await response.json();
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.id === id ? { ...item, quantity: cartItem.quantity } : item
          ));
      }
      else {
        const data = await response.json();
        message.error(data.message);
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
      message.error('Error fetching product data:');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/cartItems/deleteItem/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`
        },
      });
      if (response.status == 200) {
        const { cartItem } = await response.json();
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) =>
            item.id !== id
          ));
      }
      else {
        const data = await response.json();
        message.error(data.message);
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
      message.error('Error fetching product data:');
    }
  }

  useEffect(() => {
    fetchCartItems();
  }, [])

  useEffect(() => {
    setItemsNo(
      orderItems?.reduce((acc, item) => acc + item.quantity, 0) // Correct accumulator
    );

    setSubTotal(
      orderItems?.reduce((acc, item) => acc + item.quantity * discountedPrice(item.price, item.discount), 0)
    );
  }, [cartItems]); // Add cartItems as a dependency

  const handleCheckboxChange = async (item) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/cartItems/unCheck`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token?.value}`
        },
        body: JSON.stringify({ productId: item.id })
      })

      if (!response.ok) {
        throw new Error("Please try again");
      }

      const data = await response.json();
      console.log(data);
      // if(data.cartItem.isChecked){
      //   const newItem = data.cartItem;
      // setOrderItems((prev)=>[...prev, newItem]);
      // }
      fetchCartItems();
    } catch (error) {
      console.error("Payment error:", error);
      message.error(error.message || "Something went wrong");
    }
  };

  const handleOpenGateway = () =>{
    if(orderItems.length === 0){
      message.warning('Select atleast 1 item')
    }
    else{
      setEditAddress(true);
    }
  }

  const handleMakeDefault = async (id) => {
    try {
      const updatedAddresses = user.address.map(addr => ({
        ...addr,
        isDefault: addr._id === id
      }));

      // Move the selected address to the front
      const selected = updatedAddresses.find(addr => addr._id === id);
      const others = updatedAddresses.filter(addr => addr._id !== id);
      const reordered = [selected, ...others];

      setDefaultAddress(selected)
      setAddressArray(reordered)
      user.address = reordered;

      // Update local state (if needed)
      const User = {
        value: user,
        expiry: Date.now() + 3600000, // 1 hour = 3600000 ms
      };

      localStorage.setItem("user", JSON.stringify(User));

    } catch (error) {
      message.error(error.message || "Something went wrong");
    }
  };


  const handleProceedPayment = async () => {
    try {
      const total = subTotal < 500 ? (subTotal + 40) : subTotal;

      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/gateway/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token?.value}`
        },
        body: JSON.stringify({ amount: total, address: defaultAddress, orderItems })
      });

      if (!response.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const data = await response.json();

      const options = {
        key: "rzp_test_rYk1KFafMH96WT",
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        handler: function (response) {
          message.success("Payment successful!");
          console.log("Payment ID:", response.razorpay_payment_id);
          console.log("Order ID:", response.razorpay_order_id);
          console.log("Signature:", response.razorpay_signature);
        },
        theme: {
          color: "#3399cc",
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

      rzp1.on("payment.failed", function (response) {
        message.error("Payment failed");
        console.error(response.error);
      });

    } catch (error) {
      console.error("Payment error:", error);
      message.error(error.message || "Something went wrong");
    }
  };

  if (success == null) {
    return <Loader />;
  }

  return (
    <>
      {/* No login condition - No user in storage condition */}
      <div className={`flex justify-center items-center h-screen bg-gray-100 p-6 ${!user ? "" : "hidden"} pb-[100px]`} style={{ boxSizing: "border-box" }}>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
          <RiShoppingCartLine className="text-6xl text-gray-400" />
          <h2 className="text-2xl font-semibold mt-4">Your Cart is Empty</h2>
          <p className="text-gray-500 mt-2 hidden md:block">Looks like you haven't added anything to your cart yet.</p>

          <div className="flex gap-4 mt-6">
            <Link to="/login" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium">
              Sign In
            </Link>
            <Link to="/register" className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white px-4 py-2 rounded-lg font-medium">
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>

      <div className={`Cart flex px-6 pt-6 w-[100%] h-[92vh] mx-auto relative ${!user ? "hidden" : ""}`}>
        <div className={`cart-counter min-w-[320px] h-fit p-4 flex flex-col items-start gap-6 bg-white ${cartItems.length === 0 ? "hidden" : ""}`}>
          <h1 className='text-md sm:text-xl'>Subtotal ({itemsNo} items): <span className='font-bold'>₹{subTotal}</span></h1>
          {subTotal < 500 ? <h1 className='text-sm sm:text-lg'>Delivery: <span className='font-semibold'>₹40</span></h1> : <h1 className='text-sm sm:text-lg'>Delivery: <span className='font-semibold'><del className='font-light'>₹40</del> free delivery ✅</span></h1>}
          <button className='btn-1 rounded-full py-1 w-[95%] text-md border border-[#FFCE12] bg-[#FFCE12] font-semibold' onClick={() => handleOpenGateway()}>Proceed to Buy</button>
        </div>
        <div className='cart-counter-button hidden min-w-[320px] flex h-fit justify-center w-full bg-white py-3'>
          <button className='btn-2 rounded-full py-1 w-[95%] text-md border border-[#FFCE12] bg-[#FFCE12] font-semibold' onClick={() => setEditAddress(true)}>Proceed to Buy</button>
        </div>
        <div className='cart-items-container w-full h-full flex flex-col pr-8 pl-12 pb-4 justify-start items-center'>
          <p className='flex w-full bg-[#cecece] text-lg sm:text-2xl font-[600] h-[40px] justify-center items-center mb-2'>
            Your Cart
          </p>
          <div className='w-full h-full flex flex-col gap-4 justify-start items-center overflow-y-auto custom-scrollbar pt-2'>
            {cartItems && cartItems.length !== 0 ? cartItems.map((item) => {
              return (
                <div key={item.id} className="cart-items flex w-full bg-white shadow-md rounded-lg relative p-4 mb-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 absolute top-4 left-4 cursor-pointer"
                    checked={item.isChecked}
                    onChange={() => handleCheckboxChange(item)}
                  />
                  <div className="item-image w-[100px] sm:w-[160px] h-auto flex-shrink-0">
                    <img
                      src={item.image ? `${import.meta.env.VITE_BACKEND_BASE_URL}/api/productImages/files/${item.image}` : './perfume.webp'}
                      alt={item.itemName}
                      onError={(e) => { e.target.src = "./perfume.webp"; }}
                      loading="lazy"
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
                        <span className="text-sm sm:text-lg">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item.id)}
                          className="w-5 h-5 sm:w-8 sm:h-8 bg-gray-200 hover:bg-gray-300 rounded-md text-sm sm:text-lg flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <div className='cart-items-bottom-buttons text-sm text-[#7796B6] flex gap-4 cursor-default overflow-hidden whitespace-nowrap text-ellipsis'>
                        <button onClick={() => handleDeleteItem(item.id)} >Delete</button>
                        <span>|</span>
                        <span>Save for later</span>
                        <span>|</span>
                        <span>Share</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) : <div className='flex flex-col w-[30%] h-[75vh] grow-1 items-center gap-2'>
              <img src="./emptyCart.png" alt="" style={{ objectFit: "contain" }} />
              <h1 className='text-center'>Your cart is empty</h1>
            </div>}
          </div>

        </div>

        <div className={`absolute top-0 left-0 flex justify-center items-center z-[999] w-[100vw] h-[92vh] ${editAddress ? "" : "hidden"}`} style={{ backdropFilter: "brightness(0.3)" }}>
          <div className='w-[90vw] h-[70vh] md:w-[50vw] bg-white relative flex justify-center items-center' ref={editAddressRef}>
            <svg className='absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8' onClick={() => setEditAddress(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
            <div className='flex flex-col w-[100%] h-[100%] items-center'>
              <h1 className='text-center text-xl font-bold py-4'>Delivary Address</h1>
              <div className='flex flex-col w-[90%] h-[100%] gap-2 pb-2 items-center overflow-auto'>
                {addressArray?.map((address, index) => (
                  <div
                    key={index}
                    className={`flex flex-col relative items-start justify-center w-[250px] h-[200px] rounded-md border p-6 bg-white ${address.isDefault == true ? 'border-gray-400 shadow-lg' : ''}`}
                  >
                    <p className="text-lg font-semibold text-gray-800">{address.fullName}</p>
                    <p className="text-sm text-gray-500">{address.house}, {address.area}</p>
                    <p className="text-sm text-gray-500">{address.city}, {address.state}</p>
                    <p className="text-sm text-gray-500">{address.pincode}</p>
                    <p className="text-sm text-gray-900">Phone no. {address.mobileNumber}</p>
                    <div className='absolute top-2 right-3 text-md text-[#7796C6] flex gap-2 cursor-default overflow-hidden whitespace-nowrap text-ellipsis'>
                      {address.isDefault == true ? <button>✅</button> :
                        <button onClick={() => handleMakeDefault(address._id)}>Select</button>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex w-[100%] justify-center py-4'>
                <button className='btn-1 rounded-full py-1 w-[95%] text-md border border-[#FFCE12] bg-[#FFCE12] font-semibold' onClick={() => handleProceedPayment()}>Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Cart;