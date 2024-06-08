import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const DepartamentoFields = ({ selectedOption, setSelectedOption }) => {
    const [departamentos, setDepartamentos] = useState([]);

    useEffect(() => {
        const fetchDepartamentos = async () => {
            try {
                const response = await axios.get('http://localhost:8081/departamentos');
                setDepartamentos(response.data);
            } catch (error) {
                console.error('Error fetching departamentos:', error);
            }
        };

        fetchDepartamentos();
    }, []);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="form-group">
            <label htmlFor="Departamento">Departamento:</label>
            <select
                id="Departamento"
                name="departamento"
                className="form-control"
                value={selectedOption}
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

DepartamentoFields.propTypes = {
    selectedOption: PropTypes.string.isRequired,
    setSelectedOption: PropTypes.func.isRequired,
};

export default DepartamentoFields;
