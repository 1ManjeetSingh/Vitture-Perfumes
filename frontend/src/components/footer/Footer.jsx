import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
     <footer>
      <div className="footer-content">
        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="" className='a'>Contact Us</Link></li>
            <li><Link to="" className='a'>Shipping & Returns</Link></li>
            <li><Link to="" className='a'>FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><Link to="" className='a'>About Us</Link></li>
            <li><Link to="" className='a'>Careers</Link></li>
            <li><Link to="" className='a'>Sustainability</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Follow Us</h4>
          <ul className="social-icons">
            <li>
            <Link to="/" className='a'><FontAwesomeIcon icon={faFacebook} /></Link>
            </li>
            <li>
            <Link to="/" className='a'><FontAwesomeIcon icon={faTwitter} /></Link>
            </li>
            <li>
            <Link to="/" className='a'><FontAwesomeIcon icon={faInstagram} /></Link>
            </li>
          </ul>
        </div>
      </div>
      <p>&copy; 2023 VITTURÉ. All rights reserved.</p>
    </footer>
  )
}

export default Footer;