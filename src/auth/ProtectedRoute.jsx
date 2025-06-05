import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../pages/auth/AuthContext';

function ProtectedRoute({ allowedRoles, children }) {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
        return <Navigate to="/" replace />;
    }

    return children;
}

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
