import { API_URL } from '../../config/constants';

class ItemService {
    async getAll() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('Token não encontrado, retornando array vazio');
                return [];
            }

            const response = await fetch(`${API_URL}/api/itens`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                if (response.status === 401) {
                    console.log('Token inválido, retornando array vazio');
                    return [];
                }
                throw new Error('Erro ao buscar itens');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
            return [];
        }
    }

    async create(itemData) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token não encontrado. Faça login novamente.');
            }

            console.log('Dados sendo enviados:', itemData);
            console.log('URL da API:', `${API_URL}/api/itens`);

            const response = await fetch(`${API_URL}/api/itens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(itemData),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Token inválido ou expirado. Faça login novamente.');
                }
                
                let errorMessage = 'Erro ao criar item';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (parseError) {
                    console.error('Erro ao fazer parse da resposta:', parseError);
                }
                
                console.error('Resposta do servidor:', response.status, response.statusText);
                throw new Error(errorMessage);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao criar item:', error);
            throw error;
        }
    }

    async update(id, itemData) {
        try {
            const response = await fetch(`${API_URL}/api/itens/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(itemData),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar item');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar item:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await fetch(`${API_URL}/api/itens/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar item');
            }

            return true;
        } catch (error) {
            console.error('Erro ao deletar item:', error);
            throw error;
        }
    }
}

export const itemService = new ItemService(); 