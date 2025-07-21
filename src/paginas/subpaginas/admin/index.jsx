/* ⚛ REACT */
import React, { useState, useEffect, useContext } from "react";

/* 📦 LIBS */
import SVG from 'react-inlinesvg';
import { Line, Bar } from "react-chartjs-2";
import { MdEdit, MdDelete } from 'react-icons/md';
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

/* 🧩 COMPONENTS */
import ModalCadastroFuncionario from "../../../componentes/modals/CadastroFuncionario";

/* 🎨 STYLES */
import { Container } from "./styles";

/* 📁 ASSETS */
import { menuIcon } from "../../../assets/icons";
import { MenuContext } from "../../../context/MenuContext";

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

  const { switchMenu } = useContext(MenuContext);

  const [funcionarios, setFuncionarios] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [erro, setErro] = useState(null);

  const URL = import.meta.env.VITE_APP_BACKEND_URL;

  const [modalAberto, setModalAberto] = useState(false);
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
    fetch(URL+"funcionarios")
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

    fetch(URL+"funcionarios/create", {
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

    fetch(`${URL}funcionarios/delete?id=${codigo}`, {
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
        label: "Faturamento (R$)",
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

  return(
    <Container>
      <SVG src={menuIcon} className="menu-icon" onClick={() => switchMenu()}/>
      <div className="header-tabs">
        <div className="tabs-container">
          <div className={`tab ${activeTab === 0 ? "ativa" : ""}`} onClick={() => setActiveTab(0)}>
            Faturamento
          </div>
          <div className={`tab ${activeTab === 1 ? "ativa" : ""}`} onClick={() => setActiveTab(1)}>
            Funcionários
          </div>
        </div>
        <button className="botao-cadastrar" onClick={() => setModalAberto(true)}>
          Cadastrar Funcionário
        </button>
      </div>
      
      <ModalCadastroFuncionario
        aberto={modalAberto}
        fechar={() => setModalAberto(false)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />

      {activeTab === 0 ?
        <div className="aba">
            <div className="card">
                <h2>Faturamento Semanal (R$)</h2>
              <div className="chart-wrapper">
                <Line
                  data={dataFaturamentoMensal}
                  options={{
                    ...optionsFaturamentoMensal,
                    maintainAspectRatio: false,      
                    }}
                    />
              </div>
            </div>
          </div>
      : 
      <div className="aba">
        <div className="card">
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
                  <th style={{ width: 'clamp(60px, 8vw, 100px)' }}>AÇÕES</th>
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
                  <button className="buttonIcon" onClick={() => alert("Função de edição ainda não implementada")}>
                    <MdEdit size={18} color="#2980b9" />
                  </button>
                  <button className="buttonIcon" onClick={() => handleDelete(f.codigo)}>
                    <MdDelete size={18} color="#c0392b" />
                  </button>
                </td>
              </tr>))
            )}
            </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
      }

      </Container>
      //<div className="slider-container">
      //   <div
      //     className="slider"
      //     style={{ transform: `translateX(${abaAtiva === "faturamento" ? "0%" : "-100%"})` }}
      //   >
      //     <div className="aba">
      //       <div className="card" style={{ padding: 24 }}>
      //           <h3 style={{ marginBottom: 16, color: "#222" }}>Faturamento Semanal (R$)</h3>
      //         <div className="chart-wrapper">
      //           <Line
      //             data={dataFaturamentoMensal}
      //             options={{
      //               ...optionsFaturamentoMensal,
      //               maintainAspectRatio: false,      
      //               }}
      //               />
      //         </div>
      //       </div>
      //     </div>

      //     <div className="aba">
      //       <div className="card">
      //         <div className="card-header">
      //           <h2>Lista de Funcionários</h2>
      //         </div>
      //         <div className="card-body">
      //           {erro && <p className="erro">{erro}</p>}
      //           <div className="table-wrapper">
      //             <table className="tabela-funcionarios">
      //               <thead>
      //                 <tr>
      //                   <th>CÓDIGO</th>
      //                   <th>NOME</th>
      //                   <th>CPF</th>
      //                   <th>TURNO</th>
      //                   <th style={{ width: 'clamp(60px, 8vw, 100px)' }}>AÇÕES</th>
      //                 </tr>
      //               </thead>
      //               <tbody>
      //                 {funcionarios.length === 0 ? (
      //                   <tr><td colSpan="5">Nenhum funcionário encontrado.</td></tr>
      //                 ) : (
      //                   funcionarios.map((f) => (
      //                     <tr key={f.codigo}>
      //                       <td>{f.codigo}</td>
      //                       <td>{f.nome}</td>
      //                       <td>{f.cpf}</td>
      //                       <td>{f.turno}</td>
      //                       <td>
      //                         <button className="buttonIcon" onClick={() => alert("Função de edição ainda não implementada")}>
      //                           <MdEdit size={18} color="#2980b9" />
      //                         </button>
      //                         <button className="buttonIcon" onClick={() => handleDelete(f.codigo)}>
      //                           <MdDelete size={18} color="#c0392b" />
      //                         </button>
      //                       </td>
      //                     </tr>
      //                   ))
      //                 )}
      //               </tbody>
      //             </table>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
  );
}


