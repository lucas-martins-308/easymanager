import React, { useState, useEffect } from 'react';
import Topbar from './components/TopBar/TopBar';
import Map from './components/Map/Map';
import Reservations from './components/Reservations/Reservations';
import Stock from './components/Stock/Stock';
import Financial from './components/Financial/Financial';
import Admin from './components/Admin/Admin';
import Login from './components/auth/Login';
import usersData from './data/users.json';
import './app.css';

function App() {
  const [currentPage, setCurrentPage] = useState('map');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Carregar dados iniciais e checar autenticação
  useEffect(() => {
    // Carrega usuários no localStorage se ainda não estiverem lá
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(usersData));
    }

    // Verifica se há um usuário logado no localStorage
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsAuthenticated(true);
    }
  }, []);

  // Função para atualizar o estado de autenticação após o login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className='app-container'>
      {isAuthenticated ? (
        <>
          <Topbar setCurrentPage={setCurrentPage} />
          <main>
            {currentPage === 'map' && <Map />}
            {currentPage === 'reservations' && <Reservations />}
            {currentPage === 'stock' && <Stock />}
            {currentPage === 'financial' && <Financial />}
            {currentPage === 'admin' && <Admin />}
          </main>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
