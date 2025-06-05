import React, { createContext, useState, useContext, useEffect } from 'react';
import { userController } from '../controllers/userController';
import { API_URL } from '../config/constants';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signIn = async (email, senha) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            if (!response.ok) {
                throw new Error('Credenciais inválidas');
            }

            const data = await response.json();
            const userData = {
                id: data.user.id,
                nomeCompleto: data.user.nomeCompleto,
                email: data.user.email,
                tipoUsuario: data.user.tipoUsuario,
                token: data.token,
            };

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', data.token);
            setUser(userData);
            return userData;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    };

    const signUp = async (userData) => {
        try {
            const newUser = await userController.createUser(userData);
            return newUser;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    };

    const signOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    const updateUser = async (userData) => {
        try {
            const updatedUser = await userController.updateUser(user.id, userData);
            const newUserData = { ...user, ...updatedUser };
            localStorage.setItem('user', JSON.stringify(newUserData));
            setUser(newUserData);
            return updatedUser;
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            loading,
            signIn,
            signUp,
            signOut,
            updateUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
} 