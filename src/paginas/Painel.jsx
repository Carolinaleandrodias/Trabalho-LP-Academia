import React, { useState } from 'react';
import './painel.css';
import Alunos from './subpaginas/alunos'
import Inicio from './subpaginas/inicio'
import Planos from './subpaginas/planos';
import FichasDeTreino from './subpaginas/fichasDeTreino';

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
      case 'pagamentos':
        return <div><h2>Pagamentos</h2><p>Controle de pagamentos realizados</p></div>;
      case 'relatorios':
        return <div><h2>Relatórios</h2><p>Análise e relatórios detalhados</p></div>;
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
          <li className={menuAtivo === 'pagamentos' ? 'ativo' : ''} onClick={() => setMenuAtivo('pagamentos')}>Pagamentos</li>
          <li className={menuAtivo === 'relatorios' ? 'ativo' : ''} onClick={() => setMenuAtivo('relatorios')}>Relatórios</li>
        </ul>
      </nav>

      <main className="conteudo-principal">
        {renderConteudo()}
      </main>
    </div>
  );
}
