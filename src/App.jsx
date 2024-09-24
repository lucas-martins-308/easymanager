import { useState } from 'react'
import './App.css'
import TopBar from './components/TopBar/TopBar'
import Home from './components/Home/Home'

export default function App() {

  return (
    <div className='app-container'>
        <TopBar/>
        <Home/>
    </div>
  )
}