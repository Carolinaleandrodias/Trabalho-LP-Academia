import React from "react";
import "./CadastroAluno.css";

export default function ModalCadastroAluno({
  aberto,
  fechar,
  formData,
  setFormData,
  handleSubmit
}) {
  if (!aberto) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            value={formData.cpf}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setFormData({ ...formData, cpf: value });
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
            value={formData.nome}
            onChange={handleChange}
            pattern="[A-Za-zÀ-ÿ\s]+"
            title="Apenas letras"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            name="turno"
            value={formData.turno}
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
