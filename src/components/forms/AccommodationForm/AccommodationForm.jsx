import './AccommodationForm.css';
import { useState, useEffect } from 'react';
import RoomForm from '../RoomForm/RoomForm';
import { roomService } from '../../../services/room/roomService';

function AddAccommodationForm() {
    const [showForm, setShowForm] = useState(false);
    const [showRooms, setShowRooms] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    // Carrega os quartos da API sempre que abrir a tela de visualizar
    useEffect(() => {
        if (showRooms) {
            loadRooms();
        }
    }, [showRooms]);

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

    return (
        <div className="Rooms">
            <h1>Acomodações</h1>

            <div className="buttons">
                <button onClick={() => {
                    setShowForm(!showForm);
                    setShowRooms(false); // Fecha a listagem se estiver aberta
                }}>
                    {showForm ? 'Voltar' : 'Cadastrar Quarto'}
                </button>

                <button onClick={() => {
                    setShowRooms(!showRooms);
                    setShowForm(false); // Fecha o form se estiver aberto
                }}>
                    {showRooms ? 'Fechar Lista' : 'Visualizar Quartos'}
                </button>
            </div>

            {showForm && <RoomForm />}

            {showRooms && (
                <div className="room-list">
                    <h2>Quartos Cadastrados</h2>
                    {loading ? (
                        <p>Carregando quartos...</p>
                    ) : rooms.length === 0 ? (
                        <p>Nenhum quarto cadastrado.</p>
                    ) : (
                        <ul>
                            {rooms.map((room) => (
                                <li key={room.idQuarto}>
                                    <strong>Quarto {room.numeroQuarto}</strong> - {room.tipoQuarto} - 
                                    R$ {room.precoDiaria} - Capacidade: {room.capacidade} - 
                                    Status: {room.statusQuarto}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default AddAccommodationForm;
