import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

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
        fecha: ''
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
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditClick(item)}>Editar</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(item.idSolicitud)}>Eliminar</button>
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
                    <Button color="primary" onClick={handleSave}>Guardar</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
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
