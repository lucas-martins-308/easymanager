import './ItensTable.css';
import { useEffect, useState } from 'react';

function ItensTable() {
    const [itens, setItens] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const storedItens = JSON.parse(localStorage.getItem('itens')) || [];
        setItens(storedItens);
    }, []);

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setFormData(itens[index]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveClick = () => {
        const updatedItens = [...itens];
        updatedItens[editingIndex] = formData;
        setItens(updatedItens);
        localStorage.setItem('itens', JSON.stringify(updatedItens));
        setEditingIndex(null);
        setFormData({});
    };

    const handleCancelClick = () => {
        setEditingIndex(null);
        setFormData({});
    };

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
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {itens.map((item, index) => (
                        <tr key={index}>
                            {editingIndex === index ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            name="nome_item"
                                            value={formData.nome_item || ''}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="quantidade"
                                            value={formData.quantidade || ''}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="preco"
                                            value={formData.preco || ''}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            name="data_validade"
                                            value={formData.data_validade || ''}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleSaveClick}>Salvar</button>
                                        <button onClick={handleCancelClick}>Cancelar</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{item.nome_item}</td>
                                    <td>{item.quantidade}</td>
                                    <td>R$ {parseFloat(item.preco).toFixed(2)}</td>
                                    <td>{item.data_validade}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(index)}>Editar</button>
                                    </td>
                                </>
                            )}
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
