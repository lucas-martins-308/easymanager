import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ isAuthenticated, allowedRoles, children }) {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (allowedRoles && (!currentUser || !allowedRoles.includes(currentUser.role))) {
        return <Navigate to="/" replace />;
    }

    return children;
}

ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
