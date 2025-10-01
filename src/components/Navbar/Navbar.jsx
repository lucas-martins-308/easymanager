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
                        <Link to="/reservas" className="navbar-link">Reservas</Link>
                        <Link to="/hospedes" className="navbar-link">Hóspedes</Link>
                        <Link to="/estoque" className="navbar-link">Estoque</Link>
                        <ProtectedRoute allowedRoles={['adm']}>
                            <Link to="/admin" className="navbar-link">Admin</Link>
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
