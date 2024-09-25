import './index.css';
import logo from '../../assets/Logo_Art_Hostel_Abaporu.png';
import MenuDropdown from './MenuDropdown/MenuDropdown';


export default function TopBar() {

  return (
    <div className="topbar">
      <img src={logo} alt="Logo" className="topbar-logo" />
      <MenuDropdown/>
      <h1>Usuário</h1>
    </div>
  );
}
