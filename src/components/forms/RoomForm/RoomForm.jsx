import './RoomForm.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./RoomForm.css"

// Dados iniciais simulados, pode estar vazio ou preenchido manualmente
const initialRooms = JSON.parse(localStorage.getItem('rooms')) || [];

const RoomForm = () => {
  const [formData, setFormData] = useState({
    numeroQuarto: '',
    tipoQuarto: '',
    precoDiaria: '',
    capacidade: '',
    statusQuarto: 'disponivel',
  });

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem('rooms')) || [];
    setRooms(storedRooms);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRoom = { ...formData };
    const updatedRooms = [...rooms, newRoom];

    localStorage.setItem('rooms', JSON.stringify(updatedRooms));
    setRooms(updatedRooms);

    alert(`Quarto ${formData.numeroQuarto} cadastrado com sucesso!`);
    setFormData({
      numeroQuarto: '',
      tipoQuarto: '',
      precoDiaria: '',
      capacidade: '',
      statusQuarto: 'disponivel',
    });
  };

  return (
    <div className="RoomForm">
      <h2>Cadastro de Acomodações</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Número do Quarto:</label>
          <input
            type="number"
            name="numeroQuarto"
            value={formData.numeroQuarto}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Tipo de Quarto:</label>
          <input
            type="text"
            name="tipoQuarto"
            value={formData.tipoQuarto}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Preço da Diária (R$):</label>
          <input
            type="number"
            step="0.01"
            name="precoDiaria"
            value={formData.precoDiaria}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Capacidade:</label>
          <input
            type="number"
            name="capacidade"
            value={formData.capacidade}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Status do Quarto:</label>
          <select
            name="statusQuarto"
            value={formData.statusQuarto}
            onChange={handleChange}
            required
          >
            <option value="disponivel">Disponível</option>
            <option value="ocupado">Ocupado</option>
            <option value="manutencao">Manutenção</option>
          </select>
        </div>

        <button type="submit">Cadastrar Quarto</button>
      </form>

      <h3>Acomodações Cadastradas:</h3>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>
            Quarto {room.numeroQuarto} - {room.tipoQuarto} - R${room.precoDiaria} - Capacidade: {room.capacidade} - Status: {room.statusQuarto}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomForm;
