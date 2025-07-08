import { API_URL } from '../../config/constants';

class UserService {
    async getAll() {
        try {
            const response = await fetch(`${API_URL}/api/usuarios`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Erro ao buscar usuários');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            throw error;
        }
    }

    async create(userData) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token não encontrado. Faça login novamente.');
            }

            const response = await fetch(`${API_URL}/api/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Token inválido ou expirado. Faça login novamente.');
                }
                const error = await response.json();
                throw new Error(error.message || 'Erro ao criar usuário');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }

    async update(id, userData) {
        try {
            const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar usuário');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar usuário');
            }

            return true;
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw error;
        }
    }
}

export const userService = new UserService(); 