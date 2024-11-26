import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ReservationCalendar.css";

const ReservationCalendar = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredReservations, setFilteredReservations] = useState([]);

    // Função para carregar as reservas do localStorage
    const loadReservations = () => {
        const storedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
        setReservations(storedReservations);
    };

    useEffect(() => {
        loadReservations();

        const interval = setInterval(loadReservations, 500);

        return () => clearInterval(interval);
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

    return (
        <div className="calendar-container">
            <h1>Calendário de Reservas</h1>
            <Calendar onChange={handleDateChange} value={selectedDate} />
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
                    </tr>
                    </thead>
                    <tbody>
                    {filteredReservations.map((reservation, index) => (
                        <tr key={index}>
                            <td>{reservation.nome}</td>
                            <td>{reservation.checkIn}</td>
                            <td>{reservation.checkOut}</td>
                            <td>{reservation.canal}</td>
                            <td>{reservation.notes || "Sem notas"}</td>
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
