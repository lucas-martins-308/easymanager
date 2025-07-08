import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Topbar from "./components/TopBar/TopBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { AuthProvider, useAuth } from './pages/auth/AuthContext.jsx';

function AppContent() {
    const { isAuthenticated, handleLogout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="app-container">
            <Topbar handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
            <div className="main-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
