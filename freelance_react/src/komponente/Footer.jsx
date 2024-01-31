import React from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="salon-info">
                <img className='logo'  src="https://i.ibb.co/QrSXky7/image-Photo-Room-png-Photo-Room.png" alt="logo" border="0"/>
                    <p>Email: freelance_company@gmail.com</p>
                    <p>Kontakt: +3816544321</p>
                </div>
                <button className="back-to-top" onClick={scrollToTop}>
                    <FaArrowCircleUp className="arrow-icon" /> Na vrh
                </button>
            </div>
        </footer>
    );
};

export default Footer;