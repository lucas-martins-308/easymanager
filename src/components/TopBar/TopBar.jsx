import './index.css';
import Navbar from '../Navbar/Navbar.jsx';

function TopBar({ handleLogout }) {
    return (
        <div className="topbar">
            <Navbar handleLogout={handleLogout} />
        </div>
    );
}

export default TopBar;
