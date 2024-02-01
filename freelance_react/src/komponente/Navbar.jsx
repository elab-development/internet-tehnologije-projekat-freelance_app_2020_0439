import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                <img className='logo'  src="https://i.ibb.co/QrSXky7/image-Photo-Room-png-Photo-Room.png" alt="logo" border="0"/>
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
            </ul>
        </nav>
    );
};

export default Navbar;