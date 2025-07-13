import './fichasDeTreino.css';
import fundo from '../../assets/6.jpg';
import { useState } from 'react';

export default function FichasDeTreino() {
  const [cpfBusca, setCpfBusca] = useState('');

  const aluno = {
    nome: 'João da Silva',
    cpf: '123',
    inicio: '13/07/2025',
    treinos: [
      {
        letra: 'A',
        titulo: 'PEITO E TRÍCEPS',
        esquerda: [
          'Supino Reto: 4x de 8-12',
          'Supino Inclinado com Halteres: 3x de 10-12',
          'Crucifixo com Halteres: 3x de 12',
          'Crossover: 3x de 15',
        ],
        direita: [
          'Tríceps Testa: 3x de 10-12',
          'Tríceps Pulley: 3x de 12',
          'Mergulho no Banco: 3 séries até a falha',
        ],
      },
      {
        letra: 'B',
        titulo: 'COSTAS E BÍCEPS',
        esquerda: [
          'Puxada Frontal: 4x de 8-12',
          'Remada Curvada: 3x de 10-12',
          'Remada Baixa: 3x de 12',
          'Levantamento Terra: 3x de 8-10',
        ],
        direita: [
          'Rosca Direta: 3x de 10-12',
          'Rosca Martelo: 3x de 12',
          'Rosca Concentrada: 3x de 15',
        ],
      },
      {
        letra: 'C',
        titulo: 'PERNAS E ABDÔMEN',
        esquerda: [
          'Agachamento Livre: 4x de 8-12',
          'Leg Press: 3x de 10-12',
          'Extensão de Pernas: 3x de 12',
          'Flexão de Pernas: 3x de 12',
        ],
        direita: [
          'Panturrilha em Pé: 4x de 15-20',
          'Abdominal Supra no Solo: 3x de 20',
          'Abdominal Infra: 3x de 20',
        ],
      },
      {
        letra: 'D',
        titulo: 'OMBROS E TRAPÉZIO',
        esquerda: [
          'Desenvolvimento com Halteres: 4x de 8-12',
          'Elevação Lateral: 3x de 12',
          'Elevação Frontal: 3x de 12',
        ],
        direita: [
          'Crucifixo Invertido: 3x de 15',
          'Encolhimento com Barra: 4x de 12-16',
          'Face Pull: 3x de 15',
        ],
      },
    ],
  };

  const cpfValido = cpfBusca.trim() === aluno.cpf;

  return (
    <div
      className="ficha-container"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="ficha-conteudo">
        <div className="cpf-search">
          <label htmlFor="cpf">Buscar CPF:</label>
          <input
            type="text"
            id="cpf"
            placeholder="Digite o CPF do aluno"
            value={cpfBusca}
            onChange={(e) => setCpfBusca(e.target.value)}
          />
        </div>

        {cpfValido && (
          <>
            <div className="ficha-cabecalho">
              <span><strong>ALUNO:</strong> {aluno.nome}</span>
              <span><strong>INÍCIO:</strong> {aluno.inicio}</span>
            </div>

            {aluno.treinos.map((treino, idx) => (
              <div className="treino-box" key={treino.letra}>
                <div className="treino-label">TREINO {treino.letra}</div>
                <div className="treino-detalhes">
                  <h3>{treino.titulo}</h3>
                  <div className="treino-lista">
                    <ul>
                      {treino.esquerda.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                    <ul>
                      {treino.direita.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
