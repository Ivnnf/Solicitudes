import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
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
        nombreSolicitante: ''
    });

    const toggleModal = () => setModal(!modal);

    const handleEditClick = (solicitud) => {
        setEditData(solicitud);
        toggleModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:8081/api/solicitud/usuario/editar/${editData.idSolicitud}`, editData);
            if (response.status === 200) {
                alert('Solicitud actualizada con éxito.');
                toggleModal();
                onUpdate(); // Refresca la lista de solicitudes en el componente padre
            }
        } catch (error) {
            console.error("Error al actualizar la solicitud:", error);
            alert('Error al actualizar la solicitud.');
        }
    };

    const handleDeleteClick = async (idSolicitud) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta solicitud?");
        if (!confirmDelete) {
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8081/api/solicitud/Eliminar/${idSolicitud}`);
            if (response.status === 200) {
                alert('Solicitud eliminada con éxito.');
                onDelete(idSolicitud); // Actualiza la lista en el componente padre
            }
        } catch (error) {
            console.error("Error al eliminar la solicitud:", error);
            alert('Error al eliminar la solicitud.');
        }
    };

    const handleSendClick = async (idSolicitud) => {
        try {
            const response = await axios.put(`http://localhost:8081/api/solicitud/usuario/editar/${idSolicitud}`, { idSolicitud, idEstado: 2 });
            if (response.status === 200) {
                alert('Solicitud enviada con éxito.');
                onUpdate(); // Actualiza la lista de solicitudes en el componente padre
            }
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            alert('Error al enviar la solicitud.');
        }
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

                                            <button className="Btn-01" onClick={() => handleEditClick(item)} >Editar
                                            <svg className="svg-01" viewBox="0 0 512 512">
                                                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 
                                                480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 
                                                22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 
                                                55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 
                                                168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                            </svg>
                                            </button>

                                            <button className="btn-02"onClick={() => handleDeleteClick(item.idSolicitud)}> Eliminar
                                            </button>

                                            <button className="btn-05" onClick={() => handleSendClick(item.idSolicitud)}>
                                            <div class="svg-wrapper-1">
                                                <div class="svg-wrapper">
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
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Editar Solicitud</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="tipoSolicitudNombre">Tipo de Solicitud</Label>
                            <Input
                                type="text"
                                name="tipoSolicitudNombre"
                                id="tipoSolicitudNombre"
                                value={editData.tipoSolicitudNombre}
                                onChange={handleInputChange}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="especificacionNombre">Especificación</Label>
                            <Input
                                type="text"
                                name="especificacionNombre"
                                id="especificacionNombre"
                                value={editData.especificacionNombre}
                                onChange={handleInputChange}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="equipamientoEspecificoNombre">Equipamiento</Label>
                            <Input
                                type="text"
                                name="equipamientoEspecificoNombre"
                                id="equipamientoEspecificoNombre"
                                value={editData.equipamientoEspecificoNombre}
                                onChange={handleInputChange}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="cantidad">Cantidad</Label>
                            <Input
                                type="number"
                                name="cantidad"
                                id="cantidad"
                                value={editData.cantidad}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="descripcion">Descripción</Label>
                            <Input
                                type="text"
                                name="descripcion"
                                id="descripcion"
                                value={editData.descripcion}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="nombreSolicitante">Nombre Solicitante</Label>
                            <Input
                                type="text"
                                name="nombreSolicitante"
                                id="nombreSolicitante"
                                value={editData.nombreSolicitante}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
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
