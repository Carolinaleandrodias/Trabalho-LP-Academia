/* ⚛ REACT */
import { useContext } from "react";

/* 🧩 COMPONENTS */
import Basico from '../../../componentes/precos/precosBasico';
import Essencial from '../../../componentes/precos/precosEssencial';
import Premium from '../../../componentes/precos/precosPremium';

/* 📦 LIBS */
import SVG from 'react-inlinesvg';

/* 🎨 STYLES */
import { Container } from "./styles";

/* 📁 ASSETS */
import { menuIcon } from "../../../assets/icons";
import { MenuContext } from '../../../context/MenuContext';

export default function Planos() {

  const { switchMenu } = useContext(MenuContext);

  return (
    <Container>
      <div className='teste'>
        <SVG src={menuIcon} className="menu-icon" onClick={() => switchMenu()}/>
      </div>
      <div className="precos">
        <Basico />
        <Essencial />
        <Premium />
      </div>
    </Container>
  );
}