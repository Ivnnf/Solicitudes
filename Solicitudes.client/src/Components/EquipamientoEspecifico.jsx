import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CantidadYDescripcion from './CantidadYDescripcion';

const EquipamientoEspecificoList = ({ IdEspecificacion, onSelect, cantidad, descripcion, onCantidadChange, onDescripcionChange, selectedEquipamiento }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [equipamientoEspecifico, setEquipamientoEspecifico] = useState([]);

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
            <select id="EquipamientoEspecifico" onChange={handleEquipamientoChange} className="form-select" value={selectedEquipamiento ? selectedEquipamiento.idEquipEspec : ''}>
                <option value="">Seleccione una opción</option>
                {equipamientoEspecifico.map((equip) => (
                    <option key={equip.idEquipEspec} value={equip.idEquipEspec}>
                        {equip.glosa}
                    </option>
                ))}
            </select>

            <CantidadYDescripcion
                cantidad={cantidad}
                descripcion={descripcion}
                onCantidadChange={onCantidadChange}
                onDescripcionChange={onDescripcionChange}
            />
        </div>
    );
};

export default EquipamientoEspecificoList;
