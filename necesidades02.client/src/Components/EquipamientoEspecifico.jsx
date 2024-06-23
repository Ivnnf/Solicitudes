import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EquipamientoEspecificoList = ({ IdEspecificacion, onSelect, onCantidadChange, onDescripcionChange }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [equipamientoEspecifico, setEquipamientoEspecifico] = useState([]);
    const [cantidad, setCantidad] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        const fetchEquipamientoEspecifico = async () => {
            try {
                setIsLoading(true);
                if (IdEspecificacion) {
                    const response = await axios.get(`http://localhost:8081/api/EquipamientoEspecifico/espec/${IdEspecificacion}`);
                    setEquipamientoEspecifico(response.data);
                }
            } catch (error) {
                console.error('Error al obtener los datos de Equipamiento Especifico:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEquipamientoEspecifico();
    }, [IdEspecificacion]);

    const handleEquipamientoChange = (event) => {
        const selectedId = event.target.value;
        const selectedOption = equipamientoEspecifico.find((equip) => equip.idEquipEspec === parseInt(selectedId, 10));
        onSelect(selectedOption);
    };

    const handleCantidadChange = (event) => {
        const newCantidad = event.target.value;
        setCantidad(newCantidad);
        onCantidadChange(newCantidad);
    };

    const handleDescripcionChange = (event) => {
        const newDescripcion = event.target.value;
        setDescripcion(newDescripcion);
        onDescripcionChange(newDescripcion);
    };

    if (isLoading) {
        return (
            <div className="loader">
                {/* Aquí tu loader */}
            </div>
        );
    }

    return (
        <div>
            <label htmlFor="EquipamientoEspecifico">Equipamiento Específico:</label>
            <select id="EquipamientoEspecifico" onChange={handleEquipamientoChange} className="form-select">
                <option value="">Seleccione una opción</option>
                {equipamientoEspecifico.map((equip) => (
                    <option key={equip.idEquipEspec} value={equip.idEquipEspec}>
                        {equip.glosa}
                    </option>
                ))}
            </select>

            <label htmlFor="Cantidad">Cantidad:</label>
            <input
                type="number"
                id="Cantidad"
                className="form-control"
                value={cantidad}
                onChange={handleCantidadChange}
                required
            />

            <label htmlFor="Descripcion">Comentarios adicionales:</label>
            <textarea
                id="Descripcion"
                className="form-control"
                value={descripcion}
                onChange={handleDescripcionChange}
                required
            ></textarea>
        </div>
    );
};

export default EquipamientoEspecificoList;
