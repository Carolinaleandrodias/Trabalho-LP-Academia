import './alunos.css'
import { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import fundo from '../../assets/4.jpg';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [ordem, setOrdem] = useState({ coluna: 'nome', direcao: 'asc' });
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/alunos')
      .then(res => res.json())
      .then(data => {
        // Adapta os dados do backend para o formato esperado pela tabela
        const adaptados = data.map(a => ({
          nome: a.nome,
          cpf: a.cpf,
          email: a.email,
          plano: a.plano,
          status: a.ativo ? 'Ativo' : 'Inativo'
        }));
        setAlunos(adaptados);
        ordenarLista('nome', 'asc', adaptados);
      });
    // eslint-disable-next-line
  }, []);

  const ordenarLista = (coluna, direcao, lista = alunos) => {
    const listaOrdenada = [...lista].sort((a, b) => {
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
                  <button className="editar"><FaEdit /></button>
                  <button className="excluir"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}