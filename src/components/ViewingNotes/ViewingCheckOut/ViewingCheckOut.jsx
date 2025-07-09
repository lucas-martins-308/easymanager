import './ViewingCheckOut.css';
import { useEffect, useState } from 'react';
import { reservationService } from '../../../services/reservation/reservationService';

export default function ViewingCheckOut() {
    const [checkouts, setCheckouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCheckouts() {
            try {
                setLoading(true);
                setError(null);
                const reservas = await reservationService.getAll();
                const hoje = new Date();
                const checkoutList = reservas.filter(r => {
                    const dataCheckout = new Date(r.dataCheckout);
                    return (
                        dataCheckout >= new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
                    );
                });
                setCheckouts(checkoutList);
            } catch (err) {
                setError('Erro ao buscar check-outs');
            } finally {
                setLoading(false);
            }
        }
        fetchCheckouts();
    }, []);

    return (
        <div className="viewing" id="viewing-checkout">
            <h1>Check-out</h1>
            {loading ? (
                <div>Carregando...</div>
            ) : error ? (
                <div style={{color: 'red'}}>{error}</div>
            ) : (
                <table className="viewing-table" border="1">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Check-out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkouts.length === 0 ? (
                            <tr key="no-checkouts"><td colSpan={2}>Nenhum check-out encontrado</td></tr>
                        ) : (
                            checkouts.slice(0, 3).map((reserva) => (
                                <tr key={reserva.id}>
                                    <td>{reserva.Hospede?.nome || '-'}</td>
                                    <td>{new Date(reserva.dataCheckout + 'T00:00:00').toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
