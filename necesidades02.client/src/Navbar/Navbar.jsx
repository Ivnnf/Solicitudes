import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Styles/styles.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/App">Inicio</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/SolicitudesList">Mis Solicitudes</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
