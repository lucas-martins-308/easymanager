import './app.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Topbar from "./components/TopBar/TopBar.jsx";
import { useEffect, useState } from "react";
import usersData from "./data/users.json";
import customers from "./data/customers.json";
import itensData from "./data/itens.json";
import reservations from './data/reservations.json';
import Footer from "./components/Footer/Footer.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setIsAuthenticated(true); // Atualiza o estado de autenticação
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('currentUser');
        navigate("/"); // Redireciona para a tela inicial
    };

    useEffect(() => {
        const syncAuthState = () => {
            const currentUser = localStorage.getItem('currentUser');
            setIsAuthenticated(!!currentUser); // Define como true se houver um currentUser
        };

        syncAuthState();

        window.addEventListener('storage', syncAuthState);

        return () => {
            window.removeEventListener('storage', syncAuthState);
        };
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/map"); // Redireciona para "/map" quando o usuário estiver autenticado
        }
    }, [isAuthenticated, navigate]); // Só executa quando o estado "isAuthenticated" mudar

    useEffect(() => {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(usersData));
        }

        if (!localStorage.getItem('itens')) {
            localStorage.setItem('itens', JSON.stringify(itensData));
        }

        if (!localStorage.getItem('reservations')) {
            localStorage.setItem('reservations', JSON.stringify(reservations));
        }

        if (!localStorage.getItem('customers')) {
            localStorage.setItem('customers', JSON.stringify(customers));
        }
    }, []);

    return (
        <div className="app-container">
            <Topbar handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
            <Outlet context={{ handleLogin, isAuthenticated }} />
            <Footer />
        </div>
    );
}

export default App;
