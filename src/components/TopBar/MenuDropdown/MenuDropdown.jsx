import './index.css';
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';


export default function MenuDropdown() {

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggle = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <>
      <div className='menu-dropdown'>
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
    </>
  )
}