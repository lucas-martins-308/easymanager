import { Link } from 'react-router-dom';
import './Reservas.css';

function Reservas() {
    return (
        <div className="page-container">
            <h2>Reservas</h2>
            <br />

            <div className="reservas-sections">
                <Link to="/booking-calendar" className="reservas-card">
                    <h2>Calendário de Reservas</h2>
                    <p>Visualize e gerencie todas as reservas em formato de calendário.</p>
                </Link>
                
                <Link to="/register-reservation" className="reservas-card">
                    <h2>Cadastrar Reserva</h2>
                    <p>Crie uma nova reserva para seus hóspedes.</p>
                </Link>

            </div>
        </div>
    );
}

export default Reservas;
