import { useState, useEffect} from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';



const COLORS = ['#6ce5e8', '#2d8bba'];

export default function AtivosChart() {
  const [ativos, setAtivos] = useState([]);
  const [inativos, setInativos] = useState([]);



  const URL = import.meta.env.VITE_APP_BACKEND_URL;



  
  useEffect(() => {
      
    const buscarAtivos = () => {
      fetch(URL+"alunos/ativos")
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
            ativo: a.ativo
          }));
          setAtivos(ativos);
        })
        .catch((error) => {
          console.error("Erro ao buscar os alunos ativos:", error);
        });
        
      };

    const buscarInativos = () => {
      fetch(URL+"alunos/inativos")
      .then((res) => {
        if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
        return res.json();
      })
        .then((data) => {
          const inativos = data.map((i) => ({
            cpf: i.cpf,
            nome: i.nome,
            email: i.email,
            idade : i.idade,
            plano: i.plano,
            ativo: i.ativo
          }));
          setInativos(inativos);
        })
        .catch((error) => {
          console.error("Erro ao buscar os alunos ativos:", error);
        });

    }
      
      buscarAtivos();
      buscarInativos();
      
  },[]);
      
  const data = [
    { name: 'Ativos', value: ativos.length},
    { name: 'Inativos', value: inativos.length},
  ];

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, value }) => `${name}: ${value}`}
        outerRadius={100}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}