import {React, useState, useEffect} from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);
  
  useEffect(() => {
      const hiddenPaths = ["/login", "/register"];
      const shouldHideFooter = hiddenPaths.includes(location.pathname);
  
      setShowFooter(!shouldHideFooter);
  }, [location.pathname]); // Only trigger effect when pathname changes

  return (
    <>
     <footer className={showFooter==true ? "":"hidden"}>
      <div className="footer-content">
        <div className="footer-column">
          <h4 style={{userSelect: "none"}}>Customer Service</h4>
          <ul>
            <li><Link to="" className='a'>Contact Us</Link></li>
            <li><Link to="" className='a'>Shipping & Returns</Link></li>
            <li><Link to="" className='a'>FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 style={{userSelect: "none"}}>Company</h4>
          <ul>
            <li><Link to="" className='a'>About Us</Link></li>
            <li><Link to="" className='a'>Careers</Link></li>
            <li><Link to="" className='a'>Sustainability</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 style={{userSelect: "none"}}>Follow Us</h4>
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
    </>
  )
}

export default Footer;