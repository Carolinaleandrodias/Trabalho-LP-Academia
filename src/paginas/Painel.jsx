import React, { useState } from 'react';
import './painel.css';
import Alunos from './subpaginas/alunos'

export default function Painel() {
  const [menuAtivo, setMenuAtivo] = useState('alunos');

  const renderConteudo = () => {
    switch(menuAtivo) {
      case 'alunos':
        return <Alunos/>;
      case 'planos':
        return <div><h2>Planos</h2><p>Gerenciamento dos planos disponíveis</p></div>;
      case 'agendamentos':
        return <div><h2>Agendamentos</h2><p>Calendário e marcação de agendamentos</p></div>;
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
          <li className={menuAtivo === 'alunos' ? 'ativo' : ''} onClick={() => setMenuAtivo('alunos')}>Alunos</li>
          <li className={menuAtivo === 'planos' ? 'ativo' : ''} onClick={() => setMenuAtivo('planos')}>Planos</li>
          <li className={menuAtivo === 'agendamentos' ? 'ativo' : ''} onClick={() => setMenuAtivo('agendamentos')}>Agendamentos</li>
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
