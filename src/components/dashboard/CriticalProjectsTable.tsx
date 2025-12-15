import { mockProjects, getStatusLabel, getPriorityLabel, formatCurrency } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Clock, TrendingUp } from 'lucide-react';

export function CriticalProjectsTable() {
  const criticalProjects = mockProjects
    .filter(p => p.prioridad === 'critica' || p.prioridad === 'alta' || p.status === 'en_riesgo' || p.status === 'retrasado')
    .slice(0, 5);

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-slide-up" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg">Proyectos Críticos</h3>
        <Badge variant="danger" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Requieren atención
        </Badge>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Proyecto</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Estado</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Prioridad</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Avance</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Presupuesto</th>
            </tr>
          </thead>
          <tbody>
            {criticalProjects.map((project, index) => (
              <tr 
                key={project.id} 
                className="border-b border-border/50 hover:bg-muted/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <td className="py-3 px-2">
                  <div>
                    <p className="font-medium text-sm">{project.nombre}</p>
                    <p className="text-xs text-muted-foreground">{project.direccion}</p>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <Badge variant={project.status as any}>{getStatusLabel(project.status)}</Badge>
                </td>
                <td className="py-3 px-2">
                  <Badge variant={project.prioridad === 'critica' ? 'critical' : project.prioridad === 'alta' ? 'high' : 'medium'}>
                    {getPriorityLabel(project.prioridad)}
                  </Badge>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <Progress value={project.avance} className="w-20 h-2" />
                    <span className="text-sm font-medium">{project.avance}%</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-right">
                  <span className="text-sm font-medium">{formatCurrency(project.presupuesto)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
