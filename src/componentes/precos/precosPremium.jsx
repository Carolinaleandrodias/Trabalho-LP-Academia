import './precos.css';

export default function precosPremium() {
  return (
    <div className="plano-card">
        <h2 className="plano-titulo">PREMIUM</h2>

        <div className="plano-preco">
          <span className="plano-moeda">R$</span>
          <span className="plano-valor">800</span>
          <span className="plano-centavos">,00</span>
        </div>

        <div className="plano-descricao-container">
          <div className="plano-descricao-header">DESCRIÇÃO</div>
          <ul className="plano-lista">
            <li>Treinos 100% personalizados</li>
            <li>Acompanhamento semanal</li>
            <li>Suporte VIP</li>
          </ul>
        </div>
    </div>
  );
}