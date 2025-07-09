import { useState, useEffect } from 'react';
import './ReservationCalendar.css';
import { reservationService } from '../../../services/reservation/reservationService';
import { roomService } from '../../../services/room/roomService';

const ReservationCalendar = () => {
    const [reservations, setReservations] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [startOfWeek, setStartOfWeek] = useState(getStartOfWeek(new Date()));
    const [editingCell, setEditingCell] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [reservationsData, roomsData] = await Promise.all([
                reservationService.getAll(),
                roomService.getAll()
            ]);
            console.log('Reservas carregadas:', reservationsData);
            console.log('Quartos carregados:', roomsData);
            setReservations(reservationsData);
            setRooms(roomsData);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            console.error('Erro ao carregar dados do calendário');
        } finally {
            setLoading(false);
        }
    };

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
            if (!res.dataCheckin || !res.dataCheckout || !res.quarto) {
                return false;
            }
            
            const checkIn = new Date(res.dataCheckin);
            const checkOut = new Date(res.dataCheckout);
            const currentDate = new Date(date);
            
            // Normalizar todas as datas para meia-noite
            checkIn.setHours(0, 0, 0, 0);
            checkOut.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);
            
            const isInDateRange = currentDate >= checkIn && currentDate <= checkOut;
            // Converter ambos para string para garantir comparação correta
            const isCorrectRoom = String(res.quarto) === String(roomNumber);
            
            return isInDateRange && isCorrectRoom;
        });
    };

    const handleEditClick = (roomNumber, date, reservation) => {
        setEditingCell({ roomNumber, date: date.getTime() });
        setFormData({ 
            ...reservation,
            dataCheckin: reservation.dataCheckin ? reservation.dataCheckin.split('T')[0] : '',
            dataCheckout: reservation.dataCheckout ? reservation.dataCheckout.split('T')[0] : ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = async () => {
        try {
            setLoading(true);
            
            // Encontrar a reserva que está sendo editada
            const reservationToUpdate = reservations.find(r => 
                r.idReserva === formData.idReserva
            );
            
            if (reservationToUpdate) {
                const updateData = {
                    dtCheckin: formData.dataCheckin,
                    dtCheckout: formData.dataCheckout,
                    valorReserva: formData.valorTotal
                };
                
                await reservationService.update(reservationToUpdate.idReserva, updateData);
                await loadData(); // Recarregar dados
                console.log('Reserva atualizada com sucesso!');
            }
            
            setEditingCell(null);
            setFormData({});
        } catch (error) {
            console.error('Erro ao atualizar reserva:', error);
            console.error('Erro ao atualizar reserva');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelClick = () => {
        setEditingCell(null);
        setFormData({});
    };

    const handleCheckIn = async (reservation) => {
        try {
            setLoading(true);
            await reservationService.checkin(reservation.idReserva);
            await loadData();
            console.log('Check-in realizado com sucesso!');
        } catch (error) {
            console.error('Erro ao fazer check-in:', error);
            console.error('Erro ao fazer check-in');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckOut = async (reservation) => {
        try {
            setLoading(true);
            await reservationService.checkout(reservation.idReserva);
            await loadData();
            console.log('Check-out realizado com sucesso!');
        } catch (error) {
            console.error('Erro ao fazer check-out:', error);
            console.error('Erro ao fazer check-out');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelReservation = async (reservation) => {
        if (window.confirm('Tem certeza que deseja cancelar esta reserva?')) {
            try {
                setLoading(true);
                await reservationService.cancelar(reservation.idReserva);
                await loadData();
                console.log('Reserva cancelada com sucesso!');
            } catch (error) {
                console.error('Erro ao cancelar reserva:', error);
                console.error('Erro ao cancelar reserva');
            } finally {
                setLoading(false);
            }
        }
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

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmada':
                return '#76c893';
            case 'pendente':
                return '#ffd93d';
            case 'cancelada':
                return '#ff6b6b';
            case 'finalizada':
                return '#b0b0b0'; // cinza para finalizada
            default:
                return '#76c893';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'confirmada':
                return 'Confirmada';
            case 'pendente':
                return 'Pendente';
            case 'cancelada':
                return 'Cancelada';
            case 'finalizada':
                return 'Finalizada';
            default:
                return 'Confirmada';
        }
    };

    const isToday = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date.getTime() === today.getTime();
    };

    const isCheckInDay = (reservation, date) => {
        if (!reservation.dataCheckin) return false;
        const checkInDate = new Date(reservation.dataCheckin);
        checkInDate.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date.getTime() === checkInDate.getTime();
    };

    const isCheckOutDay = (reservation, date) => {
        if (!reservation.dataCheckout) return false;
        const checkOutDate = new Date(reservation.dataCheckout);
        checkOutDate.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date.getTime() === checkOutDate.getTime();
    };

    return (
        <div className="calendar-container">
            <h1>Calendário Semanal de Reservas</h1>

            <div className="week-navigation">
                <button onClick={goToPrevWeek}>Semana Anterior</button>
                <span className="current-week">
                    {startOfWeek.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} - {
                        new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
                    }
                </span>
                <button onClick={goToNextWeek}>Próxima Semana</button>
            </div>

            <div className="status-legend">
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#76c893' }}></div>
                    <span>Confirmada</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#ffd93d' }}></div>
                    <span>Pendente</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#ff6b6b' }}></div>
                    <span>Cancelada</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#b0b0b0' }}></div>
                    <span>Finalizada</span>
                </div>
            </div>

            <table className="reservation-calendar-table">
                <thead>
                    <tr>
                        <th>Quarto / Dia</th>
                        {weekDays.map((day, index) => (
                            <th key={index} className={isToday(day) ? 'today' : ''}>
                                {day.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' })}
                                {isToday(day) && <div className="today-indicator">Hoje</div>}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={8} style={{ textAlign: 'center' }}>
                                Carregando dados...
                            </td>
                        </tr>
                    ) : rooms.length === 0 ? (
                        <tr>
                            <td colSpan={8} style={{ textAlign: 'center' }}>
                                Nenhum quarto cadastrado.
                            </td>
                        </tr>
                    ) : (
                        rooms.map((room, rowIndex) => (
                            <tr key={room.idQuarto}>
                                <td className="room-cell">
                                    Quarto {room.numeroQuarto}
                                    <br />
                                    <small>{room.tipoQuarto}</small>
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
                                                            value={formData.Hospede?.nome || ''}
                                                            onChange={handleInputChange}
                                                            placeholder="Nome do cliente"
                                                            disabled
                                                        />
                                                        <input
                                                            type="date"
                                                            name="dataCheckin"
                                                            value={formData.dataCheckin || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                        <input
                                                            type="date"
                                                            name="dataCheckout"
                                                            value={formData.dataCheckout || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                        <div className="edit-buttons">
                                                            <button onClick={handleSaveClick} disabled={loading} className="save-btn">
                                                                {loading ? 'Salvando...' : 'Salvar'}
                                                            </button>
                                                            <button onClick={handleCancelClick} disabled={loading} className="cancel-btn">
                                                                Cancelar
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div 
                                                        className="reservation-info"
                                                        style={{ backgroundColor: getStatusColor(reservation.status) }}
                                                    >
                                                        <div className="guest-name">
                                                            {reservation.Hospede?.nome || 'Cliente não informado'}
                                                        </div>
                                                        <div className="dates">
                                                            {formatDate(reservation.dataCheckin)} - {formatDate(reservation.dataCheckout)}
                                                        </div>
                                                        <div className="status">
                                                            {getStatusText(reservation.status)}
                                                        </div>
                                                        
                                                        {/* Botões de ação */}
                                                        <div className="action-buttons">
                                                            {reservation.status === 'pendente' && isCheckInDay(reservation, day) && (
                                                                <button 
                                                                    className="checkin-btn"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleCheckIn(reservation);
                                                                    }}
                                                                    disabled={loading}
                                                                >
                                                                    Check-in
                                                                </button>
                                                            )}
                                                            
                                                            {reservation.status === 'confirmada' && isCheckOutDay(reservation, day) && (
                                                                <button 
                                                                    className="checkout-btn"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleCheckOut(reservation);
                                                                    }}
                                                                    disabled={loading}
                                                                >
                                                                    Check-out
                                                                </button>
                                                            )}
                                                            
                                                            <button 
                                                                className="edit-btn"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleEditClick(room.numeroQuarto, day, reservation);
                                                                }}
                                                                disabled={loading}
                                                            >
                                                                Editar
                                                            </button>
                                                            
                                                            {reservation.status === 'pendente' && (
                                                                <button 
                                                                    className="cancel-reservation-btn"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleCancelReservation(reservation);
                                                                    }}
                                                                    disabled={loading}
                                                                >
                                                                    Cancelar
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="empty-cell">
                                                    {/* Célula vazia sem botão de adicionar reserva */}
                                                </div>
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
