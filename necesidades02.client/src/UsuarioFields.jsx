import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import DepartamentoList from './DepartamentoList';
import TipoSolicitudList from './TipoSolicitudList';
import EspecificacionesList from './Especificaciones'

const UsuarioFields = ({ userId }) => {
    const [isFetching, setIsFetching] = useState(false);
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        correo: '',
        telefono: '',
        NombreSolicitante: '',
    });

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedTipoSolicitud,setSelectedTipoSolicitud] =useState(null);

    useEffect(() => {
        const fetchUsuario = async (id) => {
            setIsFetching(true);
            try {
                const response = await axios.get(`http://localhost:8081/api/usuario/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            } finally {
                setIsFetching(false);
            }
        };

        if (userId) {
            fetchUsuario(userId);
        }
    }, [userId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSelectedTipoSolicitud=(selectOption)=>{
        setSelectedTipoSolicitud(selectOption);
    }


    return isFetching ? (
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
            <DepartamentoList selectedOptionDep={selectedOption} setSelectedOptionDep={setSelectedOption} />
            <TipoSolicitudList onSelect={onSelectedTipoSolicitud} />
            {selectedTipoSolicitud && <EspecificacionesList idTipoSolicitud={selectedTipoSolicitud.idTipoSolicitud}/>}
        </div>
    );
};

UsuarioFields.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default UsuarioFields;
