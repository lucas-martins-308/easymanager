import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'

export default function App() {

  const [currentPage, setCurrentPage] = useState('home');


  return (
    <div className='app-container'>
      <Topbar setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' && <Home />}
    </div>
  )
}