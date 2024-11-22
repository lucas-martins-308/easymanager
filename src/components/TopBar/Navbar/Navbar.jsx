import './index.css';
import DropdownButton from '../DropdownButton/DropdownButton';


export default function Navbar({ setCurrentPage }) {
  return (
    <div id="navbar">
      <DropdownButton id="navbar" title="Mapa">
        <button className="navbar-button" onClick={() => setCurrentPage('map')} type='button'>Ação 1</button>
      </DropdownButton>
      <DropdownButton id="navbar" title="Reservas">
        <button className="navbar-button" onClick={() => setCurrentPage('reservations')} type='button'>Ação 1</button>
      </DropdownButton>
      <DropdownButton id="navbar" title="Estoque">
        <button className="navbar-button" onClick={() => setCurrentPage('stock')} type='button'>Ação 1</button>
      </DropdownButton>
      <DropdownButton id="navbar" title="Financeiro">
        <button className="navbar-button" onClick={() => setCurrentPage('financial')} type='button'>Ação 1</button>
      </DropdownButton>
      <DropdownButton id="navbar" title="Admin">
        <button className="navbar-button" onClick={() => setCurrentPage('admin')} type='button'>Ação 1</button>
      </DropdownButton>
    </div>
  );
}
