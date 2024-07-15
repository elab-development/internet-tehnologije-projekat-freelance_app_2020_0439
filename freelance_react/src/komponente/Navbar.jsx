import React from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
    const history = useNavigate();

    const handleLogout = async () => {
        const token = sessionStorage.getItem('token');
        try {
            await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
            history('/');
        } catch (error) {
            console.error('Greška prilikom odjave:', error);
        }
    };

    const isLoggedIn = !!sessionStorage.getItem('token');

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <img className='logo' src="https://i.ibb.co/QrSXky7/image-Photo-Room-png-Photo-Room.png" alt="logo" border="0"/>
                </li>
                <li>
                    <Link to="/">Početna</Link>
                </li>
                <li>
                    <Link to="/usluge">Usluge</Link>
                </li>
                <li>
                    <Link to="/o-nama">O nama</Link>
                </li>
                <li>
                    <Link to="/auth">Auth</Link>
                </li>
                <li>
                    <Link to="/kategorije">Kategorije usluga</Link>
                </li>
                {isLoggedIn && (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
