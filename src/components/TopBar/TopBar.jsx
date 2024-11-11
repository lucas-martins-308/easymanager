import './index.css';
import logo from '../../assets/Logo_Art_Hostel_Abaporu.png';
import Navbar from '../TopBar/Navbar/Navbar.jsx'
import DropdownButton from './DropdownButton/DropdownButton.jsx';

export default function TopBar({ setCurrentPage }) {

  return (
    <div className="topbar">
      <img src={logo} alt="Logo" className="topbar-logo" />
      <Navbar setCurrentPage={setCurrentPage} />
      <DropdownButton id="navbar" title="Usuário">
        <button className="navbar-button" onClick={() => setCurrentPage('map')} type='button'>Ação 1</button>
        <button onClick={() => console.log("Ação 2")}>Ação 2</button>
        <button onClick={() => console.log("Ação 3")}>Ação 3</button>
      </DropdownButton>
    </div>
  );
}
