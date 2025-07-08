import { userService } from '../services/user/userService';

class UserController {
    async getAllUsers() {
        try {
            return await userService.getAll();
        } catch (error) {
            console.error('Erro no controlador ao buscar usuários:', error);
            throw error;
        }
    }

    async createUser(userData) {
        try {
            // Mapeamento direto dos campos do formulário para o backend
            const mappedUserData = {
                nomeCompleto: userData.fullName,
                cpf: userData.cpf,
                dtNascimento: userData.birthDate,
                telefone: userData.phone,
                email: userData.email,
                senha: userData.password,
                tipoUsuario: userData.role === 'admin' ? 'adm' : 'func',
                Endereco_idEndereco: 1
            };

            return await userService.create(mappedUserData);
        } catch (error) {
            console.error('Erro no controlador ao criar usuário:', error);
            throw error;
        }
    }

    async updateUser(id, userData) {
        try {
            if (!id) {
                throw new Error('ID do usuário não fornecido');
            }

            const mappedData = {
                nomeCompleto: userData.fullName,
                cpf: userData.cpf,
                dtNascimento: userData.birthDate,
                telefone: userData.phone,
                email: userData.email,
                senha: userData.password,
                tipoUsuario: userData.role === 'admin' ? 'adm' : 'func'
            };

            return await userService.update(id, mappedData);
        } catch (error) {
            console.error('Erro no controlador ao atualizar usuário:', error);
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            if (!id) {
                throw new Error('ID do usuário não fornecido');
            }

            return await userService.delete(id);
        } catch (error) {
            console.error('Erro no controlador ao deletar usuário:', error);
            throw error;
        }
    }
}

export const userController = new UserController(); 