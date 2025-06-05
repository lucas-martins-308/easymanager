import PropTypes from 'prop-types';
import './Navbar.css';
import {Link} from 'react-router-dom';
import DropdownButton from '../TopBar/DropdownButton/DropdownButton.jsx';
import logo from "../../assets/easy-logo.png";
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
                            
                            <Link to="/booking-calendar" className="navbar-link">Calendário de Reservas</Link>
                        </DropdownButton>
                        <DropdownButton title="Hóspedes">
                            <Link to="/register-customer" className="navbar-link">Cadastrar Hóspede</Link>
                        </DropdownButton>
                        <DropdownButton title="Estoque">
                            <Link to="/itens-table" className="navbar-link">Cadastrar Produto</Link>
                            <Link to="/stock" className="navbar-link">Inventário</Link>
                        </DropdownButton>
                        <ProtectedRoute allowedRoles={['adm']}>
                            <DropdownButton title="Admin">
                                <Link to="/register-collaborator" className="navbar-link">Usuários</Link>
                                <Link to="/register-accommodation" className="navbar-link">Acomodações</Link>
                                <Link to="/financial" className="navbar-link">Financeiro</Link>
                            </DropdownButton>
                        </ProtectedRoute>
                    </>
                ) : (
                    <>
                        <Link to="/" className="navbar-link">Home</Link>
                        <Link to="/contact" className="navbar-link">Contato</Link>
                    </>
                )}
                            
                {isAuthenticated ? (
                    <button
                        onClick={() => {
                            const confirmLogout = window.confirm('Tem certeza que deseja sair?');
                            if (confirmLogout) {
                                handleLogout();
                            }
                        }}
                        className="navbar-link">Sair
                    </button>
                ) : (
                    <Link to="/login" className="navbar-link">Login</Link>
                )}
            </div>
        </div>
    );
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

export default Navbar;
