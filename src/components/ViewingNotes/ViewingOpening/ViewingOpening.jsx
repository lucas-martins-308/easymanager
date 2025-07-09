import './ViewingOpening.css';
import { useEffect, useState } from 'react';
import { reservationService } from '../../../services/reservation/reservationService';

export default function ViewingOpening() {
    const [abertas, setAbertas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAbertas() {
            try {
                setLoading(true);
                setError(null);
                const reservas = await reservationService.getAll();
                const hoje = new Date();
                const abertasList = reservas.filter(r => {
                    const dataCheckin = new Date(r.dataCheckin);
                    const dataCheckout = new Date(r.dataCheckout);
                    return (
                        dataCheckin <= hoje && dataCheckout >= hoje &&
                        r.status !== 'checkout' && r.status !== 'cancelada'
                    );
                });
                setAbertas(abertasList);
            } catch (err) {
                setError('Erro ao buscar reservas em aberto');
            } finally {
                setLoading(false);
            }
        }
        fetchAbertas();
    }, []);

    return (
        <div className="viewing" id="viewing-opening">
            <h1>Em aberto</h1>
            {loading ? (
                <div>Carregando...</div>
            ) : error ? (
                <div style={{color: 'red'}}>{error}</div>
            ) : (
                <table className="viewing-table" border="1">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Pendência</th>
                        </tr>
                    </thead>
                    <tbody>
                        {abertas.length === 0 ? (
                            <tr key="no-abertas"><td colSpan={2}>Nenhuma reserva em aberto</td></tr>
                        ) : (
                            abertas.slice(0, 3).map((reserva) => (
                                <tr key={reserva.id}>
                                    <td>{reserva.Hospede?.nome || '-'}</td>
                                    <td>R$ {Number(reserva.valorTotal).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
