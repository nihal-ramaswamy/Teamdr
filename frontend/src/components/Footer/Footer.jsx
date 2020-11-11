import React from 'react';
import './Footer.css';

import { Link } from "react-router-dom";


import { FaFacebookSquare, FaInstagramSquare , FaLinkedin } from 'react-icons/fa';

const FooterComponent = () => {
    return ( 
        <div className="my-footer-container">
            <div className="footer-text-container">
                &copy; 2020 FanTab Inc. | All rights reserved.
            </div>
            <div className="other-links-container">
                <a className="" href="https://www.facebook.com/itsfantab/" target="_blank" rel="noopener noreferrer">
                    <FaFacebookSquare  className="my-footer-icon" />
                </a>

                <a className="" href="https://www.instagram.com/fantabstudios/" target="_blank" rel="noopener noreferrer">
                    <FaInstagramSquare className="my-footer-icon" />
                </a>
                <a className="" href="https://www.linkedin.com/company/fantab-studios-llp/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="my-footer-icon" />
                </a>

            </div>
        </div>
     );
}
 
export default FooterComponent;