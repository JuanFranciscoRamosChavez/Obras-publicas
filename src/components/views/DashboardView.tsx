import { 
  FolderKanban, 
  DollarSign, 
  Users, 
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  Clock
} from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { ProjectsStatusChart } from '@/components/dashboard/ProjectsStatusChart';
import { BudgetChart } from '@/components/dashboard/BudgetChart';
import { CriticalProjectsTable } from '@/components/dashboard/CriticalProjectsTable';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { mockProjects, formatCurrency, formatNumber } from '@/lib/mockData';

export function DashboardView() {
  const totalProjects = mockProjects.length;
  const totalBudget = mockProjects.reduce((sum, p) => sum + p.presupuesto, 0);
  const totalExecuted = mockProjects.reduce((sum, p) => sum + p.ejecutado, 0);
  const totalBeneficiaries = mockProjects.reduce((sum, p) => sum + p.beneficiarios, 0);
  const projectsAtRisk = mockProjects.filter(p => p.status === 'en_riesgo' || p.status === 'retrasado').length;
  const executionRate = ((totalExecuted / totalBudget) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Panel Ejecutivo
        </h1>
        <p className="text-muted-foreground mt-1">
          Vista consolidada del Plan Operativo Anual 2024
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total de Proyectos"
          value={totalProjects}
          subtitle="En cartera activa"
          icon={FolderKanban}
          trend={{ value: 12, label: 'vs año anterior' }}
          variant="default"
          delay={0}
        />
        <KPICard
          title="Presupuesto Total"
          value={formatCurrency(totalBudget)}
          subtitle={`${executionRate}% ejecutado`}
          icon={DollarSign}
          trend={{ value: 8, label: 'de incremento' }}
          variant="success"
          delay={100}
        />
        <KPICard
          title="Beneficiarios"
          value={formatNumber(totalBeneficiaries)}
          subtitle="Ciudadanos impactados"
          icon={Users}
          trend={{ value: 15, label: 'vs meta inicial' }}
          variant="info"
          delay={200}
        />
        <KPICard
          title="Proyectos en Riesgo"
          value={projectsAtRisk}
          subtitle="Requieren atención"
          icon={AlertTriangle}
          trend={{ value: -25, label: 'vs mes pasado' }}
          variant="danger"
          delay={300}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-5 shadow-sm border border-border flex items-center gap-4 animate-slide-up" style={{ animationDelay: '150ms' }}>
          <div className="p-3 rounded-lg bg-success/10">
            <CheckCircle className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-2xl font-display font-bold">{mockProjects.filter(p => p.status === 'completado').length}</p>
            <p className="text-sm text-muted-foreground">Proyectos Completados</p>
          </div>
        </div>
        <div className="bg-card rounded-xl p-5 shadow-sm border border-border flex items-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="p-3 rounded-lg bg-info/10">
            <Clock className="h-6 w-6 text-info" />
          </div>
          <div>
            <p className="text-2xl font-display font-bold">{mockProjects.filter(p => p.status === 'en_ejecucion').length}</p>
            <p className="text-sm text-muted-foreground">En Ejecución</p>
          </div>
        </div>
        <div className="bg-card rounded-xl p-5 shadow-sm border border-border flex items-center gap-4 animate-slide-up" style={{ animationDelay: '250ms' }}>
          <div className="p-3 rounded-lg bg-primary/10">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-display font-bold">{Math.round(mockProjects.reduce((sum, p) => sum + p.avance, 0) / mockProjects.length)}%</p>
            <p className="text-sm text-muted-foreground">Avance Promedio</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectsStatusChart />
        <BudgetChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CriticalProjectsTable />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}
