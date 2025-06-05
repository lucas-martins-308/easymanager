import './app.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Topbar from "./components/TopBar/TopBar.jsx";
import { useEffect } from "react";
import customers from "./data/customers.json";
import itensData from "./data/itens.json";
import reservations from './data/reservations.json';
import Footer from "./components/Footer/Footer.jsx";
import { AuthProvider, useAuth } from './pages/auth/AuthContext.jsx';

function AppContent() {
    const { isAuthenticated, handleLogout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('itens')) {
            localStorage.setItem('itens', JSON.stringify(itensData));
        }

        if (!localStorage.getItem('reservations')) {
            localStorage.setItem('reservations', JSON.stringify(reservations));
        }

        // if (!localStorage.getItem('customers')) {
        //     localStorage.setItem('customers', JSON.stringify(customers));
        // }
    }, []);

    return (
        <div className="app-container">
            <Topbar handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
            <Outlet />
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
