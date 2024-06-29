import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EspecificacionesList = ({ idTipoSolicitud, onSelect, selectedEspecificacion }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [especificaciones, setEspecificaciones] = useState([]);

    useEffect(() => {
        const fetchEspecificaciones = async () => {
            try {
                let response = null;
                if (idTipoSolicitud) {
                    response = await axios.get(`http://localhost:8081/api/especificacion/sol/${idTipoSolicitud}`);
                    setEspecificaciones(response.data);
                }
            } catch (error) {
                console.error('Error al obtener las especificaciones:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEspecificaciones();
    }, [idTipoSolicitud]);

    const handleChange = (event) => {
        const selectedId = event.target.value;
        const selectedOption = especificaciones.find((especificacion) => especificacion.idEspecificacion === parseInt(selectedId, 10));
        onSelect(selectedOption);
    };

    return (
        <div>
            <label htmlFor="Especificacion">Especificación:</label>
            <select id="Especificacion" onChange={handleChange} className="form-select" value={selectedEspecificacion ? selectedEspecificacion.idEspecificacion : ''}>
                <option value="">Seleccione una opción</option>
                {especificaciones.map((especificacion) => (
                    <option key={especificacion.idEspecificacion} value={especificacion.idEspecificacion}>
                        {especificacion.glosa}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default EspecificacionesList;
