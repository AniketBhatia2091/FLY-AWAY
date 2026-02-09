import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Menu, X } from 'lucide-react';
const Logo = '/images/Logo.png';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        checkUser();
    }, [location]); // Re-check user when location changes

    const checkUser = async () => {
        try {
            const res = await axios.get('/api/auth/me');
            if (res.data.success) {
                setUser(res.data.user);
            }
        } catch (err) {
            setUser(null);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get('/api/auth/logout');
            setUser(null);
            navigate('/');
        } catch (err) {
            console.error('Logout failed');
        }
    };

    return (
        <header>
            <div className="navbar">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Fly Away Logo" />
                        <span>Fly Away</span>
                    </Link>
                </div>
                <ul className="links">
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                    {user && (
                        <li><a href="#" onClick={handleLogout}>Logout</a></li>
                    )}
                </ul>

                <Link to={user ? "#" : "/login"} className="action_btn">
                    {user ? `Hi, ${user.username} ` : "Get started"}
                </Link>

                <div className="toggle_btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>

            <div className={`dropdown_menu ${isMenuOpen ? 'open' : ''} `}>
                <li onClick={() => setIsMenuOpen(false)}><Link to="/">Home</Link></li>
                <li onClick={() => setIsMenuOpen(false)}><a href="#about">About</a></li>
                <li onClick={() => setIsMenuOpen(false)}><a href="#contact">Contact</a></li>
                <li onClick={() => setIsMenuOpen(false)}>
                    <Link to="/login" className="action_btn">Get started</Link>
                </li>
            </div>
        </header>
    );
};

export default Navbar;
