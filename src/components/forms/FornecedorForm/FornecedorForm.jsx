import React, { useState, useEffect } from 'react';
import { fornecedorService } from '../../../services/fornecedor/fornecedorService';
import './FornecedorForm.css';

const FornecedorForm = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        email: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        cidade: '',
        estado: '',
        pais: 'Brasil'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                nome: initialData.nome || '',
                telefone: initialData.telefone || '',
                email: initialData.email || '',
                cep: initialData.endereco?.cep || '',
                logradouro: initialData.endereco?.logradouro || '',
                numero: initialData.endereco?.numero || '',
                complemento: initialData.endereco?.complemento || '',
                cidade: initialData.endereco?.cidade || '',
                estado: initialData.endereco?.estado || '',
                pais: initialData.endereco?.pais || 'Brasil'
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Função para tratar o CEP: só números e máximo 8 dígitos
    const handleCepChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 8); // só números, máximo 8 dígitos
        setFormData(prev => ({
            ...prev,
            cep: value
        }));
    };

    // Função para tratar o número: só números e máximo 6 dígitos
    const handleNumeroChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6); // só números, máximo 6 dígitos
        setFormData(prev => ({
            ...prev,
            numero: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            
            // Validações básicas
            if (!formData.nome || formData.nome.trim().length < 2) {
                throw new Error('Nome deve ter pelo menos 2 caracteres');
            }
            
            if (!formData.telefone || formData.telefone.trim().length < 8) {
                throw new Error('Telefone deve ter pelo menos 8 dígitos');
            }
            
            if (!formData.email || !formData.email.includes('@')) {
                throw new Error('Email deve ser válido');
            }
            
            if (!formData.cep || formData.cep.trim().length < 5) {
                throw new Error('CEP deve ter pelo menos 5 dígitos');
            }
            
            if (!formData.logradouro || formData.logradouro.trim().length < 3) {
                throw new Error('Logradouro deve ter pelo menos 3 caracteres');
            }
            
            if (!formData.cidade || formData.cidade.trim().length < 2) {
                throw new Error('Cidade deve ter pelo menos 2 caracteres');
            }
            
            if (!formData.estado || formData.estado.trim().length !== 2) {
                throw new Error('Estado deve ter 2 caracteres');
            }
            
            // Separar dados do fornecedor e do endereço
            const enderecoData = {
                cep: formData.cep.trim(),
                logradouro: formData.logradouro.trim(),
                numero: formData.numero ? parseInt(formData.numero) : null,
                complemento: formData.complemento ? formData.complemento.trim() : null,
                cidade: formData.cidade.trim(),
                estado: formData.estado.trim().toUpperCase(),
                pais: formData.pais.trim()
            };

            const fornecedorData = {
                nome: formData.nome.trim(),
                telefone: formData.telefone.trim(),
                email: formData.email.trim().toLowerCase(),
                endereco: enderecoData // Enviar dados do endereço junto
            };

            console.log('Dados do fornecedor sendo enviados:', fornecedorData);
            
            if (onSubmit) {
                await onSubmit(fornecedorData);
            } else {
                await fornecedorService.create(fornecedorData);
                console.log('Fornecedor cadastrado com sucesso!');
                setFormData({
                    nome: '',
                    telefone: '',
                    email: '',
                    cep: '',
                    logradouro: '',
                    numero: '',
                    complemento: '',
                    cidade: '',
                    estado: '',
                    pais: 'Brasil'
                });
            }
        } catch (error) {
            console.error('Erro ao cadastrar fornecedor:', error);
            console.error(`Erro ao cadastrar fornecedor: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Lista de estados brasileiros (siglas)
    const estados = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
        'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
        'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];

    return (
        <form className="fornecedor-form" onSubmit={handleSubmit}>
            <h2>{initialData ? 'Editar Fornecedor' : 'Cadastro de Fornecedor'}</h2>

            <div className="form-section">
                <h3>Dados do Fornecedor</h3>
                
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="telefone">Telefone:</label>
                    <input
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-section">
                <h3>Endereço</h3>
                
                <div className="form-group">
                    <label htmlFor="cep">CEP:</label>
                    <input
                        type="text"
                        id="cep"
                        name="cep"
                        value={formData.cep}
                        onChange={handleCepChange}
                        maxLength={8}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="logradouro">Logradouro:</label>
                    <input
                        type="text"
                        id="logradouro"
                        name="logradouro"
                        value={formData.logradouro}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="numero">Número:</label>
                    <input
                        type="text"
                        id="numero"
                        name="numero"
                        value={formData.numero}
                        onChange={handleNumeroChange}
                        maxLength={6}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="complemento">Complemento:</label>
                    <input
                        type="text"
                        id="complemento"
                        name="complemento"
                        value={formData.complemento}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cidade">Cidade:</label>
                    <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="estado">Estado:</label>
                    <select
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione o estado</option>
                        {estados.map(uf => (
                            <option key={uf} value={uf}>{uf}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="pais">País:</label>
                    <input
                        type="text"
                        id="pais"
                        name="pais"
                        value={formData.pais}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-actions">
                {onCancel && (
                    <button 
                        type="button" 
                        className="btn-secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                )}
                <button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : (initialData ? 'Atualizar' : 'Cadastrar Fornecedor')}
                </button>
            </div>
        </form>
    );
};

export default FornecedorForm; 