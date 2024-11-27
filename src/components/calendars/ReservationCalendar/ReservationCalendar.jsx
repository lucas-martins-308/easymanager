import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ReservationCalendar.css";

const ReservationCalendar = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null); // Reserva selecionada para o modal

  // Carrega reservas do localStorage
  const loadReservations = () => {
    const storedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
    setReservations(storedReservations);
  };

  // Atualiza reservas a cada 500ms
  useEffect(() => {
    loadReservations();
    const interval = setInterval(loadReservations, 500);
    return () => clearInterval(interval);
  }, []);

  // Filtra reservas pela data selecionada
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
    setSelectedReservation(null); // Fecha o modal ao mudar a data
  };

  const handleNameClick = (reservation) => {
    setSelectedReservation(reservation); // Abre o modal com os detalhes
  };

  const handleCloseModal = () => {
    setSelectedReservation(null); // Fecha o modal
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
              <th>Nome do Quarto</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Canal</th>
              <th>Notas</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation, index) => (
              <tr key={index}>
                <td>
                  <a
                    href="#"
                    className="name-link"
                    onClick={(e) => {
                      e.preventDefault(); // Evita o comportamento padrão do link
                      handleNameClick(reservation);
                    }}
                  >
                    {reservation.nome}
                  </a>
                </td>
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

      {/* Modal com os detalhes da reserva */}
      {selectedReservation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Detalhes da Reserva</h3>
            <p>
              <strong>Nome:</strong> {selectedReservation.nome}
            </p>
            <p>
              <strong>Check-in:</strong> {selectedReservation.checkIn}
            </p>
            <p>
              <strong>Check-out:</strong> {selectedReservation.checkOut}
            </p>
            <p>
              <strong>Canal:</strong> {selectedReservation.canal}
            </p>
            <p>
              <strong>Quarto:</strong> {selectedReservation.quarto || "Quarto Feminino"}
            </p>
            <p>
              <strong>WhatsApp:</strong> {selectedReservation.whatsapp || "(11 9 9877 5544)"}
            </p>
            <p>
              <strong>Valor Total:</strong> R$ {selectedReservation.valorTotal || "R$ "}
            </p>
            <button className="close-button" onClick={handleCloseModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCalendar;
