import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { itemService } from '../../services/item/itemService';
import './ItensTable.css';

const ItensList = () => {
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        loadItens();
    }, []);

    const loadItens = async () => {
        try {
            setLoading(true);
            const data = await itemService.getAll();
            setItens(data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar itens');
            console.error('Erro ao carregar itens:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            nomeItem: item.nomeItem || '',
            quantidade: item.quantidade || '',
            preco: item.preco || '',
            dtValidade: item.dtValidade ? item.dtValidade.split('T')[0] : ''
        });
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            await itemService.update(editingItem.idItem, formData);

            await loadItens();
            setEditingItem(null);
            setFormData({});
        } catch (err) {
            setError('Erro ao atualizar item');
            console.error('Erro ao atualizar item:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditingItem(null);
        setFormData({});
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este item?')) {
            try {
                setLoading(true);
                await itemService.delete(id);
                await loadItens();
            } catch (err) {
                setError('Erro ao excluir item');
                console.error('Erro ao excluir item:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const filteredItens = itens.filter(
        (item) =>
            item.nomeItem?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(item.preco).includes(searchTerm)
    );

    if (loading && itens.length === 0) {
        return (
            <div className="itens-container">
                <div className="loading">Carregando itens...</div>
            </div>
        );
    }

    return (
        <div className="itens-container">
            <div className="itens-header">
                <h1>Listagem de Itens</h1>
                <div className="header-actions">
                    <input
                        type="text"
                        placeholder="Buscar por nome..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />

                    <Link to="/itens-table" className="add-item-btn">
                        + Adicionar Novo Item
                    </Link>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="itens-table-container">
                <table className="itens-table">
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
                        {filteredItens.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="no-data">
                                    {searchTerm
                                        ? 'Nenhum item encontrado para a busca.'
                                        : 'Nenhum item cadastrado.'}
                                </td>
                            </tr>
                        ) : (
                            filteredItens.map((item) => (
                                <tr key={item.idItem}>
                                    {editingItem?.idItem === item.idItem ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="nomeItem"
                                                    value={formData.nomeItem}
                                                    onChange={handleInputChange}
                                                    className="edit-input"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="quantidade"
                                                    value={formData.quantidade}
                                                    onChange={handleInputChange}
                                                    className="edit-input"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    name="preco"
                                                    value={formData.preco}
                                                    onChange={handleInputChange}
                                                    className="edit-input"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="dtValidade"
                                                    value={formData.dtValidade}
                                                    onChange={handleInputChange}
                                                    className="edit-input"
                                                />
                                            </td>

                                            <td>
                                                <div className="action-buttons">
                                                    <button onClick={handleSave} className="save-btn">
                                                        Salvar
                                                    </button>
                                                    <button onClick={handleCancel} className="cancel-btn">
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{item.nomeItem}</td>
                                            <td>{item.quantidade}</td>
                                            <td>R$ {parseFloat(item.preco).toFixed(2)}</td>
                                            <td>{item.dtValidade}</td>

                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="edit-btn"
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(item.idItem)}
                                                        className="delete-btn"
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="itens-summary">
                <p>Total de itens: {filteredItens.length}</p>
            </div>
        </div>
    );
};

export default ItensList;
