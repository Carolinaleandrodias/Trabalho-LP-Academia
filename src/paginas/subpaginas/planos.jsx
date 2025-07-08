import './planos.css';
import fundo from '../../assets/4.jpg';
import Basico from '../../componentes/precos/precosBasico';
import Essencial from '../../componentes/precos/precosEssencial';
import Premium from '../../componentes/precos/precosPremium';

export default function Planos() {
  return (
    <div
      className="container2"
      style={{
        backgroundImage: `url(${fundo})`,
      }}
    >
    <div className='precos'>
      <Basico/>
      <Essencial/>
      <Premium/>
    </div>
    </div>
  );
}