import PropTypes from 'prop-types';
import './index.css';
import Navbar from '../Navbar/Navbar.jsx';

function TopBar({ handleLogout }) {
    return (
        <div className="topbar">
            <Navbar handleLogout={handleLogout} />
        </div>
    );
}

TopBar.propTypes = {
    handleLogout: PropTypes.func.isRequired,
};

export default TopBar;
