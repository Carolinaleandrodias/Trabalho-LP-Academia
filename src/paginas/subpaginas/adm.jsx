import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./adm.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TabelaFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [erro, setErro] = useState(null);

  const [formData, setFormData] = useState({
    codigo: "",
    nome: "",
    cpf: "",
    turno: "",
  });

  useEffect(() => {
    buscarFuncionarios();
  }, []);

  const buscarFuncionarios = () => {
    fetch("http://localhost:8080/api/funcionarios")
      .then((res) => {
        if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const adaptados = data.map((f) => ({
          codigo: String(f.codigo),
          nome: f.nome,
          cpf: f.cpf,
          turno: f.turno,
        }));
        setFuncionarios(adaptados);
      })
      .catch((error) => {
        console.error("Erro ao buscar funcionários:", error);
        setErro("Erro ao carregar dados dos funcionários.");
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validações
    const codigoValido = /^\d+$/.test(formData.codigo);
    const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(formData.nome);
    const cpfValido = /^\d{11}$/.test(formData.cpf);
    const turnoValido = formData.turno !== "";

    if (!codigoValido) return alert("Código deve conter apenas números.");
    if (!nomeValido) return alert("Nome deve conter apenas letras.");
    if (!cpfValido) return alert("CPF deve conter exatamente 11 números.");
    if (!turnoValido) return alert("Selecione um turno.");

    fetch("http://localhost:8080/api/funcionarios/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        codigo: parseInt(formData.codigo),
        nome: formData.nome,
        cpf: formData.cpf,
        turno: formData.turno,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar funcionário");
        return res.json();
      })
      .then(() => {
        setFormData({ codigo: "", nome: "", cpf: "", turno: "" });
        buscarFuncionarios();
      })
      .catch((err) => {
        console.error("Erro ao cadastrar:", err);
        alert("Erro ao cadastrar funcionário");
      });
  };

  const handleDelete = (codigo) => {
    if (!window.confirm("Deseja realmente excluir este funcionário?")) return;

    fetch(`http://localhost:8080/api/funcionarios/delete?id=${codigo}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao excluir");
        buscarFuncionarios();
      })
      .catch((err) => {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir funcionário");
      });
  };

  // Gráficos
  const dataFaturamentoMensal = {
    labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
    datasets: [
      {
        label: "Faturamento Semanal (R$)",
        data: [100, 250, 200, 170, 150, 220, 190],
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.3)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const optionsFaturamentoMensal = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `R$ ${value.toLocaleString()}`,
        },
      },
    },
  };

  const dataFrequentaSemana = {
    labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
    datasets: [
      {
        label: "Frequentadores",
        data: [15, 35, 24, 20, 25, 30, 23],
        backgroundColor: [
          "#1976d2",
          "#42a5f5",
          "#64b5f6",
          "#90caf9",
          "#bbdefb",
        ],
        borderRadius: 6,
        maxBarThickness: 50,
      },
    ],
  };

  const optionsFrequentaSemana = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="container">
      {/* Gráficos */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ marginBottom: 16, color: "#222" }}>
          Faturamento Semanal (R$)
        </h3>
        <Line data={dataFaturamentoMensal} options={optionsFaturamentoMensal} />
      </div>

      <div className="card" style={{ marginTop: 32, padding: 24 }}>
        <h3 style={{ marginBottom: 16, color: "#222" }}>
          Frequência de Alunos Semanal
        </h3>
        <Bar data={dataFrequentaSemana} options={optionsFrequentaSemana} />
      </div>

      {/* Formulário */}
      <div className="card" style={{ marginTop: 32, padding: 24 }}>
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
          <button type="submit">Cadastrar</button>
        </form>
      </div>

      {/* Tabela */}
      <div className="card" style={{ marginTop: 32 }}>
        <div className="card-header">
          <h2>Lista de Funcionários</h2>
        </div>
        <div className="card-body">
          {erro && <p className="erro">{erro}</p>}
          <div className="table-wrapper">
            <table className="tabela-funcionarios">
              <thead>
                <tr>
                  <th>CÓDIGO</th>
                  <th>NOME</th>
                  <th>CPF</th>
                  <th>TURNO</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.length === 0 ? (
                  <tr>
                    <td colSpan="5">Nenhum funcionário encontrado.</td>
                  </tr>
                ) : (
                  funcionarios.map((f) => (
                    <tr key={f.codigo}>
                      <td>{f.codigo}</td>
                      <td>{f.nome}</td>
                      <td>{f.cpf}</td>
                      <td>{f.turno}</td>
                      <td>
                        <button onClick={() => alert("Função de edição ainda não implementada")}>✏️</button>
                        <button onClick={() => handleDelete(f.codigo)}>🗑️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
