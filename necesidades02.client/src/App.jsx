// src/App.jsx
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsuarioFields from './UsuarioFields';
import Navbar from './Navbar/Navbar';
import SolicitudesList from './SolicitudesList';
import './assets/Styles/styles.css';

function App() {
    const userId = 1; // O el ID de usuario que desees pasar

    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container mt-5">
                    <Routes>
                        <Route path="/App" element={<UsuarioFields userId={userId} />} />
                        <Route path="/SolicitudesList" element={<SolicitudesList userId={userId} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
