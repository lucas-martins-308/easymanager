import { Link } from 'react-router-dom';
import './Hospedes.css';

function Hospedes() {
    return (
        <div className="page-container">
            <h2>Hóspedes</h2>
            <br />

            <div className="hospedes-sections">
                <Link to="/register-customer" className="hospedes-card">
                    <h2>Cadastrar Hóspede</h2>
                    <p>Adicione novos hóspedes ao sistema.</p>
                </Link>

                <Link to="/hospedes-list" className="hospedes-card">
                    <h2>Listar Hóspedes</h2>
                    <p>Visualize e gerencie todos os hóspedes cadastrados.</p>
                </Link>
            </div>
        </div>
    );
}

export default Hospedes; 