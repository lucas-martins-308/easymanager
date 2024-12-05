import PropTypes from 'prop-types';
import './Navbar.css';
import {Link} from 'react-router-dom';
import DropdownButton from '../TopBar/DropdownButton/DropdownButton.jsx';
import logo from "../../assets/Logo_Art_Hostel_Abaporu.png";
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";

function Navbar({isAuthenticated, handleLogout}) {
    return (
        <div id="navbar" className="navbar-container">
            <div>
                <img src={logo} alt="Logo" className="navbar-logo"/>
            </div>

            <div className="navbar-links">
                {isAuthenticated ? (
                    <>
                        <Link to="/map" className="navbar-link" id="navbar-map">Mapa</Link>
                        <DropdownButton title="Reservas">
                            <Link to="/register-reservation" className="navbar-link">Cadastrar Reserva</Link>
                            <Link to="/register-customer" className="navbar-link">Cadastrar Hóspede</Link>
                            <Link to="/booking-calendar" className="navbar-link">Calendário de Reservas</Link>
                        </DropdownButton>
                        <DropdownButton title="Estoque">
                            <Link to="/itens-table" className="navbar-link">Cadastrar Produto</Link>
                            <Link to="/stock" className="navbar-link">Inventário</Link>
                        </DropdownButton>
                        <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin']}>
                            <DropdownButton title="Admin">
                                <Link to="/register-collaborator" className="navbar-link">Cadastrar Usuários</Link>
                                <Link to="/financial" className="navbar-link">Ação 1</Link>
                            </DropdownButton>
                        </ProtectedRoute>
                    </>
                ) : (
                    <>
                        <Link to="/" className="navbar-link">Home</Link>
                        <Link to="/contact" className="navbar-link">Contato</Link>
                    </>
                )}
            </div>

            <div className="navbar-user">
                <DropdownButton title="Usuário">
                    {isAuthenticated ? (
                        <button onClick={handleLogout} id="Sair" className="navbar-link">Sair</button>
                    ) : (
                        <Link to="/login" className="navbar-link">Login</Link>
                    )}
                </DropdownButton>
            </div>
        </div>
    );
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired, // Define se o usuário está autenticado
    handleLogout: PropTypes.func.isRequired,   // Função de logout
};

export default Navbar;
