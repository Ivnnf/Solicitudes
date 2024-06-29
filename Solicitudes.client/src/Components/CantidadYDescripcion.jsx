import React from 'react';

const CantidadYDescripcion = ({ cantidad, descripcion, onCantidadChange, onDescripcionChange }) => {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="Cantidad">Cantidad:</label>
                <input
                    type="number"
                    id="Cantidad"
                    className="form-control"
                    value={cantidad}
                    onChange={e => onCantidadChange(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="Descripcion">Comentarios adicionales:</label>
                <textarea
                    id="Descripcion"
                    className="form-control"
                    value={descripcion}
                    onChange={e => onDescripcionChange(e.target.value)}
                    required
                ></textarea>
            </div>
        </div>
    );
};

export default CantidadYDescripcion;

