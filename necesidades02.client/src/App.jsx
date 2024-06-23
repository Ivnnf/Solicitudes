import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UsuarioFields from './Components/UsuarioFields';
import Navbar from './Components/Navbar';
import SolicitudesList from './FormularioSolicitud/SolicitudesList';
import './assets/Styles/styles.css';
import { CardHeader, Container, Row, Col, Card, CardBody } from "reactstrap";

function App() {
    const userId = 1; // ID de usuario que desees pasar

    return (
        <Router>
            <div className="App">
                <Navbar />
                <Container className="mt-5">
                    <Row>
                        <Col sm="12">
                            <Routes>
                                <Route path="/" element={<Navigate to="/App" />} />
                                <Route path="/App" element={
                                    <Card className="card-custom">
                                        <CardHeader className="card-header-custom">
                                            <h5>Formulario de Solicitudes</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <UsuarioFields userId={userId} />
                                        </CardBody>
                                    </Card>
                                } />
                                <Route path="/SolicitudesList" element={<SolicitudesList userId={userId} />} />
                            </Routes>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Router>
    );
}

export default App;
