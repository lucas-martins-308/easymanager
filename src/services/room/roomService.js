import { API_URL } from '../../config/constants';

class RoomService {
    async getAll() {
        try {
            const token = localStorage.getItem('token');
            console.log('Token para quartos:', token ? 'Presente' : 'Ausente');
            
            if (!token) {
                console.log('Token não encontrado, retornando array vazio');
                return [];
            }

            const response = await fetch(`${API_URL}/api/quartos`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            console.log('Resposta da API de quartos:', response.status, response.statusText);
            
            if (!response.ok) {
                if (response.status === 401) {
                    console.log('Token inválido, retornando array vazio');
                    return [];
                }
                throw new Error('Erro ao buscar quartos');
            }
            
            const data = await response.json();
            console.log('Dados dos quartos recebidos:', data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar quartos:', error);
            return [];
        }
    }

    async create(roomData) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token não encontrado. Faça login novamente.');
            }

            // Mapear os dados do formulário para o formato esperado pelo banco
            const quartoData = {
                numeroQuarto: roomData.numeroQuarto,
                tipoQuarto: roomData.tipoQuarto,
                precoDiaria: parseFloat(roomData.precoDiaria),
                capacidade: parseInt(roomData.capacidade),
                statusQuarto: roomData.statusQuarto
            };

            console.log('Dados mapeados:', quartoData);
            console.log('URL da API:', `${API_URL}/api/quartos`);

            const response = await fetch(`${API_URL}/api/quartos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(quartoData)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Token inválido ou expirado. Faça login novamente.');
                }
                
                let errorMessage = 'Erro ao criar quarto';
                try {
                    const errorData = await response.json();
                    console.error('Dados do erro:', errorData);
                    errorMessage = errorData.message || errorData.error || errorMessage;
                    if (errorData.details) {
                        errorMessage += ` - ${errorData.details.join(', ')}`;
                    }
                } catch (parseError) {
                    console.error('Erro ao fazer parse da resposta:', parseError);
                }
                
                console.error('Resposta do servidor:', response.status, response.statusText);
                throw new Error(errorMessage);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao criar quarto:', error);
            throw error;
        }
    }

    async update(id, roomData) {
        try {
            const response = await fetch(`${API_URL}/api/quartos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(roomData)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar quarto');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar quarto:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await fetch(`${API_URL}/api/quartos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar quarto');
            }

            return true;
        } catch (error) {
            console.error('Erro ao deletar quarto:', error);
            throw error;
        }
    }
}

export const roomService = new RoomService(); 