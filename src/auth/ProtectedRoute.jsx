// src/auth/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ isAuthenticated, allowedRoles, children }) {
    // Se o usuário não estiver autenticado, redireciona para o login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Verifica o role do usuário
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (allowedRoles && (!currentUser || !allowedRoles.includes(currentUser.role))) {
        return <Navigate to="/" replace />;
    }

    return children; // Retorna a rota protegida se o usuário estiver autenticado e com a role permitida
}

ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
