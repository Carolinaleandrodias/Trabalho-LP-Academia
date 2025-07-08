import './precos.css';

export default function precosEssencial() {
  return (
    <div className="plano-card">
        <h2 className="plano-titulo">ESSENCIAL</h2>

        <div className="plano-preco">
          <span className="plano-moeda">R$</span>
          <span className="plano-valor">500</span>
          <span className="plano-centavos">,00</span>
        </div>

        <div className="plano-descricao-container">
          <div className="plano-descricao-header">DESCRIÇÃO</div>
          <ul className="plano-lista">
            <li>Plano de treinos estruturados</li>
            <li>Consultoria quinzenal</li>
            <li>Consultoria online</li>
          </ul>
        </div>
    </div>
  );
}