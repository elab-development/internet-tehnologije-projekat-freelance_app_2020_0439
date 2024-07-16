import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

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
            navigate('/');
        } catch (error) {
            console.error('Greška prilikom odjave:', error);
        }
    };

    const isLoggedIn = !!sessionStorage.getItem('token');
    const userString = sessionStorage.getItem('user');
    let user = null;
    if (userString && userString !== 'undefined') {
        try {
            user = JSON.parse(userString);
        } catch (error) {
            console.error('Greška prilikom parsiranja korisničkih podataka:', error);
        }
    }
    const isAdmin = user?.isAdmin === '1';

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
                    <Link to="/kategorije">Kategorije usluga</Link>
                </li>
                {isLoggedIn && isAdmin && (
                    <>
                        <li>
                            <Link to="/servicesdashboard">Dashboard</Link>
                        </li>
                    </>
                )}
                {isLoggedIn && !isAdmin && (
                    <>
                        <li>
                            <Link to="/offer">Ponuda</Link>
                        </li>
                        <li>
                            <Link to="/userOffers">Moje Ponude</Link>
                        </li>
                    </>
                )}
                {isLoggedIn ? (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <li>
                        <Link to="/auth">Prijava/Registracija</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
