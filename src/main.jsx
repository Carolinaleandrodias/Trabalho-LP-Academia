import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './paginas/login.jsx'
import Inicio from './paginas/subpaginas/inicio.jsx'
import './index.css'
import Painel from './paginas/Painel'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />     
        <Route path="/inicio" element={<Inicio />} />    
        <Route path="/painel" element={<Painel />} />   
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
