import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-col">
                    <h3>About Us</h3>
                    <ul>
                        <li><a href="#">Our Story</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Webinars</a></li>
                        <li><a href="#">E-books</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h3>Support</h3>
                    <ul>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2025 CareerAI. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
