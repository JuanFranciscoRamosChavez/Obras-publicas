import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { mockProjects, getStatusLabel } from '@/lib/mockData';

const statusColors = {
  en_ejecucion: 'hsl(200, 85%, 50%)',
  planificado: 'hsl(220, 15%, 60%)',
  completado: 'hsl(145, 65%, 42%)',
  retrasado: 'hsl(38, 92%, 50%)',
  en_riesgo: 'hsl(0, 72%, 51%)',
};

export function ProjectsStatusChart() {
  const statusCounts = mockProjects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    name: getStatusLabel(status as any),
    value: count,
    status,
  }));

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-slide-up" style={{ animationDelay: '100ms' }}>
      <h3 className="font-display font-semibold text-lg mb-4">Estado de Proyectos</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={statusColors[entry.status as keyof typeof statusColors]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-md)'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
