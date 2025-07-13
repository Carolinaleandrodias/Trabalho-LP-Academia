import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Ativos', value: 63.2 },
  { name: 'Inativos', value: 36.8 },
];

const COLORS = ['#6ce5e8', '#2d8bba'];

export default function AtivosChart() {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
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
