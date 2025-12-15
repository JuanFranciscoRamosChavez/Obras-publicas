import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockProjects, formatCurrency } from '@/lib/mockData';

export function BudgetChart() {
  const data = mockProjects.slice(0, 6).map(project => ({
    name: project.nombre.length > 20 ? project.nombre.substring(0, 20) + '...' : project.nombre,
    presupuesto: project.presupuesto / 1000000,
    ejecutado: project.ejecutado / 1000000,
  }));

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-slide-up" style={{ animationDelay: '200ms' }}>
      <h3 className="font-display font-semibold text-lg mb-4">Presupuesto vs Ejecutado (Millones MXN)</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={120} 
              tick={{ fontSize: 11 }}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-md)'
              }}
              formatter={(value: number) => [`$${value.toFixed(1)}M`, '']}
            />
            <Legend />
            <Bar 
              dataKey="presupuesto" 
              name="Presupuesto" 
              fill="hsl(var(--primary))" 
              radius={[0, 4, 4, 0]}
              className="transition-all duration-300"
            />
            <Bar 
              dataKey="ejecutado" 
              name="Ejecutado" 
              fill="hsl(var(--success))" 
              radius={[0, 4, 4, 0]}
              className="transition-all duration-300"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
