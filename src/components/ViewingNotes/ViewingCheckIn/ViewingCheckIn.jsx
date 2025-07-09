import './ViewingCheckIn.css';
import { useEffect, useState } from 'react';
import { reservationService } from '../../../services/reservation/reservationService';

export default function ViewingCheckIn() {
    const [checkins, setCheckins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCheckins() {
            try {
                setLoading(true);
                setError(null);
                const reservas = await reservationService.getAll();
                // Filtra reservas com status 'checkin' ou 'confirmada' e dataCheckin >= hoje
                const hoje = new Date();
                const checkinList = reservas.filter(r => {
                    const dataCheckin = new Date(r.dataCheckin);
                    return (
                        (r.status === 'checkin' || r.status === 'confirmada' || r.status === 'pendente') &&
                        dataCheckin >= new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
                    );
                });
                setCheckins(checkinList);
            } catch (err) {
                setError('Erro ao buscar check-ins');
            } finally {
                setLoading(false);
            }
        }
        fetchCheckins();
    }, []);

    return (
        <div className="viewing" id="viewing-checkin">
            <h1>Check-in</h1>
            {loading ? (
                <div>Carregando...</div>
            ) : error ? (
                <div style={{color: 'red'}}>{error}</div>
            ) : (
                <table className="viewing-table" border="1">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Check-in</th>
                            <th>Origem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkins.length === 0 ? (
                            <tr key="no-checkins"><td colSpan={3}>Nenhum check-in encontrado</td></tr>
                        ) : (
                            checkins.slice(0, 3).map((reserva) => (
                                <tr key={reserva.id}>
                                    <td>{reserva.Hospede?.nome || '-'}</td>
                                    <td>{new Date(reserva.dataCheckin + 'T00:00:00').toLocaleDateString()}</td>
                                    <td>{reserva.canal || reserva.canalReserva || '-'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
