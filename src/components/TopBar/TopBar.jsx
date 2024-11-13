import './index.css';
import logo from '../../assets/Logo_Art_Hostel_Abaporu.png';
import Navbar from '../TopBar/Navbar/Navbar.jsx'
import DropdownButton from './DropdownButton/DropdownButton.jsx';
import App from '../../App.jsx'

export default function TopBar({ setCurrentPage, handleLogout }) {

  return (
    <div className="topbar">
      <img src={logo} alt="Logo" className="topbar-logo" />
      <Navbar setCurrentPage={setCurrentPage} />
      <DropdownButton id="navbar" title="Usuário">
        <button className="navbar-button" onClick={() => setCurrentPage('map')} type='button'>Ação 1</button>
        <button className="navbar-button" onClick={() => setCurrentPage('map')} type='button'>Ação 1</button>
        <button className="navbar-button" onClick={() => setCurrentPage('map')} type='button'>Ação 1</button>
        <button className="navbar-button" onClick={() => setCurrentPage('map')} type='button'>Ação 1</button>
        <button className="navbar-button" onClick={() => handleLogout()} type='button'>Sair</button>
      </DropdownButton>
      
      <DropdownButton/>
    </div>
  );
}
