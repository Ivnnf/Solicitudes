import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TipoSolicitudList = ({ onSelect }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tipoSolicitudes, setTipoSolicitudes] = useState([]);

    useEffect(() => {
        const fetchTipoSolicitudes = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/tipoSolicitud');
                console.log('Datos recibidos:', response.data); // Verifica los datos en la consola
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
        onSelect(selectedOption); // Llamamos a la función de selección proporcionada
    };

    if (isLoading) {
        return (
            <div className="loader"> {/* Cambiar `class` a `className` */}
                <div className="square" id="sq1"></div>
                <div className="square" id="sq2"></div>
                <div className="square" id="sq3"></div>
                <div className="square" id="sq4"></div>
                <div className="square" id="sq5"></div>
                <div className="square" id="sq6"></div>
                <div className="square" id="sq7"></div>
                <div className="square" id="sq8"></div>
                <div className="square" id="sq9"></div>
            </div>
        );
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
