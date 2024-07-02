import React from 'react';
import PropTypes from 'prop-types';

const CantidadYDescripcion = ({ cantidad, descripcion, onCantidadChange, onDescripcionChange }) => {
    const handleCantidadChange = (event) => {
        onCantidadChange(event.target.value);
    };

    const handleDescripcionChange = (event) => {
        onDescripcionChange(event.target.value);
    };

    return (
        <div>
            <div className="form-group">
                <label htmlFor="Cantidad">Cantidad:</label>
                <input
                    type="number"
                    className="form-control"
                    id="Cantidad"
                    name="cantidad"
                    value={cantidad}
                    onChange={handleCantidadChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="Descripcion">Descripción:</label>
                <textarea
                    className="form-control"
                    id="Descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleDescripcionChange}
                    required
                />
            </div>
        </div>
    );
};

CantidadYDescripcion.propTypes = {
    cantidad: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    descripcion: PropTypes.string.isRequired,
    onCantidadChange: PropTypes.func.isRequired,
    onDescripcionChange: PropTypes.func.isRequired,
};

export default CantidadYDescripcion;
