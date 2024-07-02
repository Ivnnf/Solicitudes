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
        cantidad: '', // Inicializa cantidad como cadena vacía
        descripcion: '', // Inicializa descripción como una cadena vacía
    });

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedDepartamento, setSelectedDepartamento] = useState('');
    const [selectedSubDepartamento, setSelectedSubDepartamento] = useState('');
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
        const errors = [];

        if (!formData.NombreSolicitante || !formData.NombreSolicitante.trim()) {
            errors.push('El campo "Nombre del Solicitante" es obligatorio.');
        }
        if (formData.cantidad === '' || parseInt(formData.cantidad, 10) <= 0 || isNaN(parseInt(formData.cantidad, 10))) {
            errors.push('El campo "Cantidad" es obligatorio y debe ser mayor que 0.');
        }
        if (!formData.descripcion || !formData.descripcion.trim()) {
            errors.push('El campo "Descripción" es obligatorio.');
        }
        if (!selectedOption) {
            errors.push('Por favor seleccione una Unidad Principal.');
        }
        if (!selectedDepartamento) {
            errors.push('Por favor seleccione un Departamento.');
        }
        if (hasSubDepartamentos && !selectedSubDepartamento) {
            errors.push('Por favor seleccione un SubDepartamento.');
        }
        if (!selectedTipoSolicitud || (selectedTipoSolicitud.glosa.toUpperCase() !== 'OTRO' && (!selectedEspecificacion || !selectedEquipamiento))) {
            errors.push('Por favor complete todas las selecciones.');
        }

        if (errors.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: errors.join('<br/>'),
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
            IdUnidadPrincipal: parseInt(selectedOption, 10), // Convertir a número
            IdDepartamento: parseInt(selectedDepartamento, 10), // Convertir a número
            IdSubDepartamento: hasSubDepartamentos ? parseInt(selectedSubDepartamento, 10) : null, // Convertir a número si es necesario
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
                <DepartamentoList IdUnidadPrincipal={parseInt(selectedOption, 10)} setSelectedDepartamento={setSelectedDepartamento} selectedDepartamento={selectedDepartamento} />
            )}
            {selectedDepartamento && (
                <>
                    {hasSubDepartamentos ? (
                        <SubDepartamentoList idDepartamento={parseInt(selectedDepartamento, 10)} setSelectedSubDepartamento={setSelectedSubDepartamento} selectedSubDepartamento={selectedSubDepartamento} />
                    ) : (
                        <p>No hay subdepartamentos para este departamento.</p>
                    )}
                </>
            )}
            <TipoSolicitudList onSelect={onSelectedTipoSolicitud} selectedTipoSolicitud={selectedTipoSolicitud} />
            {selectedTipoSolicitud && selectedTipoSolicitud.glosa.toUpperCase() !== 'OTRO' && (
                <EspecificacionesList
                    idTipoSolicitud={selectedTipoSolicitud.idTipoSolicitud}
                    onSelect={onSelectedEspecificacion}
                    selectedEspecificacion={selectedEspecificacion}
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
                    selectedEquipamiento={selectedEquipamiento}
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

            <button className='btn-08 mt-5' onClick={handleSubmit}>
                <div className="svg-wrapper-1" >
                    <div className="svg-wrapper">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="30"
                            height="30"
                            className="icon"
                        >
                            <path
                                d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"
                            ></path>
                        </svg>
                    </div>
                </div>
                <span>Guardar</span>
            </button>
        </div>
    );
};

UsuarioFields.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default UsuarioFields;
