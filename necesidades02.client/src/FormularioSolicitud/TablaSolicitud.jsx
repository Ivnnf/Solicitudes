import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import '../assets/Styles/styles.css';


const TablaSolicitud = ({ data = [], onDelete }) => {
    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState({
        idSolicitud: null,
        idTipoSolicitud: '',
        tipoSolicitudNombre: '',
        idEspecificacion: '',
        especificacionNombre: '',
        idEquipEspec: '',
        equipamientoEspecificoNombre: '',
        cantidad: '',
        descripcion: '',
        fecha: '',
        nombreSolicitante: '', // Nuevo campo
        departamentoNombre: '' // Nuevo campo
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
            const response = await axios.put(`http://localhost:8081/api/solicitud/Editar/${editData.idSolicitud}`, editData);
            if (response.status === 200) {
                alert('Solicitud actualizada con éxito.');
                toggleModal();
                // Aquí podrías refrescar la lista de solicitudes en el componente padre.
            }
        } catch (error) {
            console.error("Error al actualizar la solicitud:", error);
            alert('Error al actualizar la solicitud.');
        }
    };

    const handleDeleteClick = async (idSolicitud) => {
        // Mostrar el cuadro de confirmación
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta solicitud?");
        if (!confirmDelete) {
            return; // Si el usuario cancela, no hacer nada
        }

        try {
            const response = await axios.delete(`http://localhost:8081/api/solicitud/Eliminar/${idSolicitud}`);
            if (response.status === 200) {
                alert('Solicitud eliminada con éxito.');
                onDelete(idSolicitud); // Llama a la función onDelete para actualizar la lista
            }
        } catch (error) {
            console.error("Error al eliminar la solicitud:", error);
            alert('Error al eliminar la solicitud.');
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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length < 1 ? (
                        <tr>
                            <td colSpan="6">Sin Registros</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.idSolicitud}>
                                <td>{item.tipoSolicitudNombre}</td>
                                <td>{item.especificacionNombre}</td>
                                <td>{item.equipamientoEspecificoNombre}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.descripcion}</td>
                                <td>
                                    <div className="button-container">
                                        <button className="Btn-01" onClick={() => handleEditClick(item)}>Editar
                                        <svg className="svg-01" viewBox="0 0 512 512">
                                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                        </svg>
                                    </button>


                                    <button className="btn-02" onClick={() => handleDeleteClick(item.idSolicitud)}>
                                        <span className="text-02">Eliminar</span>
                                        <span className="icon-02">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                                            </svg>
                                        </span>
                                    </button>

                                    </div>
                            
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
        idTipoSolicitud: PropTypes.number.isRequired,
        tipoSolicitudNombre: PropTypes.string.isRequired,
        idEspecificacion: PropTypes.number.isRequired,
        especificacionNombre: PropTypes.string.isRequired,
        idEquipEspec: PropTypes.number.isRequired,
        equipamientoEspecificoNombre: PropTypes.string.isRequired,
        cantidad: PropTypes.number.isRequired,
        descripcion: PropTypes.string,
    })).isRequired,
    onDelete: PropTypes.func.isRequired
};

export default TablaSolicitud;
