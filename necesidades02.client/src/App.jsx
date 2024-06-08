

import 'bootstrap/dist/css/bootstrap.min.css';
import UsuarioFields from './UsuarioFields';

function App() {
    return (
        <div className="App">
            <UsuarioFields userId={1} /> {/* Reemplaza 1 con el ID del usuario que quieras cargar */}
        </div>
    );
}

export default App;
