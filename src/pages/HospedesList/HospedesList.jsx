import React, { useState, useEffect } from 'react';
import { customerService } from '../../services/customer/customerService';
import './HospedesList.css';

const HospedesList = () => {
    const [hospedes, setHospedes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingHospede, setEditingHospede] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        loadHospedes();
    }, []);

    const loadHospedes = async () => {
        try {
            setLoading(true);
            const data = await customerService.getAll();
            console.log('Dados carregados dos hóspedes:', data);
            if (data.length > 0) {
                console.log('Primeiro hóspede:', data[0]);
                console.log('Campos disponíveis:', Object.keys(data[0]));
            }
            setHospedes(data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar hóspedes');
            console.error('Erro ao carregar hóspedes:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (hospede) => {
        setEditingHospede(hospede);
        setFormData({
            nomeCompleto: hospede.nomeCompleto || '',
            documento: hospede.documento || '',
            tipoDocumento: hospede.tipoDocumento || 'CPF',
            dtNascimento: hospede.dtNascimento ? hospede.dtNascimento.split('T')[0] : '',
            telefone: hospede.telefone || '',
            email: hospede.email || '',
            genero: hospede.genero === 'M' ? 'Masculino' : hospede.genero === 'F' ? 'Feminino' : 'Outro'
        });
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            
            console.log('ID do hóspede sendo editado:', editingHospede.idHospede);
            console.log('Dados do formulário:', formData);
            
            // Mapear os dados para o formato esperado pelo backend
            const hospedeData = {
                nomeCompleto: formData.nomeCompleto,
                documento: formData.documento,
                tipoDocumento: formData.tipoDocumento || 'CPF',
                dtNascimento: formData.dtNascimento,
                telefone: formData.telefone,
                email: formData.email,
                genero: formData.genero === 'Masculino' ? 'M' : formData.genero === 'Feminino' ? 'F' : 'O'
            };
            
            console.log('Dados mapeados para envio:', hospedeData);
            
            await customerService.update(editingHospede.idHospede, hospedeData);
            await loadHospedes();
            setEditingHospede(null);
            setFormData({});
        } catch (err) {
            setError('Erro ao atualizar hóspede');
            console.error('Erro ao atualizar hóspede:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditingHospede(null);
        setFormData({});
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este hóspede?')) {
            try {
                setLoading(true);
                await customerService.delete(id);
                await loadHospedes();
            } catch (err) {
                setError('Erro ao excluir hóspede');
                console.error('Erro ao excluir hóspede:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredHospedes = hospedes.filter(hospede =>
        hospede.nomeCompleto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospede.documento?.includes(searchTerm) ||
        hospede.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const formatPhone = (phone) => {
        if (!phone) return '';
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    if (loading && hospedes.length === 0) {
        return (
            <div className="hospedes-container">
                <div className="loading">Carregando hóspedes...</div>
            </div>
        );
    }

    return (
        <div className="hospedes-container">
            <div className="hospedes-header">
                <h1>Listagem de Hóspedes</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar por nome, documento ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="hospedes-table-container">
                <table className="hospedes-table">
                    <thead>
                        <tr>
                            <th>Nome Completo</th>
                            <th>Documento</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th>Data de Nascimento</th>
                            <th>Gênero</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHospedes.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="no-data">
                                    {searchTerm ? 'Nenhum hóspede encontrado para a busca.' : 'Nenhum hóspede cadastrado.'}
                                </td>
                            </tr>
                        ) : (
                            filteredHospedes.map((hospede) => (
                                <tr key={hospede.idHospede}>
                                    {editingHospede?.idHospede === hospede.idHospede ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="nomeCompleto"
                                                    value={formData.nomeCompleto}
                                                    onChange={handleInputChange}
                                                    className="edit-input"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="documento"
                                                    value={formData.documento}
                                                    onChange={handleInputChange}
                                                    className="edit-input"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="telefone"
                                                    value={formData.telefone}
                                                    onChange={handleInputChange}
                                                    className="edit-input"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="edit-input"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="dtNascimento"
                                                    value={formData.dtNascimento}
                                                    onChange={handleInputChange}
                                                    className="edit-input"
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    name="genero"
                                                    value={formData.genero}
                                                    onChange={handleInputChange}
                                                    className="edit-select"
                                                >
                                                    <option value="Masculino">Masculino</option>
                                                    <option value="Feminino">Feminino</option>
                                                    <option value="Outro">Outro</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        onClick={handleSave}
                                                        disabled={loading}
                                                        className="save-btn"
                                                    >
                                                        {loading ? 'Salvando...' : 'Salvar'}
                                                    </button>
                                                    <button
                                                        onClick={handleCancel}
                                                        disabled={loading}
                                                        className="cancel-btn"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{hospede.nomeCompleto}</td>
                                            <td>{hospede.documento}</td>
                                            <td>{formatPhone(hospede.telefone)}</td>
                                            <td>{hospede.email}</td>
                                            <td>{formatDate(hospede.dtNascimento)}</td>
                                            <td>
                                                {hospede.genero === 'M' ? 'Masculino' : 
                                                 hospede.genero === 'F' ? 'Feminino' : 'Outro'}
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        onClick={() => handleEdit(hospede)}
                                                        className="edit-btn"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(hospede.idHospede)}
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

            <div className="hospedes-summary">
                <p>Total de hóspedes: {filteredHospedes.length}</p>
            </div>
        </div>
    );
};

export default HospedesList;
