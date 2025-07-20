import './inicio.css'
import AtivosChart from '../../componentes/AlunosAtivos'
import IdadeHistograma from '../../componentes/FaixaEtaria'

export default function Inicio() {
  return (
    <div className='teste'>
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
    </div>
  )
}
