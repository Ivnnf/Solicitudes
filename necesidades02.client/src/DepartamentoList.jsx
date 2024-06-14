import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const DepartamentoList = ({ selectedOptionDep, setSelectedOptionDep }) => {
    const [departamentos, setDepartamentos] = useState([]);

    useEffect(() => {
        const fetchDepartamentos = async () => {
            try {
                // Asegúrate de que la URL es correcta y que la API está devolviendo los datos correctos
                const response = await axios.get('http://localhost:8081/api/departamento');
                setDepartamentos(response.data);
            } catch (error) {
                console.error('Error fetching departamentos:', error);
            }
        };

        fetchDepartamentos();
    }, []);

    const handleChange = (event) => {
        setSelectedOptionDep(event.target.value);
    };

    return (
        <div className="form-group">
            <label htmlFor="Departamento">Departamento:</label>
            <select
                id="Departamento"
                name="departamento"
                className="form-control"
                value={selectedOptionDep}
                onChange={handleChange}
                required
            >
                <option value="">Seleccione una opción</option>
                {departamentos.map(departamento => (
                    <option key={departamento.idDepartamento} value={departamento.idDepartamento}>
                        {departamento.glosa}
                    </option>
                ))}
            </select>
        </div>
    );
};

DepartamentoList.propTypes = {
    selectedOptionDep: PropTypes.string.isRequired,
    setSelectedOptionDep: PropTypes.func.isRequired,
};

export default DepartamentoList;
