import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EspecificacionesList = ({ idTipoSolicitud,idEquipo,onSelect }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [especificaciones, setEspecificaciones] = useState([]);

    useEffect(() => {
        const fetchTipoSolicitudes = async () => {
            try {
                var response= null;
                if(idTipoSolicitud!= null){
                response = await axios.get(`http://localhost:8081/api/especificacion/sol/${idTipoSolicitud}`);
                }else if(idEquipo){

                }
                console.log('Datos recibidos:', response.data); // Verifica los datos en la consola
                setEspecificaciones(response.data);
            } catch (error) {
                console.error('Error al obtener los tipos de solicitud:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTipoSolicitudes();
    }, [idTipoSolicitud]);

    const handleChange = (event) => {
        const selectedId = event.target.value;
        const selectedOption = especificaciones.find((tipo) => tipo.idEquipEsp === parseInt(selectedId, 10));
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
            <label htmlFor="Especificacion">Especificacion:</label>
            <select id="Especificacion" onChange={handleChange} className="form-select">
                <option value="">Seleccione una opción</option>
                {especificaciones.map((tipo) => (
                    <option key={tipo.idEquipEsp} value={tipo.idEquipEsp}>
                        {tipo.glosa}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default EspecificacionesList;
