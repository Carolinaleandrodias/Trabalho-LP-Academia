import './precos.css';

export default function precosBasico() {
  return (
    <div className="plano-card">
        <h2 className="plano-titulo">BÁSICO</h2>

        <div className="plano-preco">
          <span className="plano-moeda">R$</span>
          <span className="plano-valor">300</span>
          <span className="plano-centavos">,00</span>
        </div>

        <div className="plano-descricao-container">
          <div className="plano-descricao-header">DESCRIÇÃO</div>
          <ul className="plano-lista">
            <li>Plano de treinos estruturados</li>
            <li>Suporte online</li>
          </ul>
        </div>
    </div>
  );
}