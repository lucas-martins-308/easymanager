import { API_URL } from '../../config/constants';

class AuthService {
    async login(email, senha) {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao fazer login");
            }

            if (!data.usuario || !data.usuario.role) {
                throw new Error("Dados do usuário inválidos");
            }

            // Salvar o token se fornecido
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            return data.usuario;
        } catch (error) {
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }

    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    isAuthenticated() {
        return !!this.getCurrentUser();
    }

    hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.role === role;
    }
}

export const authService = new AuthService(); 