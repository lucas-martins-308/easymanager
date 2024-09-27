import './index.css';
import logo from '../../assets/Logo_Art_Hostel_Abaporu.png';
import Navbar from '../TopBar/Navbar/Navbar.jsx'


export default function TopBar({ setCurrentPage }) {

  return (
    <div className="topbar">
      <img src={logo} alt="Logo" className="topbar-logo" />
        <Navbar setCurrentPage={setCurrentPage} />
      <h1>Usuário</h1>
    </div>
  );
}
