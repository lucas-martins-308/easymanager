import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ReservationCalendar.css';

const ReservationCalendar = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
        setReservations(storedReservations);
    }, []);

    useEffect(() => {
        const filtered = reservations.filter((reservation) => {
            const checkInDate = new Date(reservation.checkIn);
            const checkOutDate = new Date(reservation.checkOut);
            return selectedDate >= checkInDate && selectedDate <= checkOutDate;
        });
        setFilteredReservations(filtered);
    }, [selectedDate, reservations]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setFormData(filteredReservations[index]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveClick = () => {
        const updatedReservations = [...reservations];
        const globalIndex = reservations.findIndex(
            (res) => res.checkIn === filteredReservations[editingIndex].checkIn
        );
        updatedReservations[globalIndex] = formData;

        setReservations(updatedReservations);
        localStorage.setItem('reservations', JSON.stringify(updatedReservations));
        setEditingIndex(null);
        setFormData({});
    };

    const handleCancelClick = () => {
        setEditingIndex(null);
        setFormData({});
    };

    return (
        <div className="calendar-container">
            <h1>Calendário de Reservas</h1>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
            />

            <h2>Reservas no dia {selectedDate.toLocaleDateString()}</h2>
            {filteredReservations.length > 0 ? (
                <table className="reservations-table">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Canal</th>
                        <th>Notas</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredReservations.map((reservation, index) => (
                        <tr key={index}>
                            {editingIndex === index ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            name="nome"
                                            value={formData.nome || ''}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            name="checkIn"
                                            value={formData.checkIn || ''}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            name="checkOut"
                                            value={formData.checkOut || ''}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="canal"
                                            value={formData.canal || ''}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="notes"
                                            value={formData.notes || ''}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleSaveClick}>Salvar</button>
                                        <button onClick={handleCancelClick}>Cancelar</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{reservation.nome}</td>
                                    <td>{reservation.checkIn}</td>
                                    <td>{reservation.checkOut}</td>
                                    <td>{reservation.canal}</td>
                                    <td>{reservation.notes || 'Sem notas'}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(index)}>
                                            Editar
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-reservations">Nenhuma reserva para esta data.</p>
            )}
        </div>
    );
};

export default ReservationCalendar;
