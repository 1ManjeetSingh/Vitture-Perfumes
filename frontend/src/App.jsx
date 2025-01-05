import { React, useState, useEffect, useRef, lazy, Suspense} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Loader from './components/loader/Loader';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const Home = lazy(() => import('./pages/Home'))
const Profile = lazy(() => import('./pages/Profile'));
const Cart = lazy(() => import('./pages/Cart'));
const Product = lazy(() => import('./pages/Product'));
const ProductListing = lazy(() => import('./pages/ProductListing'));

// Lazy load components
const Navbar = lazy(() => import('./components/navbar/Navbar'));
const Footer = lazy(() => import('./components/footer/Footer'));

// Lazy load profile sub-components
const Orders = lazy(() => import('./components/profileComponents/Orders'));
const Address = lazy(() => import('./components/profileComponents/Address'));
const Payment = lazy(() => import('./components/profileComponents/Payment'));

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState({
    profile: false,
    details: false,
    orders: false,
    address: false,
    payment: false,
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;

      // Exclude when focus is on input, textarea, or contenteditable
      if (
        (target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.isContentEditable)
      ) {
        return;  // Do nothing if focused on input/textarea
      }

      if (event.key === 'Backspace') {
        navigate(-1);  // Go back one step in history
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);


  useEffect(() => {
    const resetState = {
      profile: false,
      details: false,
      cart: false,
      home: false,
      orders: false,
      address: false,
      payment: false,
    };

    if (location.pathname === '/profile') {
      setIsOpen(false);
      setIsProfileOpen({ ...resetState, profile: true, details: true });
    } else if (location.pathname === '/user_orders') {
      setIsOpen(false);
      setIsProfileOpen({ ...resetState, profile: true, orders: true });
    } else if (location.pathname === '/cart') {
      setIsOpen(false);
      setIsProfileOpen({ ...resetState, cart: true });
    } else if (location.pathname === '/') {
      setIsOpen(false);
      setIsProfileOpen({ ...resetState, home: true });
    } else if (location.pathname === '/user_address') {
      setIsOpen(false);
      setIsProfileOpen({ ...resetState, profile: true, address: true });
    } else if (location.pathname === '/user_payment_methods') {
      setIsOpen(false);
      setIsProfileOpen({ ...resetState, profile: true, payment: true });
    } else {
      setIsOpen(false);
      setIsProfileOpen(resetState);  // Reset to all false if none match
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchdata = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
    fetchdata();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);  // Close the sidebar if clicked outside
      }
    };

    // Attach event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <>
      {/* {isLoading ? <Loader /> : <>*/}
      <Suspense fallback={<Loader />}>
          <Navbar setIsOpen={setIsOpen} />

          {/* <------------------- Menu Button ------------------> */}
          <div className={`fixed top-0 left-0 h-[100vh] w-full z-[999] transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-[-100%]'}`}
            style={{
              backdropFilter: 'brightness(50%)',
            }}>
            <div className='w-[180px] bg-white h-full' ref={menuRef}>
              <div className='flex w-full h-[8vh] justify-center items-center border-b border-gray-300 p-2 text-lg text-[#FFD700] font-semibold cursor-default'
                style={{
                  background: 'linear-gradient(to right,#010200 50%,gold)',
                }}>VITTURÉ</div>
              <Link to={'/'}>
                <div className={`flex w-full justify-start border-b border-gray-300 p-2 text-md sm:text-lg font-semibold cursor-default ${isProfileOpen.home ? 'bg-[#cfcfcf]' : ''}`}>Home</div>
              </Link>
              <Link to={'/cart'}>
                <div className={`flex w-full justify-start border-b border-gray-300 p-2 text-md sm:text-lg font-semibold cursor-default ${isProfileOpen.cart ? 'bg-[#cfcfcf]' : ''}`}>Cart</div>
              </Link>
              <Link to={'/profile'}>
                <div className={`flex w-full justify-start border-b border-gray-300 p-2 text-md sm:text-lg font-semibold cursor-default ${isProfileOpen.details ? 'bg-[#cfcfcf]' : ''}`}>Details</div>
              </Link>
              <Link to={'/user_orders'}>
                <div className={`flex w-full justify-start border-b border-gray-300 p-2 text-md sm:text-lg font-semibold cursor-default ${isProfileOpen.orders ? 'bg-[#cfcfcf]' : ''}`}>Your Orders</div>
              </Link>
              <Link to={'/user_address'}>
                <div className={`flex w-full justify-start border-b border-gray-300 p-2 text-md sm:text-lg font-semibold cursor-default ${isProfileOpen.address ? 'bg-[#cfcfcf]' : ''}`}>Address</div>
              </Link>
              <Link to={'/user_payment_methods'}>
                <div className={`flex w-full justify-start border-b border-gray-300 p-2 text-md sm:text-lg font-semibold cursor-default ${isProfileOpen.payment ? 'bg-[#cfcfcf]' : ''}`}>Payment Methods</div>
              </Link>
            </div>
          </div>

          {/** <-------------------- Profile Options ------------------------>*/}
          <div className={`profile-options absolute top-[8vh] left-0 z-[999] transform transition-transform duration-500 ease-out ${isProfileOpen.profile ? 'translate-x-0' : 'translate-x-[-100%]'} h-[92vh] w-[220px] border border-gray-300 bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] flex flex-col gap-6`}>
            <div className='h-[92vh] flex flex-col w-full justify-start'>
              <Link to={'/profile'}>
                <div className={`flex w-full justify-start border-b border-gray-300 p-2 text-lg font-semibold cursor-default ${isProfileOpen.details ? 'bg-[#cfcfcf]' : ''}`}>Details</div>
              </Link>
              <Link to={'/user_orders'}>
                <div className={`flex w-full justify-start border-b border-gray-300 p-2 text-lg font-semibold cursor-default ${isProfileOpen.orders ? 'bg-[#cfcfcf]' : ''}`}>Your Orders</div>
              </Link>
              <Link to={'/user_address'}>
                <div className={`flex w-full justify-start border-b border-gray-300 p-2 text-lg font-semibold cursor-default ${isProfileOpen.address ? 'bg-[#cfcfcf]' : ''}`}>Address</div>
              </Link>
              <Link to={'/user_payment_methods'}>
                <div className={`flex w-full justify-start border-b border-gray-300 p-2 text-lg font-semibold cursor-default ${isProfileOpen.payment ? 'bg-[#cfcfcf]' : ''}`}>Payment Methods</div>
              </Link>
              <Link to={'/'}>
                <div className={`flex w-full justify-start border-b border-gray-300 p-2 text-lg font-semibold cursor-default ${isProfileOpen.home ? 'bg-[#cfcfcf]' : ''}`}>Home</div>
              </Link>
            </div>
            <div className={`absolute ${isProfileOpen.profile ? 'left-7' : ''} flex w-full justify-end items-center rounded-r-lg text-lg cursor-default z-[-1]`}>
              <Link to={'/'}>
                <button className='border border-gray-300 rounded-r-lg px-2'>X</button>
              </Link>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile setIsProfileOpen={setIsProfileOpen} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Product/:id" element={<Product />} />
            <Route path="/productlist" element={<ProductListing />} />
            <Route path="*" element={<Home />} />
            <Route path='/user_orders' element={<Orders />} />
            <Route path='/user_address' element={<Address />} />
            <Route path='/user_payment_methods' element={<Payment />} />
          </Routes>
          <Footer />
          </Suspense>
        {/* </>} */}
    </>
  );
}

export default App;
