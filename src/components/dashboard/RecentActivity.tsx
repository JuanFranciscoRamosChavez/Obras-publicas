import { CheckCircle, AlertTriangle, Clock, FileText, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    type: 'completion',
    title: 'Centro Cultural completado',
    description: 'El proyecto alcanzó el 100% de avance',
    time: 'Hace 2 horas',
    icon: CheckCircle,
    color: 'text-success bg-success/10',
  },
  {
    id: 2,
    type: 'risk',
    title: 'Alerta de riesgo detectada',
    description: 'Parque Ecológico presenta retrasos críticos',
    time: 'Hace 4 horas',
    icon: AlertTriangle,
    color: 'text-danger bg-danger/10',
  },
  {
    id: 3,
    type: 'update',
    title: 'Actualización de presupuesto',
    description: 'Se aprobó incremento para pavimentación',
    time: 'Hace 6 horas',
    icon: FileText,
    color: 'text-info bg-info/10',
  },
  {
    id: 4,
    type: 'milestone',
    title: 'Hito alcanzado',
    description: 'Digitalización: 45 trámites activos',
    time: 'Ayer',
    icon: Clock,
    color: 'text-primary bg-primary/10',
  },
  {
    id: 5,
    type: 'beneficiaries',
    title: 'Nuevos beneficiarios',
    description: '+5,000 ciudadanos con agua potable',
    time: 'Ayer',
    icon: Users,
    color: 'text-success bg-success/10',
  },
];

export function RecentActivity() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-slide-up" style={{ animationDelay: '400ms' }}>
      <h3 className="font-display font-semibold text-lg mb-4">Actividad Reciente</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div 
              key={activity.id} 
              className="flex items-start gap-3 animate-fade-in"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <div className={cn("p-2 rounded-lg shrink-0", activity.color)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
