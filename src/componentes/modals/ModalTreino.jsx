// src/components/ModalTreino.js
import React from "react";
import "./modalTreino.css";

export default function ModalTreino({ aluno, aberto, fechar }) {
  if (!aberto || !aluno) return null;

  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

  // Simulação dos treinos por dia - substitua pela API real se necessário
  const treinos = {
    Segunda: ["Supino", "Rosca Direta"],
    Terça: ["Agachamento", "Leg Press"],
    Quarta: ["Puxada Frontal", "Remada"],
    Quinta: ["Crucifixo", "Extensão de Tríceps"],
    Sexta: ["Panturrilha", "Abdominal"]
  };

  return (
    <div className="modal-overlay"> 
      <div className="modal-treino">
        <h2>Treino de {aluno.nome}</h2>

        <div className="dias-container">
          {diasSemana.map((dia) => (
            <div className="dia" key={dia}>
              <h4>{dia}</h4>
              <ul>
                {(treinos[dia] || []).map((ex, i) => (
                  <li className="ex" key={i}>{ex}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="botoes-modal">
          <button onClick={() => window.print()}>🖨️ Imprimir</button>
          <button onClick={() => alert("Editar treino em breve")}>✏️ Editar</button>
          <button onClick={() => alert("Excluir treino em breve")}>🗑️ Excluir</button>
          <button onClick={fechar}>❌ Fechar</button>
        </div>
      </div>
    </div>
  );
}
