import './RoomForm.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { roomService } from '../../../services/room/roomService';

const RoomForm = ({ editingRoom, onCancelEdit, onSaveEdit }) => {
  const [formData, setFormData] = useState({
    numeroQuarto: '',
    tipoQuarto: '',
    precoDiaria: '',
    capacidade: '',
    statusQuarto: 'disponivel',
  });

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    if (editingRoom) {
      setFormData({
        numeroQuarto: editingRoom.numeroQuarto,
        tipoQuarto: editingRoom.tipoQuarto,
        precoDiaria: editingRoom.precoDiaria,
        capacidade: editingRoom.capacidade,
        statusQuarto: editingRoom.statusQuarto,
      });
    } else {
      setFormData({
        numeroQuarto: '',
        tipoQuarto: '',
        precoDiaria: '',
        capacidade: '',
        statusQuarto: 'disponivel',
      });
    }
  }, [editingRoom]);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const data = await roomService.getAll();
      setRooms(data);
    } catch (error) {
      console.error('Erro ao carregar quartos:', error);
      alert('Erro ao carregar quartos');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (editingRoom) {
        await roomService.update(editingRoom.idQuarto, formData);
        await loadRooms();
        alert(`Quarto ${formData.numeroQuarto} atualizado com sucesso!`);
        if (onSaveEdit) onSaveEdit();
      } else {
        await roomService.create(formData);
        await loadRooms();
        alert(`Quarto ${formData.numeroQuarto} cadastrado com sucesso!`);
      }
      setFormData({
        numeroQuarto: '',
        tipoQuarto: '',
        precoDiaria: '',
        capacidade: '',
        statusQuarto: 'disponivel',
      });
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar quarto:', error);
      alert(error.message || 'Erro ao cadastrar/atualizar quarto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="room-form">
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
          <select
            name="tipoQuarto"
            value={formData.tipoQuarto}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="Simples">Simples</option>
            <option value="Duplo">Duplo</option>
            <option value="Triplo">Triplo</option>
            <option value="Suite">Suite</option>
            <option value="Luxo">Luxo</option>
          </select>
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

        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button type="submit" disabled={loading}>
            {editingRoom ? (loading ? 'Salvando...' : 'Salvar Alterações') : (loading ? 'Cadastrando...' : 'Cadastrar Quarto')}
          </button>
          {editingRoom && (
            <button type="button" onClick={onCancelEdit} disabled={loading}>
              Cancelar Edição
            </button>
          )}
        </div>
      </form>

      <h3>Acomodações Cadastradas:</h3>
      {loading ? (
        <p>Carregando quartos...</p>
      ) : (
        <ul>
          {rooms.map((room) => (
            <li key={room.idQuarto}>
              Quarto {room.numeroQuarto} - {room.tipoQuarto} - R${room.precoDiaria} - Capacidade: {room.capacidade} - Status: {room.statusQuarto}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomForm;

RoomForm.propTypes = {
  editingRoom: PropTypes.object,
  onCancelEdit: PropTypes.func,
  onSaveEdit: PropTypes.func,
};
