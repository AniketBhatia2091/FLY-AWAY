import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                {/* Footer Grid */}
                <div className="footer-content">
                    {/* About Section */}
                    <div className="footer-section">
                        <h3>About Fly Away</h3>
                        <p>Your trusted partner in creating unforgettable travel experiences. We curate the best destinations and deals for your perfect vacation.</p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/#deals">This Week's Deals</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/#contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <div className="contact-item">
                            <MapPin size={20} />
                            <div>
                                <p>Chitkara University</p>
                                <p>Punjab, India</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <Phone size={20} />
                            <p>+91 5682920790</p>
                        </div>
                        <div className="contact-item">
                            <Mail size={20} />
                            <p>FlyAway@email.com</p>
                        </div>
                    </div>

                    {/* Follow Us */}
                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <p>Stay connected with us on social media</p>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p>&copy; 2024 Fly Away. All rights reserved.</p>
                    <div className="footer-links-bottom">
                        <Link to="/terms">Terms of Use</Link>
                        <span>|</span>
                        <Link to="/privacy">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
