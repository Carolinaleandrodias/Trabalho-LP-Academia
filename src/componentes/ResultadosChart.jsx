import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { mes: 'Jan', emagrecimento: 15, massa: 20, reducao: 12, gordura: 25, resistencia: 10 },
  { mes: 'Fev', emagrecimento: 50, massa: 18, reducao: 15, gordura: 32, resistencia: 14 },
  { mes: 'Mar', emagrecimento: 22, massa: 25, reducao: 10, gordura: 24, resistencia: 17 },
  { mes: 'Abr', emagrecimento: 30, massa: 28, reducao: 18, gordura: 18, resistencia: 20 },
  { mes: 'Mai', emagrecimento: 40, massa: 35, reducao: 22, gordura: 11, resistencia: 26 },
  { mes: 'Jun', emagrecimento: 55, massa: 30, reducao: 30, gordura: 15, resistencia: 32 },
];

export default function ResultadosChart() {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <LineChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 15 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Line type="monotone" dataKey="emagrecimento" stroke="#8884d8" />
        <Line type="monotone" dataKey="massa" stroke="#82ca9d" />
        <Line type="monotone" dataKey="reducao" stroke="#a3803c" />
        <Line type="monotone" dataKey="gordura" stroke="#ff7300" />
        <Line type="monotone" dataKey="resistencia" stroke="#0088FE" />
      </LineChart>
    </ResponsiveContainer>
  );
}
