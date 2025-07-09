import './ViewingHistory.css';
import { useEffect, useState } from 'react';
import { reservationService } from '../../../services/reservation/reservationService';

export default function ViewingHistory() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchReservas() {
            try {
                setLoading(true);
                setError(null);
                const todas = await reservationService.getAll();
                // Ordena por data de criação (ou dataCheckin) decrescente e pega as 10 mais recentes
                const sorted = todas.sort((a, b) => new Date(b.dataCheckin) - new Date(a.dataCheckin));
                setReservas(sorted.slice(0, 10));
            } catch (err) {
                setError('Erro ao buscar últimas reservas');
            } finally {
                setLoading(false);
            }
        }
        fetchReservas();
    }, []);

    return (
        <div className="viewing" id="viewing-notes-booking-history">
            <h1>Últimas Reservas</h1>
            {loading ? (
                <div>Carregando...</div>
            ) : error ? (
                <div style={{color: 'red'}}>{error}</div>
            ) : (
                <table className="viewing-table" border="1">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.length === 0 ? (
                            <tr key="no-reservations"><td colSpan={3}>Nenhuma reserva encontrada</td></tr>
                        ) : (
                            reservas.slice(0, 3).map((reserva, idx) => (
                                <tr key={reserva.idReserva || reserva.id || idx}>
                                    <td>{reserva.Hospede?.nome || '-'}</td>
                                    <td>R$ {Number(reserva.valorTotal).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                                    <td>{reserva.status}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
