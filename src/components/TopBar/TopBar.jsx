import PropTypes from 'prop-types';
import './index.css';
import Navbar from '../Navbar/Navbar.jsx';

function TopBar({ handleLogout, isAuthenticated }) {
    return (
        <div className="topbar">
            <Navbar
                isAuthenticated={isAuthenticated}
                handleLogout={handleLogout}
            />        </div>
    );
}

TopBar.propTypes = {
    handleLogout: PropTypes.func.isRequired,
};

export default TopBar;
