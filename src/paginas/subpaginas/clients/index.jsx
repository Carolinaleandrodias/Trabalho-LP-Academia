/* ⚛ REACT */
import { useState, useEffect, useContext } from 'react';

/* 📦 LIBS */
import { FaSearch, FaClipboardList, FaEdit, FaTrash } from 'react-icons/fa';
import SVG from 'react-inlinesvg';

/* 🧩 COMPONENTS */
import ModalTreino from '../../../componentes/modals/ModalTreino';
import ModalCadastroAluno from '../../../componentes/modals/CadastroAluno';

/* 🎨 STYLES */
// import './alunos.css'
import { Container } from "./styles";

/* 📁 ASSETS */
import { menuIcon } from "../../../assets/icons";

import { MenuContext } from '../../../context/MenuContext';

export default function Alunos() {
  const URL = import.meta.env.VITE_APP_BACKEND_URL;

  const { switchMenu } = useContext(MenuContext);

  const [modalAberto, setModalAberto] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [alunos, setAlunos] = useState([]);

  const [ordem, setOrdem] = useState({ coluna: 'nome', direcao: 'asc' });
  const [filtro, setFiltro] = useState('');
  const [formDataAluno, setFormDataAluno] = useState({
    cpf: "",
    nome: "",
    email: "",
    idade: "",
    plano: "",
    ativo: true,
  });

  const abrirTreino = (aluno) => {
    setAlunoSelecionado(aluno);
    setModalAberto(true);
  };

  const fecharTreino = () => {
    setModalAberto(false);
    setAlunoSelecionado(null);
  };

  const buscarAlunos = () => {
    fetch(URL + "alunos")
      .then((res) => {
        if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const ativos = data.map((a) => ({
          cpf: a.cpf,
          nome: a.nome,
          email: a.email,
          idade: a.idade,
          plano: a.plano,
          ativo: a.ativo === true ? "Ativo" : "Inativo"
        }));
        setAlunos(ativos);
      })
      .catch((error) => {
        console.error("Erro ao carregar os alunos:", error);
      });

  };

  useEffect(() => {
    buscarAlunos();
    ordenarLista('nome', 'asc');
  }, []);

  const ordenarLista = (coluna, direcao) => {
    const listaOrdenada = [...alunos].sort((a, b) => {
      if (a[coluna] < b[coluna]) return direcao === 'asc' ? -1 : 1;
      if (a[coluna] > b[coluna]) return direcao === 'asc' ? 1 : -1;
      return 0;
    });
    setAlunos(listaOrdenada);
  };

  const ordenarPor = (coluna) => {
    const novaDirecao = ordem.coluna === coluna && ordem.direcao === 'asc' ? 'desc' : 'asc';
    ordenarLista(coluna, novaDirecao);
    setOrdem({ coluna, direcao: novaDirecao });
  };

  const seta = (coluna) => {
    if (ordem.coluna === coluna) return ordem.direcao === 'asc' ? '▲' : '▼';
    return '⬍';
  };

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleDelete = (cpf) => {
    if (!window.confirm("Deseja realmente excluir este aluno?")) return;

    fetch(`${URL}alunos/delete?cpf=${cpf}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao excluir");
        else
          buscarAlunos(); alert("Aluno excluído com sucesso!");
      })
      .catch((err) => {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir Aluno");
      });

  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const dadosParaEnviar = {
      ...formDataAluno,
      idade: parseInt(formDataAluno.idade, 10),
    };


    console.log(JSON.stringify(dadosParaEnviar))


    fetch(`${URL}alunos/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosParaEnviar),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar aluno");
        return res.json();
      })
      .then((data) => {
        alert("Aluno cadastrado com sucesso!", data);
        buscarAlunos();           
        setModalAberto(false);    
        setFormDataAluno({             
          cpf: "",
          nome: "",
          email: "",
          idade: "",
          plano: "",
          ativo: true,
        });
      })
      .catch((err) => {
        console.error("Erro no cadastro:", err);
        alert("Erro ao cadastrar aluno");
      });
  };


  return (
    <Container>
      <SVG src={menuIcon} className="menu-icon" onClick={() => switchMenu()} />
      <div className="header">
        <h2>Alunos</h2>

        <div className="center-container">
          <div className="input-container">
            <FaSearch className="icon-search" />
            <input
              type="text"
              placeholder="Pesquisar aluno..."
              className="input-pesquisa"
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>

        <button
          className="botao-cadastrar"
          onClick={() => setModalAberto(true)}
        >
          Cadastrar Aluno
        </button>
      </div>

      <ModalCadastroAluno
        aberto={modalAberto}
        fechar={() => setModalAberto(false)}
        formDataAluno={formDataAluno}
        setFormDataAluno={setFormDataAluno}
        handleSubmit={handleSubmit}
      />
      <ModalTreino aluno={alunoSelecionado} 
      aberto={modalAberto} 
      fechar={fecharTreino} 
      />

      <div className="tabela-wrapper">
        <table className="tabela-alunos">
          <thead>
            <tr>
              <th onClick={() => ordenarPor('nome')}>Nome {seta('nome')}</th>
              <th>CPF</th>
              <th>Email</th>
              <th onClick={() => showTreino()}>Treino</th>
              <th onClick={() => ordenarPor('plano')}>Plano {seta('plano')}</th>
              <th onClick={() => ordenarPor('status')}>Status {seta('status')}</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunosFiltrados.map((aluno, index) => (
              <tr key={index}>
                <td>{aluno.nome}</td>
                <td>{aluno.cpf}</td>
                <td>{aluno.email}</td>
                <td>
                  <button onClick={() => abrirTreino(aluno)} className="icone-treino">
                    <FaClipboardList />
                  </button>
                </td>
                <td>{aluno.plano}</td>
                <td>{aluno.ativo}</td>
                <td className="acoes">
                  <button className="editar"
                    onClick={() => alert("Função de edição ainda não implementada")}><FaEdit /></button>
                  <button className="excluir"
                    onClick={() => handleDelete(aluno.cpf)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}