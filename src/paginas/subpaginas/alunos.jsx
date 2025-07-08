import './alunos.css'
import { useState, useEffect } from 'react';

export default function Alunos() {
    const [alunos, setAlunos] = useState([
        { nome: "João Silva", cpf: "123.456.789-00", email: "joao@email.com", plano: "Mensal", status: "Ativo" },
        { nome: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com", plano: "Trimestral", status: "Ativo" },
        { nome: "Carlos Lima", cpf: "111.222.333-44", email: "carlos@email.com", plano: "Anual", status: "Inativo" },
        { nome: "Ana Paula", cpf: "222.333.444-55", email: "ana@email.com", plano: "Mensal", status: "Ativo" },
        { nome: "Pedro Henrique", cpf: "333.444.555-66", email: "pedro@email.com", plano: "Trimestral", status: "Inativo" },
        { nome: "Luciana Alves", cpf: "444.555.666-77", email: "luciana@email.com", plano: "Anual", status: "Ativo" },
        { nome: "Marcos Dias", cpf: "555.666.777-88", email: "marcos@email.com", plano: "Mensal", status: "Ativo" },
        { nome: "Juliana Costa", cpf: "666.777.888-99", email: "juliana@email.com", plano: "Trimestral", status: "Inativo" },
        { nome: "Felipe Rocha", cpf: "777.888.999-00", email: "felipe@email.com", plano: "Anual", status: "Ativo" },
        { nome: "Renata Martins", cpf: "888.999.000-11", email: "renata@email.com", plano: "Mensal", status: "Ativo" },
        { nome: "Bruno Teixeira", cpf: "999.000.111-22", email: "bruno@email.com", plano: "Trimestral", status: "Inativo" },
        { nome: "Larissa Melo", cpf: "000.111.222-33", email: "larissa@email.com", plano: "Anual", status: "Ativo" },
        { nome: "Thiago Fernandes", cpf: "111.222.333-44", email: "thiago@email.com", plano: "Mensal", status: "Ativo" },
        { nome: "Patrícia Ramos", cpf: "222.333.444-55", email: "patricia@email.com", plano: "Trimestral", status: "Inativo" },
        { nome: "Rafael Castro", cpf: "333.444.555-66", email: "rafael@email.com", plano: "Anual", status: "Ativo" },
        { nome: "Isabela Pires", cpf: "444.555.666-77", email: "isabela@email.com", plano: "Mensal", status: "Ativo" },
        { nome: "Lucas Almeida", cpf: "555.666.777-88", email: "lucas@email.com", plano: "Trimestral", status: "Inativo" },
        { nome: "Camila Duarte", cpf: "666.777.888-99", email: "camila@email.com", plano: "Anual", status: "Ativo" },
        { nome: "André Gonçalves", cpf: "777.888.999-00", email: "andre@email.com", plano: "Mensal", status: "Ativo" },
        { nome: "Fernanda Nunes", cpf: "888.999.000-11", email: "fernanda@email.com", plano: "Trimestral", status: "Inativo" }
    ]);

    const [ordem, setOrdem] = useState({ coluna: 'nome', direcao: 'asc' });

    useEffect(() => {
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
        const alunosOrdenados = [...alunos].sort((a, b) => {
        if (a[coluna] < b[coluna]) return novaDirecao === 'asc' ? -1 : 1;
        if (a[coluna] > b[coluna]) return novaDirecao === 'asc' ? 1 : -1;
        return 0;
        });
        setOrdem({ coluna, direcao: novaDirecao });
        setAlunos(alunosOrdenados);
    };

    const seta = (coluna) => {
        if (ordem.coluna === coluna) {
        return ordem.direcao === 'asc' ? '▲' : '▼';
        }
        return '⬍';
    };

    const [filtro, setFiltro] = useState('');

    const alunosFiltrados = alunos.filter((aluno) =>
      aluno.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
      <div>
        <div className="header">
          <h2>Alunos MoveOn</h2>
          <div className="input-container">
            <input
              type="text"
              placeholder="Pesquisar aluno..."
              className="input-pesquisa"
              onChange={(e) => setFiltro(e.target.value)}
            />
            <i className="fas fa-search icon-search"></i>
          </div>
        </div>

        <table className="tabela-alunos">
          <thead>
            <tr>
              <th onClick={() => ordenarPor('nome')}>Nome {seta('nome')}</th>
              <th>CPF</th>
              <th>E-mail</th>
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
                <td>
                  <button>Editar</button>
                  <button>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}
