// src/components/ModalTreino.js
import React, { useEffect, useState } from "react";
import "./modalTreino.css";

export default function ModalTreino({ aluno, aberto, fechar }) {

  const URL = import.meta.env.VITE_APP_BACKEND_URL;
  const [treinos, setTreinos] = useState({
    Segunda: "",
    Terça: "",
    Quarta: "",
    Quinta: "",
    Sexta: "",
  });
  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

  useEffect(() => {
    if (aberto && aluno && aluno.cpf) {
      fetch(URL + "alunos/treino?cpf=" + aluno.cpf)
        .then((res) => {
          if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          const treino = {
            Segunda: data.segunda,
            Terça: data.terca,
            Quarta: data.quarta,
            Quinta: data.quinta,
            Sexta: data.sexta,
          };
          console.log(treino)
          setTreinos(treino);
        })
        .catch((error) => {
          console.error("Erro ao carregar o treino:", error);
        });
    }else {
      setTreinos({ Segunda: "", Terça: "", Quarta: "", Quinta: "", Sexta: "" });
    }


  }, [aberto, aluno, URL]);

  if (!aberto || !aluno) return null;

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
