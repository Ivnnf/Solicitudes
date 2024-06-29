import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const UnidadPrincipalList = ({ selectedOptionDep, setSelectedOptionDep }) => {
    const [unidadPrincipal, setUnidadPrincipal] = useState([]);

    useEffect(() => {
        const fetchUnidadPrincipal = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/unidadprincipal');
                setUnidadPrincipal(response.data);
            } catch (error) {
                console.error('Error fetching UnidadPrincipal:', error);
            }
        };

        fetchUnidadPrincipal();
    }, []);

    const handleChange = (event) => {
        setSelectedOptionDep(event.target.value);
    };

    return (
        <div className="form-group">
            <label htmlFor="UnidadPrincipal">Unidad Principal:</label>
            <select
                id="UnidadPrincipal"
                name="UnidadPrincipal"
                className="form-control"
                value={selectedOptionDep}
                onChange={handleChange}
                required
            >
                <option value="">Seleccione una opción</option>
                {unidadPrincipal.map(unidad => (
                    <option key={unidad.idUnidadPrincipal} value={unidad.idUnidadPrincipal}>
                        {unidad.glosa}
                    </option>
                ))}
            </select>
        </div>
    );
};

UnidadPrincipalList.propTypes = {
    selectedOptionDep: PropTypes.string.isRequired,
    setSelectedOptionDep: PropTypes.func.isRequired,
};

export default UnidadPrincipalList;
