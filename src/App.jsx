import './app.css';
import { Outlet } from 'react-router-dom';
import Topbar from "./components/TopBar/TopBar.jsx";
import { useEffect, useState } from "react";
import usersData from "./data/users.json";
import customers from "./data/customers.json";
import itensData from "./data/itens.json";
import reservations from './data/reservations.json';
import Footer from "./components/Footer/Footer.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify({ username: 'user' }));
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('currentUser');
    };

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

        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <div className='app-container'>
            {!isAuthenticated ? (
                <>
                    <Topbar handleLogin={handleLogin} />
                    <Outlet/>
                    <Footer/>
                </>
            ) : (
                <>
                    <Topbar handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>
                    <Outlet/>
                    <Footer/>
                </>            )}
        </div>
    );
}

export default App;
