import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './paginas/login/index.jsx';
import Cadastro from './paginas/register/cadastro.jsx';
import Inicio from './paginas/subpaginas/home/index.jsx';
import './index.css';
import Painel from './componentes/sidebar/index.jsx';
import { MenuProvider } from './context/MenuContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MenuProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/cadastro" element={<Cadastro />} />           
          <Route path="/inicio" element={<Inicio />} />    
          <Route path="/painel" element={<Painel />} />   
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  </React.StrictMode>
)
