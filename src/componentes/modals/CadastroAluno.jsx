import React from "react";
import "./CadastroAluno.css";

export default function ModalCadastroAluno({
  aberto,
  fechar,
  formDataAluno,
  setFormDataAluno,
  handleSubmit
}) {
  if (!aberto) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormDataAluno({ ...formDataAluno, [name]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 style={{ marginBottom: 16 }}>Cadastrar Aluno</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center",
  justifyContent: "center"}}>
          <input
            type="text"
            name="cpf"
            placeholder="CPF (somente números)"
            value={formDataAluno.cpf}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setFormDataAluno({ ...formDataAluno, cpf: value });
            }}
            maxLength="11"
            pattern="\d{11}"
            title="Digite exatamente 11 números"
            required
          />
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formDataAluno.nome}
            onChange={handleChange}
            pattern="[A-Za-zÀ-ÿ\s]+"
            title="Apenas letras"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formDataAluno.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="idade"
            placeholder="Idade"
            value={formDataAluno.idade}
            onChange={handleChange}
            required
          />
          <select
            name="plano"
            value={formDataAluno.plano}
            onChange={handleChange}
            required
          >
            <option className="selecao" value="">Selecione o plano</option>
            <option value="Basico">Básico</option>
            <option value="Essencial">Essencial</option>
            <option value="Premium">Premium</option>
          </select>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="botao-salvar" type="submit">Adicionar</button>
            <button type="button" onClick={fechar} className="botao-cancelar">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
