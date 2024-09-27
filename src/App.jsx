import React, { useState } from 'react';
import Topbar from './components/TopBar/TopBar';
import Map from './components/Map/Map';
import Reservations from './components/Reservations/Reservations';
import Stock from './components/Stock/Stock';
import Financial from './components/Financial/Financial';  
import Admin from './components/Admin/Admin';
import './app.css';

function App() {
  const [currentPage, setCurrentPage] = useState('map');

  return (
    <div className='app-container'>
      <Topbar setCurrentPage={setCurrentPage} />

      <main>
        {currentPage === 'map' && <Map />}
        {currentPage === 'reservations' && <Reservations />}
        {currentPage === 'stock' && <Stock />}
        {currentPage === 'financial' && <Financial />} 
        {currentPage === 'admin' && <Admin />}
      </main>
    </div>
  );
}

export default App;