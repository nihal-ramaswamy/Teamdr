import React from 'react';
import './Footer.css';

import { Link } from "react-router-dom";


import { FaFacebookSquare, FaInstagramSquare , FaLinkedin, FaGithub } from 'react-icons/fa';
import { Footer } from 'antd/lib/layout/layout';

const FooterComponent = () => {
    return ( 
        <footer className = "fOoter">
        <Footer>
        <div className="my-footer-container">
            <div className="footer-text-container">
            A progressive app project as a part of the Web Technologies course (UE19CS204) at PES University.
            </div>
            <div className="other-links-container">

                <a className="" href="https://github.com/nihal-ramaswamy/WT-Project" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="my-footer-icon" />
                </a>

            </div>
        </div>
        </Footer>
        </footer>
     );
}
 
export default FooterComponent;