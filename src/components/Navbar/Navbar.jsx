import PropTypes from 'prop-types';
import './index.css';
import {Link} from "react-router-dom";
import DropdownButton from '../TopBar/DropdownButton/DropdownButton.jsx';
import logo from "../../assets/Logo_Art_Hostel_Abaporu.png";
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";

function Navbar({handleLogout}) {
    return (
        <div id="navbar">
            <div>
                <img src={logo} alt="Logo" className="navbar-logo"/>
            </div>
            <div>
                <DropdownButton id="navbar" title="Mapa">
                    <Link to={"map"} className="navbar-link">Map</Link>
                </DropdownButton>
                <DropdownButton id="navbar" title="Reservas">
                    <Link to={"register-reservation"} className="navbar-link">Cadastrar Reserva</Link>
                    <Link to={"register-customer"} className="navbar-link">Cadastrar Hóspede</Link>
                    <Link to={"booking-calendar"} className="navbar-link">Calendário de Reservas</Link>
                </DropdownButton>
                <DropdownButton id="navbar" title="Estoque">
                    <Link to={"stock"} className="navbar-link">Cadastrar Produto</Link>
                    <Link to={"itens-table"} className="navbar-link">Inventário</Link>
                </DropdownButton>
                <ProtectedRoute allowedRoles={['admin']}>
                    <DropdownButton id="navbar" title="Admin">
                        <Link to={"admin"} className="navbar-link">Cadastrar Usuários</Link>
                        <Link to={"financial"} className="navbar-link">Financeiro</Link>
                    </DropdownButton>
                </ProtectedRoute>
            </div>
            <div>
                <DropdownButton id="navbar" title="Usuário">
                    <Link onClick={handleLogout} className="navbar-link">Sair</Link>
                </DropdownButton>
            </div>
        </div>
    );
}

Navbar.propTypes = {
    handleLogout: PropTypes.func.isRequired, // Validando a prop handleLogout
};

export default Navbar;
