import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const TipoSolicitudFields = ({ selectedOption, setSelectedOption }) => {
    const [opciones, setOpciones] = useState([]);

    useEffect(() => {
        const fetchOpciones = async () => {
            try {
                const response = await axios.get('http://localhost:8081/tipoSolicitud');
                setOpciones(response.data);
            } catch (error) {
                console.error('Error al obtener las opciones:', error);
            }
        };

        fetchOpciones();
    }, []);

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="form-group">
            <label htmlFor="solicitud">Tipo de Solicitud:</label>
            <select
                id="solicitud"
                name="solicitud"
                className="form-control"
                value={selectedOption}
                onChange={handleChange}
                required
            >
                <option value="">Seleccione una opción</option>
                {opciones.map(opcion => (
                    <option key={opcion.idTipoSolicitud} value={opcion.idTipoSolicitud}>
                        {opcion.glosa}
                    </option>
                ))}
            </select>
        </div>
    );
};

TipoSolicitudFields.propTypes = {
    selectedOption: PropTypes.string.isRequired,
    setSelectedOption: PropTypes.func.isRequired,
};

export default TipoSolicitudFields;
