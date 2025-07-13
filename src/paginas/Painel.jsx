import React, { useState } from 'react';
import './painel.css';
import Alunos from './subpaginas/alunos'
import Inicio from './subpaginas/inicio'
import Planos from './subpaginas/planos';
import FichasDeTreino from './subpaginas/fichasDeTreino';
import Adm from './subpaginas/adm';

export default function Painel() {
  const [menuAtivo, setMenuAtivo] = useState('inicio');

  const renderConteudo = () => {
    switch(menuAtivo) {
      case 'inicio':
        return <Inicio/>;
      case 'alunos':
        return <Alunos/>;
      case 'planos':
        return <Planos/>;
      case 'fichasDeTreino':
        return <FichasDeTreino/>;
      case 'adm':
        return <Adm/>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h1 className="logo">Meu Painel</h1>
        <ul>
          <li className={menuAtivo === 'inicio' ? 'ativo' : ''} onClick={() => setMenuAtivo('inicio')}>Inicio</li>
          <li className={menuAtivo === 'alunos' ? 'ativo' : ''} onClick={() => setMenuAtivo('alunos')}>Alunos</li>
          <li className={menuAtivo === 'planos' ? 'ativo' : ''} onClick={() => setMenuAtivo('planos')}>Planos</li>
          <li className={menuAtivo === 'fichasDeTreino' ? 'ativo' : ''} onClick={() => setMenuAtivo('fichasDeTreino')}>Treinos</li>
          <li className={menuAtivo === 'adm' ? 'ativo' : ''} onClick={() => setMenuAtivo('adm')}>Administrativo</li>
        </ul>
      </nav>

      <main className="conteudo-principal">
        {renderConteudo()}
      </main>
    </div>
  );
}
