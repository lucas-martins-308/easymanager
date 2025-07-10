import React, { useState, useEffect } from 'react';
import { fornecedorService } from '../../services/fornecedor/fornecedorService';
import FornecedorForm from '../../components/forms/FornecedorForm/FornecedorForm';
import './Fornecedores.css';

const Fornecedores = () => {
    const [fornecedores, setFornecedores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingFornecedor, setEditingFornecedor] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadFornecedores();
    }, []);

    const loadFornecedores = async () => {
        try {
            setLoading(true);
            const data = await fornecedorService.getAll();
            setFornecedores(data);
        } catch (error) {
            console.error('Erro ao carregar fornecedores:', error);
            console.log('Erro ao carregar fornecedores');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir este fornecedor?');
        if (confirmDelete) {
            try {
                await fornecedorService.delete(id);
                console.log('Fornecedor excluído com sucesso!');
                loadFornecedores();
            } catch (error) {
                console.error('Erro ao excluir fornecedor:', error);
                console.log(`Erro ao excluir fornecedor: ${error.message}`);
            }
        }
    };

    const handleEdit = (fornecedor) => {
        setEditingFornecedor(fornecedor);
        setShowForm(true);
    };

    const handleFormSubmit = async (fornecedorData) => {
        try {
            if (editingFornecedor) {
                await fornecedorService.update(editingFornecedor.idFornecedor, fornecedorData);
                console.log('Fornecedor atualizado com sucesso!');
            } else {
                await fornecedorService.create(fornecedorData);
                console.log('Fornecedor cadastrado com sucesso!');
            }
            setShowForm(false);
            setEditingFornecedor(null);
            loadFornecedores();
        } catch (error) {
            console.error('Erro ao salvar fornecedor:', error);
            console.log(`Erro ao salvar fornecedor: ${error.message}`);
        }
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingFornecedor(null);
    };

    const filteredFornecedores = fornecedores.filter(fornecedor =>
        fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fornecedor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fornecedor.telefone.includes(searchTerm)
    );

    if (showForm) {
        return (
            <div className="fornecedores-page">
                <div className="fornecedores-header">
                    <h1>{editingFornecedor ? 'Editar Fornecedor' : 'Cadastrar Fornecedor'}</h1>
                    <button 
                        className="btn-secondary"
                        onClick={handleCancelForm}
                    >
                        Cancelar
                    </button>
                </div>
                <FornecedorForm 
                    onSubmit={handleFormSubmit}
                    initialData={editingFornecedor}
                />
            </div>
        );
    }

    return (
        <div className="fornecedores-page">
            <div className="fornecedores-header">
                <h1>Gerenciamento de Fornecedores</h1>
                <button 
                    className="btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    + Novo Fornecedor
                </button>
            </div>

            <div className="fornecedores-search">
                <input
                    type="text"
                    placeholder="Buscar fornecedores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {loading ? (
                <div className="loading">Carregando fornecedores...</div>
            ) : (
                <div className="fornecedores-grid">
                    {filteredFornecedores.length === 0 ? (
                        <div className="no-data">
                            {searchTerm ? 'Nenhum fornecedor encontrado para a busca.' : 'Nenhum fornecedor cadastrado.'}
                        </div>
                    ) : (
                        filteredFornecedores.map((fornecedor) => (
                            <div key={fornecedor.idFornecedor} className="fornecedor-card">
                                <div className="fornecedor-info">
                                    <h3>{fornecedor.nome}</h3>
                                    <p><strong>Email:</strong> {fornecedor.email}</p>
                                    <p><strong>Telefone:</strong> {fornecedor.telefone}</p>
                                    {fornecedor.endereco && (
                                        <div className="endereco-info">
                                            <p><strong>Endereço:</strong></p>
                                            <p>{fornecedor.endereco.logradouro}, {fornecedor.endereco.numero}</p>
                                            <p>{fornecedor.endereco.cidade} - {fornecedor.endereco.estado}</p>
                                            <p>CEP: {fornecedor.endereco.cep}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="fornecedor-actions">
                                    <button 
                                        className="btn-edit"
                                        onClick={() => handleEdit(fornecedor)}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="btn-delete"
                                        onClick={() => handleDelete(fornecedor.idFornecedor)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Fornecedores; 