/* ⚛ REACT */
import React, { useContext } from "react";

/* 📦 LIBS */
import SVG from 'react-inlinesvg';

/* 🧩 COMPONENTS */
import AtivosChart from '../../../componentes/AlunosAtivos';
import IdadeHistograma from '../../../componentes/FaixaEtaria';

/* 🎨 STYLES */
import { Container } from "./styles";

/* 📁 ASSETS */
import { menuIcon } from "../../../assets/icons";


import { MenuContext } from "../../../context/MenuContext";

const Inicio = () => {
  const { menu, switchMenu } = useContext(MenuContext);

  return (
    <Container $isMenuOpen={menu.isOpen}>
      <SVG src={menuIcon} className="menu-icon" onClick={() => switchMenu()}/>
      <div className='dash'>
        <h1>DASHBOARD</h1>
        <div className="graficos">
          <div className="grafico-item">
            <div className="grafico-titulo">Clientes ativos</div>
            <AtivosChart />
          </div>
          <div className="grafico-item">
            <div className="grafico-titulo">Faixa Etária</div>
            <IdadeHistograma />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Inicio;
