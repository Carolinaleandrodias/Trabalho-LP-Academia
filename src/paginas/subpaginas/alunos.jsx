
export default function Alunos() {

    return (
        <div>
            <table className="tabela-alunos">
                <thead>
                    <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>E-mail</th>
                    <th>Plano</th>
                    <th>Status</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>João Silva</td>
                    <td>123.456.789-00</td>
                    <td>joao@email.com</td>
                    <td>Mensal</td>
                    <td>Ativo</td>
                    <td>
                        <button>Editar</button>
                        <button>Excluir</button>
                    </td>
                    </tr>
                    {/* Outros alunos... */}
                </tbody>
            </table>
        </div>
    )
}
