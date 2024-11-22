import { useState, useEffect } from 'react';
import Topbar from './components/TopBar/TopBar';
import Map from './components/Map/Map';
import Reservations from './components/Reservations/Reservations';
import Stock from './components/Stock/Stock';
import Financial from './components/Financial/Financial';
import Admin from './components/Admin/Admin';
import Login from './components/auth/Login';
import usersData from './data/users.json';
import itensData from './data/itens.json';
import './app.css';

function App() {
  const [currentPage, setCurrentPage] = useState('map');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(usersData));
    }

    if (!localStorage.getItem('itens')) {
      localStorage.setItem('itens', JSON.stringify(itensData));
    }

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <div className='app-container'>
      {isAuthenticated ? (
        <>
          <Topbar setCurrentPage={setCurrentPage} handleLogout={handleLogout} />
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
