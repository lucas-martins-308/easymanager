import './index.css';
import {Link} from "react-router-dom";
import DropdownButton from '../TopBar/DropdownButton/DropdownButton.jsx';
import logo from "../../assets/Logo_Art_Hostel_Abaporu.png";

function Navbar(handleLogout) {
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
                </DropdownButton>
                <DropdownButton id="navbar" title="Estoque">
                    <Link to={"stock"} className="navbar-link">Cadastrar Produto</Link>
                    <Link to={"itens-table"} className="navbar-link">Inventário</Link>
                </DropdownButton>
                <DropdownButton id="navbar" title="Financeiro">
                    <Link to={"financial"} className="navbar-link">Ação 1</Link>
                </DropdownButton>
                <DropdownButton id="navbar" title="Admin">
                    <Link to={"admin"} className="navbar-link">Cadastrar Usuários</Link>
                </DropdownButton>
            </div>
            <div>
                <DropdownButton id="navbar" title="Usuário">
                    <Link onClick={() => handleLogout()} className="navbar-link">Sair</Link>
                </DropdownButton>
            </div>
        </div>
    );
}

export default Navbar;
