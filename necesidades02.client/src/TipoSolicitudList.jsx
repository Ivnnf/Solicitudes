import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TipoSolicitudList = ({ onSelect }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tipoSolicitudes, setTipoSolicitudes] = useState([]);

    useEffect(() => {
        const fetchTipoSolicitudes = async () => {
            try {
                // Verifica que la URL es correcta y que la API está devolviendo los datos correctos
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
        return <p>Cargando...</p>;
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
