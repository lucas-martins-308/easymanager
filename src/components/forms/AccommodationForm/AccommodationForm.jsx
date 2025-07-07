import './AccommodationForm.css';
import { useState, useEffect } from 'react';
import RoomForm from '../../components/forms/RoomForm/RoomForm';

function AddAccommodationForm() {
    const [showForm, setShowForm] = useState(false);
    const [showRooms, setShowRooms] = useState(false);
    const [rooms, setRooms] = useState([]);

    // Carrega os quartos do localStorage sempre que abrir a tela de visualizar
    useEffect(() => {
        if (showRooms) {
            const storedRooms = JSON.parse(localStorage.getItem('rooms')) || [];
            setRooms(storedRooms);
        }
    }, [showRooms]);

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
                    {rooms.length === 0 ? (
                        <p>Nenhum quarto cadastrado.</p>
                    ) : (
                        <ul>
                            {rooms.map((room, index) => (
                                <li key={index}>
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
