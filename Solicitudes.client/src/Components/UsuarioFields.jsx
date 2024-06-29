import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import UnidadPrincipalList from './UnidadPrincipalList';
import DepartamentoList from './DepartamentoList';
import SubDepartamentoList from './SubDepartamentoList';
import TipoSolicitudList from './TipoSolicitudList';
import EspecificacionesList from './Especificaciones';
import EquipamientoEspecificoList from './EquipamientoEspecifico';
import CantidadYDescripcion from './CantidadYDescripcion';
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
    const [hasSubDepartamentos, setHasSubDepartamentos] = useState(false);
    const [selectedTipoSolicitud, setSelectedTipoSolicitud] = useState(null);
    const [selectedEspecificacion, setSelectedEspecificacion] = useState(null);
    const [selectedEquipamiento, setSelectedEquipamiento] = useState(null);

    const navigate = useNavigate();

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

    useEffect(() => {
        const checkSubDepartamentos = async (idDepartamento) => {
            if (idDepartamento) {
                try {
                    console.log(`Verificando subdepartamentos para el departamento con ID ${idDepartamento}`);
                    const response = await axios.get(`http://localhost:8081/api/subdepartamento/${idDepartamento}`);
                    console.log(`SubDepartamentos para ${idDepartamento}:`, response.data);
                    setHasSubDepartamentos(response.data.length > 0);
                } catch (error) {
                    console.error('Error verificando subdepartamentos:', error);
                    setHasSubDepartamentos(false);
                }
            } else {
                setHasSubDepartamentos(false);
            }
        };

        if (selectedDepartamento) {
            checkSubDepartamentos(selectedDepartamento);
        }
    }, [selectedDepartamento]);

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
        console.log('Equipamiento seleccionado en UsuarioFields:', equipamiento);
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

        // Validaciones
        if (!formData.NombreSolicitante.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El campo "Nombre del Solicitante" es obligatorio.',
            });
            return;
        }
        if (parseInt(formData.cantidad, 10) <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El campo "Cantidad" debe ser mayor que 0.',
            });
            return;
        }
        if (!formData.descripcion.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El campo "Descripción" es obligatorio.',
            });
            return;
        }
        if (!selectedOption) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor seleccione una Unidad Principal.',
            });
            return;
        }
        if (!selectedDepartamento) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor seleccione un Departamento.',
            });
            return;
        }

        if (!selectedTipoSolicitud || (selectedTipoSolicitud.glosa.toUpperCase() !== 'OTRO' && (!selectedEspecificacion || !selectedEquipamiento))) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor complete todas las selecciones.',
            });
            return;
        }

        const dataToSend = {
            IdTipoSolicitud: selectedTipoSolicitud.idTipoSolicitud,
            TipoSolicitudNombre: selectedTipoSolicitud.glosa,
            IdEspecificacion: selectedTipoSolicitud.glosa.toUpperCase() === 'OTRO' ? null : selectedEspecificacion ? selectedEspecificacion.idEspecificacion : null,
            EspecificacionNombre: selectedEspecificacion ? selectedEspecificacion.glosa : '',
            IdEquipEspec: selectedTipoSolicitud.glosa.toUpperCase() === 'OTRO' ? null : selectedEquipamiento ? selectedEquipamiento.idEquipEspec : null,
            IdUsuario: userId,
            UsuarioCorreo: formData.correo,
            Cantidad: parseInt(formData.cantidad, 10),
            Descripcion: formData.descripcion.trim(),
            Fecha: new Date().toISOString(),
            NombreSolicitante: formData.NombreSolicitante,
            IdUnidadPrincipal: selectedOption,
            IdDepartamento: selectedDepartamento,
            IdSubDepartamento: hasSubDepartamentos ? selectedDepartamento : null,
            IdEstado: 1,
            EstadoNombre: 'Pendiente'
        };

        console.log("Datos a enviar:", dataToSend);

        // Enviar datos al servidor
        enviarDatosAlServidor(dataToSend);
    };

    const enviarDatosAlServidor = async (dataToSend) => {
        try {
            const response = await axios.post('http://localhost:8081/api/solicitud/guardar', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Respuesta del servidor:', response.data);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Solicitud enviada exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate('/SolicitudesList');
            });
        } catch (error) {
            if (error.response) {
                console.error('Error en la respuesta del servidor:', error.response.data);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error: ${error.response.data}`,
                });
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se recibió respuesta del servidor.',
                });
            } else {
                console.error('Error al enviar la solicitud:', error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al enviar la solicitud.',
                });
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
                <DepartamentoList IdUnidadPrincipal={selectedOption} setSelectedDepartamento={setSelectedDepartamento} />
            )}
            {selectedDepartamento && (
                <>
                    {hasSubDepartamentos ? (
                        <SubDepartamentoList idDepartamento={selectedDepartamento} />
                    ) : (
                        <p>No hay subdepartamentos para este departamento.</p>
                    )}
                </>
            )}
            <TipoSolicitudList onSelect={onSelectedTipoSolicitud} />
            {selectedTipoSolicitud && selectedTipoSolicitud.glosa.toUpperCase() !== 'OTRO' && (
                <EspecificacionesList
                    idTipoSolicitud={selectedTipoSolicitud.idTipoSolicitud}
                    onSelect={onSelectedEspecificacion}
                />
            )}
            {selectedEspecificacion && selectedTipoSolicitud && selectedTipoSolicitud.glosa.toUpperCase() !== 'OTRO' && (
                <EquipamientoEspecificoList
                    IdEspecificacion={selectedEspecificacion.idEspecificacion}
                    onSelect={onSelectedEquipamiento}
                    cantidad={formData.cantidad}
                    descripcion={formData.descripcion}
                    onCantidadChange={handleCantidadChange}
                    onDescripcionChange={handleDescripcionChange}
                />
            )}
            {selectedTipoSolicitud && selectedTipoSolicitud.glosa.toUpperCase() === 'OTRO' && (
                <CantidadYDescripcion
                    cantidad={formData.cantidad}
                    descripcion={formData.descripcion}
                    onCantidadChange={handleCantidadChange}
                    onDescripcionChange={handleDescripcionChange}
                />
            )}
            <button className="btn-06 mt-5" onClick={handleSubmit}>
                <b>SOLICITAR</b>
            </button>
        </div>
    );
};

UsuarioFields.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default UsuarioFields;
