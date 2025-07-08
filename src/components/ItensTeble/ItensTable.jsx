import './ItensTable.css';
import { useEffect, useState } from 'react';
import { itemService } from '../../services/item/itemService';

function ItensTable() {
    const [itens, setItens] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadItens();
    }, []);

    const loadItens = async () => {
        try {
            setLoading(true);
            const data = await itemService.getAll();
            setItens(data);
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
            alert('Erro ao carregar itens');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setFormData(itens[index]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveClick = async () => {
        try {
            setLoading(true);
            const itemToUpdate = itens[editingIndex];
            await itemService.update(itemToUpdate.idItem, formData);
            
            // Recarregar a lista de itens
            await loadItens();
            
            setEditingIndex(null);
            setFormData({});
            alert('Item atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar item:', error);
            alert('Erro ao atualizar item');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelClick = () => {
        setEditingIndex(null);
        setFormData({});
    };

    return (
        <div className="itens-table">
            <h2>Itens Cadastrados</h2>
            {loading ? (
                <p>Carregando itens...</p>
            ) : itens.length > 0 ? (
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
                        <tr key={item.idItem}>
                            {editingIndex === index ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            name="nomeItem"
                                            value={formData.nomeItem || ''}
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
                                            type="number"
                                            step="0.01"
                                            name="preco"
                                            value={formData.preco || ''}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            name="dtValidade"
                                            value={formData.dtValidade || ''}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleSaveClick} disabled={loading}>
                                            {loading ? 'Salvando...' : 'Salvar'}
                                        </button>
                                        <button onClick={handleCancelClick} disabled={loading}>Cancelar</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{item.nomeItem}</td>
                                    <td>{item.quantidade}</td>
                                    <td>R$ {parseFloat(item.preco).toFixed(2)}</td>
                                    <td>{item.dtValidade}</td>
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
