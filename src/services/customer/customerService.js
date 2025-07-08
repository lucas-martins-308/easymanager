import { API_URL } from '../../config/constants';

class CustomerService {
    async getAll() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('Token não encontrado, retornando array vazio');
                return [];
            }

            const response = await fetch(`${API_URL}/api/hospedes`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                if (response.status === 401) {
                    console.log('Token inválido, retornando array vazio');
                    return [];
                }
                throw new Error('Erro ao buscar hóspedes');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar hóspedes:', error);
            return [];
        }
    }

    async create(customerData) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token não encontrado. Faça login novamente.');
            }

            // Mapear os dados do formulário para o formato esperado pelo banco
            const hospedeData = {
                nome: customerData.nome,
                sobrenome: customerData.sobrenome,
                documento: customerData.document,
                tipoDocumento: customerData.tipoDocumento,
                dtNascimento: customerData.birthDate,
                telefone: customerData.phone,
                email: customerData.email,
                genero: customerData.gender === 'Masculino' ? 'M' : customerData.gender === 'Feminino' ? 'F' : 'O',
                preferencia: customerData.country,
                Endereco_idEndereco: 1 // Valor padrão para o endereço
            };

            console.log('Dados mapeados:', hospedeData);
            console.log('URL da API:', `${API_URL}/api/hospedes`);

            const response = await fetch(`${API_URL}/api/hospedes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(hospedeData)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Token inválido ou expirado. Faça login novamente.');
                }
                
                let errorMessage = 'Erro ao criar hóspede';
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
            console.error('Erro ao criar hóspede:', error);
            throw error;
        }
    }

    async update(id, customerData) {
        try {
            const response = await fetch(`${API_URL}/api/hospedes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(customerData)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar hóspede');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar hóspede:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await fetch(`${API_URL}/api/hospedes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar hóspede');
            }

            return true;
        } catch (error) {
            console.error('Erro ao deletar hóspede:', error);
            throw error;
        }
    }
}

export const customerService = new CustomerService(); 