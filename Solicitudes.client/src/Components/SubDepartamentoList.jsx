import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const SubDepartamentoList = ({ idDepartamento, setSelectedSubDepartamento, selectedSubDepartamento }) => {
    const [subDepartamentos, setSubDepartamentos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchSubDepartamentos = async () => {
            if (idDepartamento) {
                setIsLoading(true);
                try {
                    console.log(`Fetching SubDepartamentos for idDepartamento: ${idDepartamento}`);
                    const response = await axios.get(`http://localhost:8081/api/subdepartamento/${idDepartamento}`);
                    setSubDepartamentos(response.data);
                } catch (error) {
                    console.error('Error fetching SubDepartamentos:', error);
                    setSubDepartamentos([]); // En caso de error, define una lista vacía
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSubDepartamentos([]);
            }
        };

        fetchSubDepartamentos();
    }, [idDepartamento]);

    const handleChange = (event) => {
        setSelectedSubDepartamento(event.target.value);
    };

    return (
        <div className="form-group">
            <label htmlFor="SubDepartamento">SubDepartamento:</label>
            {isLoading ? (
                <p>Cargando subdepartamentos...</p>
            ) : (
                <select
                    id="SubDepartamento"
                    name="SubDepartamento"
                    className="form-control"
                    value={selectedSubDepartamento}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un SubDepartamento</option>
                    {subDepartamentos.map(subDepartamento => (
                        <option key={subDepartamento.idSubDepartamento} value={subDepartamento.idSubDepartamento}>
                            {subDepartamento.glosa}
                        </option>
                    ))}
                    {subDepartamentos.length === 0 && (
                        <option value="" disabled>No hay subdepartamentos disponibles</option>
                    )}
                </select>
            )}
        </div>
    );
};

SubDepartamentoList.propTypes = {
    idDepartamento: PropTypes.number.isRequired,
    setSelectedSubDepartamento: PropTypes.func.isRequired,
    selectedSubDepartamento: PropTypes.string.isRequired,
};

export default SubDepartamentoList;
