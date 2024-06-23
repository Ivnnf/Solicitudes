import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TipoSolicitudList = ({ onSelect }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tipoSolicitudes, setTipoSolicitudes] = useState([]);

    useEffect(() => {
        const fetchTipoSolicitudes = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/tipoSolicitud');
                setTipoSolicitudes(response.data);
            } catch (error) {
                console.error('Error al obtener los tipos de solicitud:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTipoSolicitudes();
    }, []);

    const handleChange = (event) => {
        const selectedId = event.target.value;
        const selectedOption = tipoSolicitudes.find((tipo) => tipo.idTipoSolicitud === parseInt(selectedId, 10));
        console.log('Tipo de Solicitud seleccionado:', selectedOption); // Depuración
        onSelect(selectedOption);
    };

    if (isLoading) {
        return <div className="loader"> {/* Aquí tu loader */} </div>;
    }

    return (
        <div>
            <label htmlFor="tipoSolicitud">Tipo de Solicitud:</label>
            <select id="tipoSolicitud" onChange={handleChange} className="form-select">
                <option value="">Seleccione una opción</option>
                {tipoSolicitudes.map((tipo) => (
                    <option key={tipo.idTipoSolicitud} value={tipo.idTipoSolicitud}>
                        {tipo.glosa}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TipoSolicitudList;
