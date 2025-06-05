import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    handleLogin: () => {},
    handleLogout: () => {},
    loading: true
});

const validateUser = (userData) => {
    if (!userData || typeof userData !== 'object') return false;
    if (!userData.role || typeof userData.role !== 'string') return false;
    return true;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            try {
                const parsedUser = JSON.parse(currentUser);
                if (validateUser(parsedUser)) {
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } else {
                    console.error('Dados do usuário inválidos');
                    localStorage.removeItem('currentUser');
                }
            } catch (error) {
                console.error('Erro ao carregar usuário:', error);
                localStorage.removeItem('currentUser');
            }
        }
        setLoading(false);
    }, []);

    const handleLogin = (userData) => {
        if (!validateUser(userData)) {
            console.error('Dados do usuário inválidos');
            return false;
        }
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return true;
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
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