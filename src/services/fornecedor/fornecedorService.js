import { API_URL } from '../../config/constants';

class FornecedorService {
    async getAll() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('Token não encontrado, retornando array vazio');
                return [];
            }

            const response = await fetch(`${API_URL}/api/fornecedores`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                if (response.status === 401) {
                    console.log('Token inválido, retornando array vazio');
                    return [];
                }
                throw new Error('Erro ao buscar fornecedores');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar fornecedores:', error);
            return [];
        }
    }

    async create(fornecedorData) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token não encontrado. Faça login novamente.');
            }

            console.log('Enviando dados para API:', fornecedorData);

            const response = await fetch(`${API_URL}/api/fornecedores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(fornecedorData)
            });

            console.log('Resposta da API:', response.status, response.statusText);

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Token inválido ou expirado. Faça login novamente.');
                }
                
                let errorMessage = 'Erro ao criar fornecedor';
                try {
                    const errorData = await response.json();
                    console.error('Dados do erro:', errorData);
                    errorMessage = errorData.message || errorData.error || errorMessage;
                    if (errorData.details) {
                        errorMessage += ` - ${errorData.details.join(', ')}`;
                    }
                } catch (parseError) {
                    console.error('Erro ao fazer parse da resposta:', parseError);
                    const errorText = await response.text();
                    console.error('Resposta em texto:', errorText);
                    errorMessage = `Erro ${response.status}: ${errorText}`;
                }
                
                throw new Error(errorMessage);
            }

            const result = await response.json();
            console.log('Fornecedor criado com sucesso:', result);
            return result;
        } catch (error) {
            console.error('Erro ao criar fornecedor:', error);
            throw error;
        }
    }

    async update(id, fornecedorData) {
        try {
            const response = await fetch(`${API_URL}/api/fornecedores/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(fornecedorData)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar fornecedor');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar fornecedor:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await fetch(`${API_URL}/api/fornecedores/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar fornecedor');
            }

            return true;
        } catch (error) {
            console.error('Erro ao deletar fornecedor:', error);
            throw error;
        }
    }
}

export const fornecedorService = new FornecedorService(); 