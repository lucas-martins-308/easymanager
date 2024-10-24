import React, { useState } from 'react';
import Topbar from './components/TopBar/TopBar';
import Map from './components/Map/Map';
import Reservations from './components/Reservations/Reservations';
import Stock from './components/Stock/Stock';
import Financial from './components/Financial/Financial';  
import Admin from './components/Admin/Admin';
import './app.css';
import { Auth0Provider } from '@auth0/auth0-react';


function App() {
  const [currentPage, setCurrentPage] = useState('map');

  return (
    <Auth0Provider
    domain="{SEU_DOMÍNIO_AUTH0}"
    clientId="{SEU_CLIENT_ID}"
    redirectUri={window.location.origin}
  >
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
    </Auth0Provider>

  );
}

export default App;