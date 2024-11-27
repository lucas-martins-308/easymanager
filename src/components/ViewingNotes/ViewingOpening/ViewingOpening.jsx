import './index.css';

export default function ViewingCheckIn() {
    return (
        <div id="viewing-checkin">
            <h1>Em aberto</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Pendência</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Leo</td>
                        <td>R$55,00</td>
                    </tr>
                    <tr>
                        <td>Celina</td>
                        <td>R$33,00</td>
                    </tr>
                    <tr>
                        <td>Rubia</td>
                        <td>R$10,00</td>
                    </tr>
                    <tr>
                        <td>Teodoro</td>
                        <td>R$45,00</td> 
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
