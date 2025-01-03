import React, {useState, useEffect, useRef} from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping, faBars} from '@fortawesome/free-solid-svg-icons';
import vImage from '../../assets/product images/V.jpeg';

const Navbar = ({ setIsOpen }) => {

    return (
        <header>
        <nav className="navbar">
            <div>
            <Link to="/"><img src={vImage} alt="V" title='Home' /></Link>
            </div>
            <h1 className='text-lg sm:text-2xl'>VITTURÉ</h1>
            <div>
                <Link to="/profile"><FontAwesomeIcon icon={faUser} className='fontawesome profile w-5 h-5' /></Link>
                <Link to="/cart"><FontAwesomeIcon icon={faCartShopping} className='fontawesome cart w-5 h-5' /></Link>
                <FontAwesomeIcon icon={faBars} className='fontawesome menu' onClick={()=>setIsOpen(true)}/>
            </div>
        </nav>
        </header>
    )
}

export default Navbar;