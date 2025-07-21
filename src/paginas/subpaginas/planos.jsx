import './planos.css';
import fundo from '../../assets/4.jpg';
import Basico from '../../componentes/precos/precosBasico';
import Essencial from '../../componentes/precos/precosEssencial';
import Premium from '../../componentes/precos/precosPremium';

export default function Planos() {
  return (
    <div
      className="teste2"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="precos">
        <div className="item-preco">
          <Basico/>
        </div>
        <div className="item-preco">
          <Essencial/>
        </div>
        <div className="item-preco">
          <Premium/>
        </div>
      </div>
    </div>
  );
}