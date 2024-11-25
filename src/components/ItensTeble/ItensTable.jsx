import './ItensTable.css';
import  { useEffect, useState } from 'react';

function ItensTable() {
    const [itens, setItens] = useState([]);

    useEffect(() => {
        // Obtém os itens do localStorage ao carregar o componente
        const storedItens = JSON.parse(localStorage.getItem('itens')) || [];
        setItens(storedItens);
    }, []);

    return (
        <div className="itens-table">
            <h2>Itens Cadastrados</h2>
            {itens.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Nome do Item</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Data de Validade</th>
                    </tr>
                    </thead>
                    <tbody>
                    {itens.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nome_item}</td>
                            <td>{item.quantidade}</td>
                            <td>R$ {parseFloat(item.preco).toFixed(2)}</td>
                            <td>{item.data_validade}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Nenhum item cadastrado.</p>
            )}
        </div>
    );
}

export default ItensTable;
