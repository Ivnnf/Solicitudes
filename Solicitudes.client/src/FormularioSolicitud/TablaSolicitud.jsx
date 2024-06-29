import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import UnidadPrincipalList from '../Components/UnidadPrincipalList'; 
import DepartamentoList from '../Components/DepartamentoList'; 
import SubDepartamentoList from '../Components/SubDepartamentoList'; 
import TipoSolicitudList from '../Components/TipoSolicitudList'; 
import EspecificacionesList from '../Components/Especificaciones'; 
import EquipamientoEspecificoList from '../Components/EquipamientoEspecifico'; 
import CantidadYDescripcion from '../Components/CantidadYDescripcion'; 
import '../assets/Styles/styles.css';

const TablaSolicitud = ({ data = [], onDelete, onUpdate }) => {
    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState({
        idSolicitud: null,
        tipoSolicitudNombre: '',
        especificacionNombre: '',
        equipamientoEspecificoNombre: '',
        cantidad: '',
        descripcion: '',
        nombreSolicitante: '',
        idUsuario: '',
        selectedOption: '',
        selectedDepartamento: '',
        selectedSubDepartamento: '',
        selectedTipoSolicitud: null,
        selectedEspecificacion: null,
        selectedEquipamiento: null,
    });
    const [hasSubDepartamentos, setHasSubDepartamentos] = useState(false);

    const toggleModal = () => setModal(!modal);

    const handleEditClick = (solicitud) => {
        setEditData({
            ...solicitud,
            selectedOption: solicitud.idUnidadPrincipal,
            selectedDepartamento: solicitud.idDepartamento,
            selectedSubDepartamento: solicitud.idSubDepartamento,
            selectedTipoSolicitud: { idTipoSolicitud: solicitud.idTipoSolicitud, glosa: solicitud.tipoSolicitudNombre },
            selectedEspecificacion: { idEspecificacion: solicitud.idEspecificacion, glosa: solicitud.especificacionNombre },
            selectedEquipamiento: { idEquipEspec: solicitud.idEquipEspec, nombre: solicitud.equipamientoEspecificoNombre },
        });
        toggleModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value
        });
    };

    useEffect(() => {
        const checkSubDepartamentos = async (idDepartamento) => {
            if (idDepartamento) {
                try {
                    const response = await axios.get(`http://localhost:8081/api/subdepartamento/${idDepartamento}`);
                    setHasSubDepartamentos(response.data.length > 0);
                } catch (error) {
                    console.error('Error verificando subdepartamentos:', error);
                    setHasSubDepartamentos(false);
                }
            } else {
                setHasSubDepartamentos(false);
            }
        };

        if (editData.selectedDepartamento) {
            checkSubDepartamentos(editData.selectedDepartamento);
        }
    }, [editData.selectedDepartamento]);

    const handleSave = async () => {
        const dataToSend = {
            IdSolicitud: editData.idSolicitud,
            IdTipoSolicitud: editData.selectedTipoSolicitud ? editData.selectedTipoSolicitud.idTipoSolicitud : null,
            IdEspecificacion: editData.selectedEspecificacion ? editData.selectedEspecificacion.idEspecificacion : null,
            IdEquipEspec: editData.selectedEquipamiento ? editData.selectedEquipamiento.idEquipEspec : null,
            Cantidad: editData.cantidad,
            Descripcion: editData.descripcion,
            NombreSolicitante: editData.nombreSolicitante,
            IdUsuario: editData.idUsuario,
            IdUnidadPrincipal: editData.selectedOption,
            IdDepartamento: editData.selectedDepartamento,
            IdSubDepartamento: hasSubDepartamentos ? editData.selectedSubDepartamento : null,
            IdEstado: editData.idEstado,
            Fecha: editData.fecha,  // Asegúrate de que esta propiedad esté disponible
        };

        try {
            const response = await axios.put(`http://localhost:8081/api/solicitud/usuario/editar/${editData.idSolicitud}`, dataToSend);
            if (response.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Solicitud actualizada con éxito.',
                    showConfirmButton: false,
                    timer: 1500
                });
                toggleModal();
                onUpdate(); // Refresca la lista de solicitudes en el componente padre
            }
        } catch (error) {
            console.error("Error al actualizar la solicitud:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar la solicitud.',
            });
        }
    };

    const handleDeleteClick = async (idSolicitud) => {
        Swal.fire({
            title: '¿Estás seguro de que quieres eliminar esta solicitud?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:8081/api/solicitud/Eliminar/${idSolicitud}`);
                    if (response.status === 200) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Solicitud eliminada con éxito.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        onDelete(idSolicitud); // Actualiza la lista en el componente padre
                    }
                } catch (error) {
                    console.error("Error al eliminar la solicitud:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al eliminar la solicitud.',
                    });
                }
            }
        });
    };

    const handleSendAllClick = async () => {
        const solicitudesToSend = data.filter(item => item.idEstado !== 2);

        if (solicitudesToSend.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No hay solicitudes para enviar.',
                text: 'Todas las solicitudes ya han sido enviadas.',
            });
            return;
        }

        Swal.fire({
            title: '¿Estás seguro de que quieres enviar todas las solicitudes?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, enviar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const responses = await Promise.all(
                        solicitudesToSend.map(solicitud =>
                            axios.put(`http://localhost:8081/api/solicitud/usuario/editar/${solicitud.idSolicitud}`, {
                                idSolicitud: solicitud.idSolicitud,
                                idTipoSolicitud: solicitud.idTipoSolicitud,
                                idEspecificacion: solicitud.idEspecificacion || 0, // Valor por defecto si es nulo
                                idEquipEspec: solicitud.idEquipEspec || 0, // Valor por defecto si es nulo
                                cantidad: solicitud.cantidad || 0,
                                descripcion: solicitud.descripcion || '',
                                fecha: solicitud.fecha,
                                nombreSolicitante: solicitud.nombreSolicitante,
                                idUsuario: solicitud.idUsuario,
                                idUnidadPrincipal: solicitud.idUnidadPrincipal,
                                idDepartamento: solicitud.idDepartamento,
                                idSubDepartamento: solicitud.idSubDepartamento,
                                idEstado: 2 // Cambiamos el estado a '2' para indicar que se ha enviado
                            })
                        )
                    );

                    if (responses.every(response => response.status === 200)) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Todas las solicitudes enviadas con éxito.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        onUpdate(); // Actualiza la lista de solicitudes en el componente padre
                    }
                } catch (error) {
                    console.error("Error al enviar las solicitudes:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al enviar las solicitudes.',
                    });
                }
            }
        });
    };

    return (
        <div>
            <Table striped responsive>
                <thead>
                    <tr>
                        <th>Tipo Solicitud</th>
                        <th>Especificación</th>
                        <th>Equipamiento</th>
                        <th>Cantidad</th>
                        <th>Descripción</th>
                        <th>Nombre Del Solicitante</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length < 1 ? (
                        <tr>
                            <td colSpan="7">Sin Registros</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.idSolicitud}>
                                <td>{item.tipoSolicitudNombre}</td>
                                <td>{item.especificacionNombre}</td>
                                <td>{item.equipamientoEspecificoNombre}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.descripcion}</td>
                                <td>{item.nombreSolicitante}</td>
                                <td>
                                    {item.idEstado === 2 ? (
                                        <span>Solicitud Enviada</span>
                                    ) : (
                                        <div className="button-container">
                                        <button className="editBtn" onClick={() => handleEditClick(item)}>
                                            <svg height="1em" viewBox="0 0 512 512">
                                                <path
                                                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 
                                                    22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 
                                                    55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4 0 22.6z"
                                                ></path>
                                            </svg>
                                        </button>
                                        
                                        <button className="bin-button" onClick={() => handleDeleteClick(item.idSolicitud)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 39 7"
                                                className="bin-top"
                                            >
                                                <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                                                <line
                                                    stroke-width="3"
                                                    stroke="white"
                                                    y2="1.5"
                                                    x2="26.0357"
                                                    y1="1.5"
                                                    x1="12"
                                                ></line>
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 33 39"
                                                className="bin-bottom"
                                            >
                                                <mask fill="white" id="path-1-inside-1_8_19">
                                                    <path
                                                        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                                    ></path>
                                                </mask>
                                                <path
                                                    mask="url(#path-1-inside-1_8_19)"
                                                    fill="white"
                                                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                                ></path>
                                                <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                                                <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 89 80"
                                                className="garbage"
                                            >
                                                <path
                                                    fill="white"
                                                    d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            <button className="btn-05">
            <div className="svg-wrapper-1"  onClick={handleSendAllClick}>
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
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 
                    19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                </svg>
                </div>
            </div>
            <span>Enviar</span>
            </button>


            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Editar Solicitud</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="nombreSolicitante">Nombre del Solicitante</Label>
                            <Input
                                type="text"
                                name="nombreSolicitante"
                                id="nombreSolicitante"
                                value={editData.nombreSolicitante}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <UnidadPrincipalList selectedOptionDep={editData.selectedOption} setSelectedOptionDep={(val) => setEditData({ ...editData, selectedOption: val })} />
                        {editData.selectedOption && (
                            <DepartamentoList IdUnidadPrincipal={editData.selectedOption} setSelectedDepartamento={(val) => setEditData({ ...editData, selectedDepartamento: val })} selectedDepartamento={editData.selectedDepartamento} />
                        )}
                        {editData.selectedDepartamento && (
                            <>
                                {hasSubDepartamentos ? (
                                    <SubDepartamentoList idDepartamento={editData.selectedDepartamento} setSelectedSubDepartamento={(val) => setEditData({ ...editData, selectedSubDepartamento: val })} />
                                ) : (
                                    <p>No hay subdepartamentos para este departamento.</p>
                                )}
                            </>
                        )}
                        <TipoSolicitudList onSelect={(val) => setEditData({ ...editData, selectedTipoSolicitud: val, selectedEspecificacion: null, selectedEquipamiento: null })} selectedTipoSolicitud={editData.selectedTipoSolicitud} />
                        {editData.selectedTipoSolicitud && editData.selectedTipoSolicitud.glosa.toUpperCase() !== 'OTRO' && (
                            <EspecificacionesList
                                idTipoSolicitud={editData.selectedTipoSolicitud.idTipoSolicitud}
                                onSelect={(val) => setEditData({ ...editData, selectedEspecificacion: val, selectedEquipamiento: null })}
                                selectedEspecificacion={editData.selectedEspecificacion}
                            />
                        )}
                        {editData.selectedEspecificacion && editData.selectedTipoSolicitud && editData.selectedTipoSolicitud.glosa.toUpperCase() !== 'OTRO' && (
                            <EquipamientoEspecificoList
                                IdEspecificacion={editData.selectedEspecificacion.idEspecificacion}
                                onSelect={(val) => setEditData({ ...editData, selectedEquipamiento: val })}
                                cantidad={editData.cantidad}
                                descripcion={editData.descripcion}
                                onCantidadChange={(val) => setEditData({ ...editData, cantidad: val })}
                                onDescripcionChange={(val) => setEditData({ ...editData, descripcion: val })}
                                selectedEquipamiento={editData.selectedEquipamiento}
                            />
                        )}
                        {editData.selectedTipoSolicitud && editData.selectedTipoSolicitud.glosa.toUpperCase() === 'OTRO' && (
                            <CantidadYDescripcion
                                cantidad={editData.cantidad}
                                descripcion={editData.descripcion}
                                onCantidadChange={(val) => setEditData({ ...editData, cantidad: val })}
                                onDescripcionChange={(val) => setEditData({ ...editData, descripcion: val })}
                            />
                        )}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn-03' onClick={handleSave}><b>Guardar</b></Button>
                    <Button className='btn-04' onClick={toggleModal}><b>Cancelar</b></Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

TablaSolicitud.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        idSolicitud: PropTypes.number.isRequired,
        tipoSolicitudNombre: PropTypes.string.isRequired,
        especificacionNombre: PropTypes.string.isRequired,
        equipamientoEspecificoNombre: PropTypes.string.isRequired,
        cantidad: PropTypes.number.isRequired,
        descripcion: PropTypes.string.isRequired,
        nombreSolicitante: PropTypes.string.isRequired,
        idEstado: PropTypes.number.isRequired // Incluye idEstado en los propTypes
    })).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired // Asegúrate de que onUpdate esté definido en los propTypes
};

export default TablaSolicitud;
