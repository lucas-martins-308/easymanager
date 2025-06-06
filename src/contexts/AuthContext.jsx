import { createContext, useContext, useState, useEffect } from 'react';
import { authController } from '../controllers/auth/AuthController';
import { ROUTES } from '../config/constants';

const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    handleLogin: () => {},
    handleLogout: () => {},
    loading: true
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = authController.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const handleLogin = async (email, senha) => {
        try {
            const user = await authController.login(email, senha);
            setUser(user);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error('Erro no login:', error);
            return false;
        }
    };

    const handleLogout = () => {
        authController.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            handleLogin,
            handleLogout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export { AuthContext }; 