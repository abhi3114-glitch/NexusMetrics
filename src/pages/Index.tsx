import { useState } from 'react';
import { UserRole } from '@/types';
import RoleSelector from '@/components/RoleSelector';
import AlertPanel from '@/components/AlertPanel';
import MetricsCharts from '@/components/MetricsCharts';
import { generatePRMetrics, generateBuildMetrics, generateCodeChurnMetrics, generateAlerts, generateDeveloperStats } from '@/lib/mockData';
import { Activity } from 'lucide-react';

export default function Dashboard() {
  const [role, setRole] = useState<UserRole>('developer');

  const prMetrics = generatePRMetrics();
  const buildMetrics = generateBuildMetrics();
  const codeChurnMetrics = generateCodeChurnMetrics();
  const alerts = generateAlerts();
  const developerStats = generateDeveloperStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  NexusMetrics
                </h1>
                <p className="text-sm text-muted-foreground">Developer Analytics Platform</p>
              </div>
            </div>
            <RoleSelector role={role} onRoleChange={setRole} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Welcome Message */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-2">
              Welcome, {role === 'developer' ? 'Developer' : role === 'team-lead' ? 'Team Lead' : 'Manager'}!
            </h2>
            <p className="text-muted-foreground">
              {role === 'developer' && 'Track your personal metrics and team performance.'}
              {role === 'team-lead' && 'Monitor your team\'s productivity and identify bottlenecks.'}
              {role === 'manager' && 'Get comprehensive insights across all teams and projects.'}
            </p>
          </div>

          {/* Alerts */}
          <AlertPanel alerts={alerts} />

          {/* Metrics Charts */}
          <MetricsCharts
            prMetrics={prMetrics}
            buildMetrics={buildMetrics}
            codeChurnMetrics={codeChurnMetrics}
            developerStats={developerStats}
            role={role}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            NexusMetrics - Engineering Insights Dashboard • Built with FastAPI + PostgreSQL + React + Plotly
          </p>
        </div>
      </footer>
    </div>
  );
}