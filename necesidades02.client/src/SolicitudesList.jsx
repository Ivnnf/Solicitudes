// src/SolicitudesList.jsx
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardHeader, Container, Row, Col, Card, CardBody } from "reactstrap";
import TablaSolicitud from './TablaSolicitud';
import PropTypes from 'prop-types';

const SolicitudesList = ({ userId }) => {
    const [solicitudes, setSolicitudes] = useState([]);

    const mostrarSolicitudes = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/solicitud/usuario/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setSolicitudes(data);
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
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de Solicitudes</h5>
                        </CardHeader>
                        <CardBody>
                            <hr />
                            <TablaSolicitud data={solicitudes} onDelete={handleDelete} />
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
