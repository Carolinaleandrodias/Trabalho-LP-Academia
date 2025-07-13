import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { faixa: '0 a 15', alunos: 253 },
  { faixa: '16 a 30', alunos: 122 },
  { faixa: '31 a 45', alunos: 157 },
  { faixa: '46 a 60', alunos: 160 },
  { faixa: '60+', alunos: 29 },
];

export default function IdadeHistograma() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="faixa" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="alunos" fill="#2d8bba" barSize={30}/>
      </BarChart>
    </ResponsiveContainer>
  );
}
