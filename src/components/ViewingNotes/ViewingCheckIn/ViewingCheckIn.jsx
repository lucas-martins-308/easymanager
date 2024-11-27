import './index.css';

export default function ViewingCheckIn() {
    return (
        <div id="viewing-checkin">
            <h1>Check-in</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Check-in</th>
                        <th>Origem</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Isadora Peixoto</td>
                        <td>23/11/2024</td>
                        <td>Airbnb</td>
                    </tr>
                    <tr>
                        <td>Wagner Cabral</td>
                        <td>22/11/2024</td>
                        <td>Booking</td>
                    </tr>

                    <tr>
                        <td>Lucas</td>
                        <td>03/12/2024</td>
                        <td>HostelWorld</td>
                    </tr>

                    <tr>
                        <td>Renato</td>
                        <td>17/12/2024</td>
                        <td>Instagram</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
