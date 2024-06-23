import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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
        cantidad: '0', // Valor inicial para evitar undefined
        descripcion: '', // Valor inicial para evitar undefined
    });

    const [selectedOption, setSelectedOption] = useState('');
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
        console.log('Tipo de Solicitud seleccionado en UsuarioFields:', selectOption); // Depuración
        setSelectedEspecificacion(null);
        setSelectedEquipamiento(null);
    };

    const onSelectedEspecificacion = (selectOption) => {
        setSelectedEspecificacion(selectOption);
        console.log('Especificación seleccionada en UsuarioFields:', selectOption); // Depuración
        setSelectedEquipamiento(null);
    };

    const onSelectedEquipamiento = (equipamiento) => {
        setSelectedEquipamiento(equipamiento);
        console.log('Equipamiento seleccionado en UsuarioFields:', equipamiento); // Depuración
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
            <DepartamentoList selectedOptionDep={selectedOption} setSelectedOptionDep={setSelectedOption} />
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
                <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                                fill="currentColor"
                                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                            ></path>
                        </svg>
                    </div>
                </div>
                <span>Enviar</span>
            </button>
        </div>
    );
};

UsuarioFields.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default UsuarioFields;
