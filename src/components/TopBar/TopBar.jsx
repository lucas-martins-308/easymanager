import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './index.css';
import logo from '../../assets/Logo_Art_Hostel_Abaporu.png';

export default function TopBar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggle = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <div className="topbar">
      <img src={logo} alt="Logo" className="topbar-logo" />

      {/* Dropdown Mapa */}
      <Dropdown 
        className="custom-dropdown" 
        show={openDropdown === 'mapa'} 
        onToggle={() => handleToggle('mapa')}
      >
        <Dropdown.Toggle id="dropdown-mapa-button">
          Mapa
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/mapa">Mapa</Dropdown.Item>
          <Dropdown.Item href="#/reservas">Reservas</Dropdown.Item>
          <Dropdown.Item href="#/estoque">Estoque</Dropdown.Item>
          <Dropdown.Item href="#/financeiro">Financeiro</Dropdown.Item>
          <Dropdown.Item href="#/admin">Admin</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Dropdown Reservas */}
      <Dropdown 
        className="custom-dropdown" 
        show={openDropdown === 'reservas'} 
        onToggle={() => handleToggle('reservas')}
      >
        <Dropdown.Toggle id="dropdown-reservas-button">
          Reservas
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/mapa">Mapa</Dropdown.Item>
          <Dropdown.Item href="#/reservas">Reservas</Dropdown.Item>
          <Dropdown.Item href="#/estoque">Estoque</Dropdown.Item>
          <Dropdown.Item href="#/financeiro">Financeiro</Dropdown.Item>
          <Dropdown.Item href="#/admin">Admin</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Dropdown Estoque */}
      <Dropdown 
        className="custom-dropdown" 
        show={openDropdown === 'estoque'} 
        onToggle={() => handleToggle('estoque')}
      >
        <Dropdown.Toggle id="dropdown-estoque-button">
          Estoque
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/mapa">Mapa</Dropdown.Item>
          <Dropdown.Item href="#/reservas">Reservas</Dropdown.Item>
          <Dropdown.Item href="#/estoque">Estoque</Dropdown.Item>
          <Dropdown.Item href="#/financeiro">Financeiro</Dropdown.Item>
          <Dropdown.Item href="#/admin">Admin</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Dropdown Financeiro */}
      <Dropdown 
        className="custom-dropdown" 
        show={openDropdown === 'financeiro'} 
        onToggle={() => handleToggle('financeiro')}
      >
        <Dropdown.Toggle id="dropdown-financeiro-button">
          Financeiro
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/mapa">Mapa</Dropdown.Item>
          <Dropdown.Item href="#/reservas">Reservas</Dropdown.Item>
          <Dropdown.Item href="#/estoque">Estoque</Dropdown.Item>
          <Dropdown.Item href="#/financeiro">Financeiro</Dropdown.Item>
          <Dropdown.Item href="#/admin">Admin</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Dropdown Admin */}
      <Dropdown 
        className="custom-dropdown" 
        show={openDropdown === 'admin'} 
        onToggle={() => handleToggle('admin')}
      >
        <Dropdown.Toggle id="dropdown-admin-button">
          Admin
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/mapa">Mapa</Dropdown.Item>
          <Dropdown.Item href="#/reservas">Reservas</Dropdown.Item>
          <Dropdown.Item href="#/estoque">Estoque</Dropdown.Item>
          <Dropdown.Item href="#/financeiro">Financeiro</Dropdown.Item>
          <Dropdown.Item href="#/admin">Admin</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
