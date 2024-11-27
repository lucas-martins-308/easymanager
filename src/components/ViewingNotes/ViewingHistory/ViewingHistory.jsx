import './index.css';

export default function ViewingCheckIn() {
    return (
        <div id="viewing-checkin">
            <h1>Últimas Reservas</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Total</th>
                        <th>Status</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ricardo</td>
                        <td>R$159,00</td>
                        <td>Aberta</td>
                    </tr>
                    <tr>
                        <td>Douglas</td>
                        <td>R$169,00</td>
                        <td>Andamento</td>
                    </tr>

                    <tr>
                        <td>Isabela</td>
                        <td>R$189,00</td>
                        <td>Concluída</td>
                        
                    </tr>

                    <tr>
                        <td>Marcus</td>
                        <td>R$219,00</td>
                        <td>Em breve</td>
                       
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
