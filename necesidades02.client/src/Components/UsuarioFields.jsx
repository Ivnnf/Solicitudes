import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import UnidadPrincipalList from './UnidadPrincipalList';
import DepartamentoList from './DepartamentoList';
import TipoSolicitudList from './TipoSolicitudList';
import EspecificacionesList from './Especificaciones';
import EquipamientoEspecificoList from './EquipamientoEspecifico';
import '../assets/Styles/styles.css';

const UsuarioFields = ({ userId }) => {
    const [isFetching, setIsFetching] = useState(false);
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        correo: '',
        NombreSolicitante: '',
        cantidad: '0',
        descripcion: '',
    });

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedDepartamento, setSelectedDepartamento] = useState('');
    const [selectedTipoSolicitud, setSelectedTipoSolicitud] = useState(null);
    const [selectedEspecificacion, setSelectedEspecificacion] = useState(null);
    const [selectedEquipamiento, setSelectedEquipamiento] = useState(null);

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

    const onSelectedTipoSolicitud = (selectOption) => {
        setSelectedTipoSolicitud(selectOption);
        setSelectedEspecificacion(null);
        setSelectedEquipamiento(null);
    };

    const onSelectedEspecificacion = (selectOption) => {
        setSelectedEspecificacion(selectOption);
        setSelectedEquipamiento(null);
    };

    const onSelectedEquipamiento = (equipamiento) => {
        setSelectedEquipamiento(equipamiento);
    };

    const handleCantidadChange = (newCantidad) => {
        setFormData({
            ...formData,
            cantidad: newCantidad,
        });
    };

    const handleDescripcionChange = (newDescripcion) => {
        setFormData({
            ...formData,
            descripcion: newDescripcion,
        });
    };

    const handleSubmit = () => {
        console.log("Datos actuales de formData:", formData);
        console.log("Tipo de Solicitud seleccionado:", selectedTipoSolicitud);
        console.log("Especificación seleccionada:", selectedEspecificacion);
        console.log("Equipamiento seleccionado:", selectedEquipamiento);

        if (!selectedTipoSolicitud || !selectedEspecificacion || !selectedEquipamiento) {
            alert('Por favor complete todas las selecciones.');
            return;
        }

        const dataToSend = {
            Id_Tipo_Solicitud: selectedTipoSolicitud.idTipoSolicitud,
            Id_Especificacion: selectedEspecificacion.idEspecificacion,
            Id_Equip_Espec: selectedEquipamiento.idEquipEsp,
            Id_Usuario: userId,
            Cantidad: parseInt(formData.cantidad, 10),
            Descripcion: formData.descripcion.trim() || '',
            Fecha: new Date().toISOString(),
        };

        console.log("Datos a enviar:", dataToSend);

        // Enviar datos al servidor
        enviarDatosAlServidor(dataToSend);
    };

    const enviarDatosAlServidor = async (dataToSend) => {
        try {
            const response = await axios.post('http://localhost:8081/api/solicitud/Guardar', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Respuesta del servidor:', response.data);
            alert('Solicitud enviada exitosamente');
        } catch (error) {
            if (error.response) {
                console.error('Error en la respuesta del servidor:', error.response.data);
                alert(`Error: ${error.response.data}`);
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);
                alert('No se recibió respuesta del servidor.');
            } else {
                console.error('Error al enviar la solicitud:', error.message);
                alert('Error al enviar la solicitud.');
            }
        }
    };

    return isFetching ? (
        <div className="loader">
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
                <label htmlFor="NombreSolicitante">Nombre Del Solicitante:</label>
                <input
                    type="text"
                    className="form-control"
                    id="NombreSolicitante"
                    name="NombreSolicitante"
                    value={formData.NombreSolicitante || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <UnidadPrincipalList selectedOptionDep={selectedOption} setSelectedOptionDep={setSelectedOption} />
            {selectedOption && (
                <DepartamentoList IdUnidadPrincipal={selectedOption} />
            )}
            <TipoSolicitudList onSelect={onSelectedTipoSolicitud} />
            {selectedTipoSolicitud && (
                <EspecificacionesList
                    idTipoSolicitud={selectedTipoSolicitud.idTipoSolicitud}
                    onSelect={onSelectedEspecificacion}
                />
            )}
            {selectedEspecificacion && (
                <EquipamientoEspecificoList
                    IdEspecificacion={selectedEspecificacion.idEspecificacion}
                    onSelect={onSelectedEquipamiento}
                    onCantidadChange={handleCantidadChange}
                    onDescripcionChange={handleDescripcionChange}
                />
            )}
            <button className="btn-06 mt-5" onClick={handleSubmit}>
                <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" class="sparkle">
                    <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                </svg>
                <span className="text">Solicitar</span>
            </button>
        </div>
    );
};

UsuarioFields.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default UsuarioFields;
