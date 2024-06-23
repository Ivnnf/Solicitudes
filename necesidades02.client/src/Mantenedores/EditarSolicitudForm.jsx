import React, { useState } from 'react';
import axios from 'axios';

const EditarSolicitudForm = ({ solicitud, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({ ...solicitud });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8081/api/solicitud/Editar/${solicitud.idSolicitud}`, formData);
            if (response.status === 200) {
                alert('Solicitud actualizada con éxito.');
                onSuccess();  // Llama una función para actualizar la lista de solicitudes
                onClose();    // Cierra el formulario
            }
        } catch (error) {
            console.error("Error al actualizar la solicitud:", error);
            alert('Error al actualizar la solicitud.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Tipo de Solicitudes</label>
                <input type="text" name="IdTipoSolicitud" value={formData.idTipoSolicitud} onChange={handleChange} />
            </div>
            <div>
                <label>Especificación</label>
                <input type="text" name="IdEspecificacion" value={formData.idEspecificacion} onChange={handleChange} />
            </div>
            <div>
                <label>Equipamiento</label>
                <input type="text" name="IdEquipEspec" value={formData.idEquipEspec} onChange={handleChange} />
            </div>
            <div>
                <label>Cantidad</label>
                <input type="number" name="Cantidad" value={formData.cantidad} onChange={handleChange} />
            </div>
            <div>
                <label>Descripción</label>
                <input type="text" name="Descripcion" value={formData.descripcion} onChange={handleChange} />
            </div>
            
            <button type="submit">Guardarrrrrrrrr</button>


            <button type="button" onClick={onClose}>Cancelar</button>
        </form>
    );
};

export default EditarSolicitudForm;
