import './alunos.css'
import { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import fundo from '../../assets/4.jpg';

export default function Alunos() {
  const URL = "http://localhost:8080/api/";
  const [alunos, setAlunos] = useState([
      { nome: "João Silva", cpf: "123.456.789-00", email: "joao@email.com", plano: "Mensal", status: "Ativo" },
  ]);

  const [ordem, setOrdem] = useState({ coluna: 'nome', direcao: 'asc' });
  const [filtro, setFiltro] = useState('');

  const buscarAlunos = () => {
    fetch(URL+"alunos")
    .then((res) => {
      if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
      return res.json();
    })
      .then((data) => {
        const ativos = data.map((a) => ({
          cpf: a.cpf,
          nome: a.nome,
          email: a.email,
          idade : a.idade,
          plano: a.plano,
          status: a.ativo === true ? "Ativo" : "Inativo"
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
        buscarAlunos();
      })
      .catch((err) => {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir Aluno");
      });
      alert("Aluno excluído com sucesso!");
  };


  return (
    <div className="alunos-container" style={{ backgroundImage: `url(${fundo})` }}>
      <div className="header">
        <h2>Alunos</h2>
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

      <div className="tabela-wrapper">
        <table className="tabela-alunos">
          <thead>
            <tr>
              <th onClick={() => ordenarPor('nome')}>Nome {seta('nome')}</th>
              <th>CPF</th>
              <th>Email</th>
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
                <td>{aluno.plano}</td>
                <td>{aluno.status}</td>
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
    </div>
  );
}
