import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TipoSolicitudFields from './TipoSolicitudFields';
import DepartamentoFields from './DepartamentoFields';

const UsuarioFields = ({ userId }) => {
    const [isFetching, setIsFetching] = useState(false);
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        correo: '',
        telefono: '',
        NombreSolicitante: '',
    });

    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        const fetchUsuario = async (idUser = 6) => {
            setIsFetching(true);
            try {
                const response = await axios.get(`http://localhost:8081/usuarios/${idUser}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchUsuario();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return isFetching ? (
        <p>Loading...</p>
    ) : (
        <div className="container mt-5">
            <div className="form-group">
                <label htmlFor="NombreCompleto">Nombre Completo:</label>
                <input
                    type="text"
                    className="form-control"
                    id="NombreCompleto"
                    name="nombreCompleto"
                    value={formData.nombreCompleto}
                    readOnly
                />
            </div>
            <div className="form-group">
                <label htmlFor="Correo">Correo Electrónico:</label>
                <input
                    type="email"
                    className="form-control"
                    id="Correo"
                    name="correo"
                    value={formData.correo}
                    readOnly
                />
            </div>
            <div className="form-group">
                <label htmlFor="Telefono">Anexo:</label>
                <input
                    type="tel"
                    className="form-control"
                    id="Telefono"
                    name="telefono"
                    value={formData.telefono}
                    readOnly
                />
            </div>
            <div className="form-group">
                <label htmlFor="NombreSolicitante">Nombre Del Solicitante:</label>
                <input
                    type="text"
                    className="form-control"
                    id="NombreSolicitante"
                    name="NombreSolicitante"
                    value={formData.NombreSolicitante}
                    onChange={handleChange}
                    required
                />
            </div>
            <DepartamentoFields />
            <TipoSolicitudFields selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </div>
    );
};

UsuarioFields.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default UsuarioFields;
