import { React, useState, useEffect } from 'react';
import './App.css';
import Loader from './components/loader/Loader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Product from './pages/Product';
import ProductListing from './pages/ProductListing';

function App() {

  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    const fetchdata =()=>{
      setTimeout(()=>{
        setIsLoading(false);
      },5000);
    }
    fetchdata();
  },[]);

  return (
    <>
    {isLoading ? <Loader /> : <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Home as default */}
                <Route path="/profile" element={<Profile />} /> {/* Full-page Profile */}
                <Route path="/cart" element={<Cart />} /> {/* Full-page Cart */}
                <Route path="/Product/:id" element={<Product />} />
                  <Route path="/productlist" element={<ProductListing />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>}
    </>
  );
}

export default App;
