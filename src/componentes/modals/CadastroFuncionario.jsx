import React from "react";
import "./CadastroFuncionario.css";

export default function ModalCadastroFuncionario({
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
        <h3 style={{ marginBottom: 16 }}>Cadastrar Funcionário</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <input
            type="text"
            name="codigo"
            placeholder="Código"
            value={formData.codigo}
            onChange={handleChange}
            inputMode="numeric"
            pattern="\d+"
            title="Apenas números"
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
          <select
            name="turno"
            value={formData.turno}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o turno</option>
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
            <option value="Noite">Noite</option>
          </select>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit">Salvar</button>
            <button type="button" onClick={fechar} className="botao-cancelar">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
