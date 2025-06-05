import { authService } from '../../services/auth/authService';
import User from '../../models/User';

class AuthController {
    async login(email, senha) {
        try {
            const userData = await authService.login(email, senha);
            
            if (!User.validate(userData)) {
                throw new Error('Dados do usuário inválidos');
            }

            const user = new User(userData);
            localStorage.setItem('currentUser', JSON.stringify(user.toJSON()));
            
            return user;
        } catch (error) {
            throw error;
        }
    }

    logout() {
        authService.logout();
    }

    getCurrentUser() {
        const userData = authService.getCurrentUser();
        return userData ? new User(userData) : null;
    }

    isAuthenticated() {
        return authService.isAuthenticated();
    }

    hasRole(role) {
        return authService.hasRole(role);
    }
}

export const authController = new AuthController(); 