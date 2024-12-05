import './ViewingCheckOut.css';

export default function ViewingCheckOut() {
    return (
        <div className="viewing" id="viewing-checkout">
            <h1>Check-out</h1>
            <table className="viewing-table" border="1">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Check-out</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Leo</td>
                        <td>23/11/2024</td>
                        
                    </tr>
                    <tr>
                        <td>Caio</td>
                        <td>22/11/2024</td>
                        
                    </tr>

                    <tr>
                        <td>Jorge</td>
                        <td>03/12/2024</td>
                        
                    </tr>

                    <tr>
                        <td>Lucas</td>
                        <td>17/12/2024</td>
                       
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
