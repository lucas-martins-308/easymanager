import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userRole = user?.role;

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
