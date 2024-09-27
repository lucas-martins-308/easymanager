import './index.css';

export default function Navbar({ setCurrentPage }) {
  return (
    <div id="navbar">
      <button className="navbar-button" onClick={() => setCurrentPage('map')} type='button'>Mapa</button>
      <button className="navbar-button" onClick={() => setCurrentPage('reservations')}>Reservas</button>
      <button className="navbar-button" onClick={() => setCurrentPage('stock')}>Estoque</button>
      <button className="navbar-button" onClick={() => setCurrentPage('financial')}>Financeiro</button>
      <button className="navbar-button" onClick={() => setCurrentPage('admin')}>Admin</button>
    </div>
  );
}
