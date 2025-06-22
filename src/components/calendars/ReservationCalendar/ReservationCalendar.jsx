import { useState, useEffect } from 'react';
import './ReservationCalendar.css';

const ReservationCalendar = () => {
    const [reservations, setReservations] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [startOfWeek, setStartOfWeek] = useState(getStartOfWeek(new Date()));
    const [editingCell, setEditingCell] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
        const storedRooms = JSON.parse(localStorage.getItem('rooms')) || [];
        setReservations(storedReservations);
        setRooms(storedRooms);
    }, []);

    function getStartOfWeek(date) {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        newDate.setDate(newDate.getDate() - newDate.getDay());
        return newDate;
    }

    function getWeekDays(start) {
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            d.setHours(0, 0, 0, 0);
            return d;
        });
    }

    const weekDays = getWeekDays(startOfWeek);

    const isSameDay = (d1, d2) => d1.getTime() === d2.getTime();

    // Retorna a reserva que está no quarto e cobre o dia da célula
    const getReservationForCell = (roomNumber, date) => {
        return reservations.find(res => {
            const checkIn = new Date(res.checkIn);
            const checkOut = new Date(res.checkOut);
            checkIn.setHours(0, 0, 0, 0);
            checkOut.setHours(0, 0, 0, 0);
            return (
                res.quarto === roomNumber &&
                date >= checkIn &&
                date <= checkOut
            );
        });
    };

    const handleEditClick = (roomNumber, date, reservation) => {
        setEditingCell({ roomNumber, date: date.getTime() }); // usar timestamp para comparação
        setFormData({ ...reservation });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = () => {
        // Atualiza a reserva na lista, buscando por checkIn, checkOut, quarto e cliente (ou outro id único se tiver)
        const updated = reservations.map(r => {
            if (
                r.checkIn === formData.checkIn &&
                r.checkOut === formData.checkOut &&
                r.quarto === formData.quarto &&
                r.cliente === formData.cliente
            ) {
                return formData;
            }
            return r;
        });
        setReservations(updated);
        localStorage.setItem('reservations', JSON.stringify(updated));
        setEditingCell(null);
        setFormData({});
    };

    const handleCancelClick = () => {
        setEditingCell(null);
        setFormData({});
    };

    const goToNextWeek = () => {
        const next = new Date(startOfWeek);
        next.setDate(startOfWeek.getDate() + 7);
        setStartOfWeek(next);
    };

    const goToPrevWeek = () => {
        const prev = new Date(startOfWeek);
        prev.setDate(startOfWeek.getDate() - 7);
        setStartOfWeek(prev);
    };

    return (
        <div className="calendar-container">
            <h1>Calendário Semanal de Reservas</h1>

            <div className="week-navigation">
                <button onClick={goToPrevWeek}>Semana Anterior</button>
                <button onClick={goToNextWeek}>Próxima Semana</button>
            </div>

            <table className="reservation-calendar-table">
                <thead>
                    <tr>
                        <th>Quarto / Dia</th>
                        {weekDays.map((day, index) => (
                            <th key={index}>
                                {day.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' })}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rooms.length === 0 ? (
                        <tr>
                            <td colSpan={8} style={{ textAlign: 'center' }}>
                                Nenhum quarto cadastrado.
                            </td>
                        </tr>
                    ) : (
                        rooms.map((room, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>
                                    Quarto {room.numeroQuarto}
                                </td>
                                {weekDays.map((day, colIndex) => {
                                    const reservation = getReservationForCell(room.numeroQuarto, day);
                                    const cellKey = `${room.numeroQuarto}-${day.toISOString()}`;
                                    const isEditing = editingCell &&
                                        editingCell.roomNumber === room.numeroQuarto &&
                                        editingCell.date === day.getTime();

                                    return (
                                        <td key={cellKey} className="calendar-cell">
                                            {reservation ? (
                                                isEditing ? (
                                                    <div className="edit-cell">
                                                        <input
                                                            type="text"
                                                            name="cliente"
                                                            value={formData.cliente || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                        <input
                                                            type="date"
                                                            name="checkIn"
                                                            value={formData.checkIn || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                        <input
                                                            type="date"
                                                            name="checkOut"
                                                            value={formData.checkOut || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                        <input
                                                            type="text"
                                                            name="canal"
                                                            value={formData.canal || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                        <button onClick={handleSaveClick}>Salvar</button>
                                                        <button onClick={handleCancelClick}>Cancelar</button>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {reservation.cliente}
                                                    </div>
                                                )
                                            ) : (
                                                <></>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationCalendar;
