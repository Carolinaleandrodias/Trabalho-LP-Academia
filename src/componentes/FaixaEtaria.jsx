import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';





export default function IdadeHistograma() {
  const URL = import.meta.env.VITE_APP_BACKEND_URL;

  const[alunos, setAlunos] = useState([]);

  useEffect(() => {
    const buscarAlunos = () => {
      fetch(URL+"alunos")
      .then((res) => {
        if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
        return res.json();
      })
        .then((data) => {
          const alunos = data.map((a) => ({
            cpf: a.cpf,
            nome: a.nome,
            email: a.email,
            idade : a.idade,
            plano: a.plano,
            ativo: a.ativo
          }));
          setAlunos(alunos);
        })
        .catch((error) => {
          console.error("Erro ao buscar os alunos:", error);
        });
    }

    buscarAlunos();

  },[]);

  function faixaEtaria(alunos, intervalos){
    const init = intervalos.reduce((acc, intervalo) => {
      acc[intervalo.faixa] = 0;
      return acc;
    }, {});

    return alunos.reduce((contadores, valor) => {
      let encontrado = false;
      for (const intervalo of intervalos){
        if (valor.idade >= intervalo.min  && valor.idade <= intervalo.max) {
          console.log(valor.nome, valor.idade)
          contadores[intervalo.faixa]++;
          console.log(contadores[intervalo.faixa])
          encontrado = true;
          break;
        }
      }
      if (!encontrado) {
        contadores.outros = (contadores.outros || 0) + 1;
      }
      return contadores;
    }, init);
  }

  const intervalos = [
    {faixa: '0 a 15', min: 0, max: 15},
    {faixa: '16 a 30', min: 16, max: 60},
    {faixa: '31 a 45', min: 31, max: 45},
    {faixa: '46 a 60', min: 46, max: 60},
    {faixa: '60 a 120', min: 60, max: 120},
  ]

  const contFaixas = faixaEtaria(alunos, intervalos);

  const data = [
  { faixa: '0 a 15', alunos: contFaixas["0 a 15"] },
  { faixa: '16 a 30', alunos: contFaixas["16 a 30"] },
  { faixa: '31 a 45', alunos: contFaixas["31 a 45"] },
  { faixa: '46 a 60', alunos: contFaixas["46 a 60"] },
  { faixa: '60+', alunos: contFaixas["60+"] },
];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 5, left: 2, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="faixa" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="alunos" fill="#2d8bba" barSize={30}/>
      </BarChart>
    </ResponsiveContainer>
  );
}