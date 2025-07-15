import React from "react";
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
} from "chart.js"

import "./adm.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const funcionarios = [
  { codigo: "001", nome: "João Silva", cpf: "123.456.789-00", turno: "Manhã" },
  { codigo: "002", nome: "Maria Souza", cpf: "987.654.321-11", turno: "Tarde" },
  { codigo: "003", nome: "Carlos Pereira", cpf: "456.789.123-22", turno: "Noite" },
  { codigo: "004", nome: "Ana Oliveira", cpf: "321.654.987-33", turno: "Manhã" },
];



export default function TabelaFuncionarios() {
  const dataFaturamentoMensal = {
    labels: [
      "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado",
      "Domingo"
    ],
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
    labels: [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sabado",
      "Domingo",
    ],

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
      tooltip: { enable: true },
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
      <div className="card">
        <div className="card-header">
          <h2>Lista de Funcionários</h2>
        </div>
        <div className="card-body">
          <div className="table-wrapper">
            <table className="tabela-funcionarios">
              <thead>
                <tr>
                  <th>CÓDIGO</th>
                  <th>NOME</th>
                  <th>CPF</th>
                  <th>TURNO</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.map((funcionario) => (
                  <tr key={funcionario.codigo}>
                    <td>{funcionario.codigo}</td>
                    <td>{funcionario.nome}</td>
                    <td>{funcionario.cpf}</td>
                    <td>{funcionario.turno}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3  style={{ marginBottom: 16, color: "#222" }}>
          Faturamento Semanal (R$)
        </h3>
        <Line data={dataFaturamentoMensal} options={optionsFaturamentoMensal} />  
      </div>
      
      <div className="card" style={{ marginTop: 32, padding: 24 }}>
        <h3  style={{ marginBottom: 16, color: "#222" }}>
                Frequencia de Alunos semanal
        </h3>
        <Bar data={dataFrequentaSemana} options={optionsFrequentaSemana}/>
      </div>

    </div>
  );
}
