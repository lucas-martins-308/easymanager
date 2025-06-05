import { API_URL } from '../../config/constants';

class ItemService {
    async getAll() {
        try {
            const response = await fetch(`${API_URL}/api/items`);
            if (!response.ok) {
                throw new Error('Erro ao buscar itens');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
            throw error;
        }
    }

    async create(itemData) {
        try {
            const response = await fetch(`${API_URL}/api/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemData),
            });

            if (!response.ok) {
                throw new Error('Erro ao criar item');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao criar item:', error);
            throw error;
        }
    }

    async update(id, itemData) {
        try {
            const response = await fetch(`${API_URL}/api/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
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
            const response = await fetch(`${API_URL}/api/items/${id}`, {
                method: 'DELETE',
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