import React from 'react';
import './Footer.css'; // Make sure to create a Footer.css file for styling
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <b>&copy; 2024 Your Company. All Rights Reserved.</b>
                <ul className="footer-links">
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/privacy">Privacy Policy</Link></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
