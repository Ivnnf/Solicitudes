import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardHeader, Container, Row, Col, Card, CardBody } from "reactstrap";
import TablaSolicitud from "./TablaSolicitud";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const SolicitudesList = ({ userId }) => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [allSolicitudesEnviadas, setAllSolicitudesEnviadas] = useState(false);
    const navigate = useNavigate();

    const mostrarSolicitudes = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/solicitud/usuario/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setSolicitudes(data);

                // Verificar si todas las solicitudes están enviadas (estado 2)
                const allEnviadas = data.every(solicitud => solicitud.idEstado === 2);
                setAllSolicitudesEnviadas(allEnviadas);
            } else {
                console.log("Error en la lista");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (userId) {
            mostrarSolicitudes();
        }
    }, [userId]);

    const handleDelete = (idSolicitud) => {
        setSolicitudes(solicitudes.filter(solicitud => solicitud.idSolicitud !== idSolicitud));
        // Verificar nuevamente si todas las solicitudes están enviadas después de eliminar
        const allEnviadas = solicitudes.every(solicitud => solicitud.idSolicitud !== idSolicitud && solicitud.idEstado === 2);
        setAllSolicitudesEnviadas(allEnviadas);
    };

    const handleAddButtonClick = () => {
        navigate('/App');
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de Solicitudes</h5> 

                            {/* Botón Agregar Solicitud */}

                            {!allSolicitudesEnviadas && (
                                <button className="btn-07 col-md-6 offset-md-5 text-center" type="button" onClick={handleAddButtonClick}>
                                    <span className="btn-07__text">Agregar</span>
                                    <span className="btn-07__icon">
                                        <svg className="svg" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="12" x2="12" y1="5" y2="19"></line>
                                            <line x1="5" x2="19" y1="12" y2="12"></line>
                                        </svg>
                                    </span>
                                </button>
                            )}

                        </CardHeader>
                        <CardBody>
                            <hr />
                            <TablaSolicitud data={solicitudes} onDelete={handleDelete} onUpdate={mostrarSolicitudes} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

SolicitudesList.propTypes = {
    userId: PropTypes.number.isRequired
};

export default SolicitudesList;
