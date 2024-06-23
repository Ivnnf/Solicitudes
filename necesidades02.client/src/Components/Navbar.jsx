import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/Styles/styles.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink
                        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                        to="/App"
                    >
                        Inicio
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                        to="/SolicitudesList"
                    >
                        Mis Solicitudes
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
