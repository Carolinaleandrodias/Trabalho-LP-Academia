/* ⚛ REACT */
import React, { useState, useContext } from 'react';

/* 📄 PAGES */
import Alunos from '../../paginas/subpaginas/clients'
import Inicio from '../../paginas/subpaginas/home'
import Planos from '../../paginas/subpaginas/plans';
import FichasDeTreino from '../../paginas/subpaginas/trainingSheet';
import Adm from '../../paginas/subpaginas/admin/index';

/* 📦 LIBS */
import SVG from 'react-inlinesvg';
import { useMediaQuery } from '@react-hook/media-query';

/* 📁 ASSETS */
import { closeIcon } from "../../assets/icons";

/* 🎨 STYLES */
import { Container } from "./styles";

import { MenuContext } from '../../context/MenuContext';

export default function Painel() {
  const [menuAtivo, setMenuAtivo] = useState('inicio');

  const { menu, switchMenu } = useContext(MenuContext);

  const isSmallScreen = useMediaQuery('(max-width: 720px)');

  const renderConteudo = () => {
    switch(menuAtivo) {
      case 'inicio':
        return <Inicio/>;
      case 'alunos':
        return <Alunos/>;
      case 'planos':
        return <Planos/>;
      // case 'fichasDeTreino':
        // return <FichasDeTreino/>;
      case 'adm':
        return <Adm/>;
      default:
        return null;
    }
  };

  return (
    <Container>
      {menu.isOpen &&
        <nav className="sidebar">
            <div className='menu-header'>
                <SVG src={closeIcon} className="close-icon" onClick={() => switchMenu()}/>
                <h1 className="logo">Meu Painel</h1>
            </div>
            <ul>
              <li className={menuAtivo === 'inicio' ? 'ativo' : ''} onClick={() => isSmallScreen ? (setMenuAtivo('inicio'), switchMenu()) : setMenuAtivo('inicio')}>Inicio</li>
              <li className={menuAtivo === 'alunos' ? 'ativo' : ''} onClick={() => isSmallScreen ? (setMenuAtivo('alunos'), switchMenu()): setMenuAtivo('alunos')}>Alunos</li>
              <li className={menuAtivo === 'planos' ? 'ativo' : ''} onClick={() => isSmallScreen ? (setMenuAtivo('planos'), switchMenu()): setMenuAtivo('planos')}>Planos</li>
              {/* <li className={menuAtivo === 'fichasDeTreino' ? 'ativo' : ''} onClick={() => setMenuAtivo('fichasDeTreino')}>Treinos</li> */}
              <li className={menuAtivo === 'adm' ? 'ativo' : ''} onClick={() => isSmallScreen ? (setMenuAtivo('adm'), switchMenu()): setMenuAtivo('adm')}>Administrativo</li>
            </ul>
        </nav>
      }
      <div className='main-content'>
        {renderConteudo()}
      </div>
    </Container>
  );
}