import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const DepartamentoList = ({ IdUnidadPrincipal, setSelectedDepartamento, selectedDepartamento }) => {
    const [departamentos, setDepartamentos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDepartamentos = async () => {
            if (IdUnidadPrincipal) {
                setIsLoading(true);
                try {
                    const response = await axios.get(`http://localhost:8081/api/departamento/unidad/${IdUnidadPrincipal}`);
                    setDepartamentos(response.data);
                } catch (error) {
                    console.error('Error fetching departamentos:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchDepartamentos();
    }, [IdUnidadPrincipal]);

    const handleChange = (event) => {
        setSelectedDepartamento(Number(event.target.value)); // Asegurarse de que el valor sea un número
    };

    return (
        <div className="form-group">
            <label htmlFor="Departamento">Departamento:</label>
            {isLoading ? (
                <p>Cargando departamentos...</p>
            ) : (
                <select id="Departamento" name="Departamento" className="form-control" value={selectedDepartamento || ''} onChange={handleChange}>
                    <option value="">Seleccione un departamento</option>
                    {departamentos.map(departamento => (
                        <option key={departamento.idDepartamento} value={departamento.idDepartamento}>
                            {departamento.glosa}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

DepartamentoList.propTypes = {
    IdUnidadPrincipal: PropTypes.number.isRequired,
    setSelectedDepartamento: PropTypes.func.isRequired,
    selectedDepartamento: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Aceptar número o string
};

export default DepartamentoList;
