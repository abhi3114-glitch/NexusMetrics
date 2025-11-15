import { useState, useEffect } from 'react';
import { UserRole } from '@/types';
import RoleSelector from '@/components/RoleSelector';
import AlertPanel from '@/components/AlertPanel';
import MetricsCharts from '@/components/MetricsCharts';
import { generatePRMetrics, generateBuildMetrics, generateCodeChurnMetrics, generateAlerts, generateDeveloperStats } from '@/lib/mockData';
import { Activity, TrendingUp, GitPullRequest, Code2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Dashboard() {
  const [role, setRole] = useState<UserRole>('developer');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const prMetrics = generatePRMetrics();
  const buildMetrics = generateBuildMetrics();
  const codeChurnMetrics = generateCodeChurnMetrics();
  const alerts = generateAlerts();
  const developerStats = generateDeveloperStats();

  const latestPR = prMetrics[prMetrics.length - 1];
  const latestBuild = buildMetrics[buildMetrics.length - 1];
  const latestChurn = codeChurnMetrics[codeChurnMetrics.length - 1];
  const buildSuccessRate = latestBuild ? ((latestBuild.successfulBuilds / latestBuild.totalBuilds) * 100).toFixed(1) : 0;

  const roleDescriptions = {
    developer: 'Monitor your personal metrics, track team performance, and stay informed about project health.',
    'team-lead': 'Oversee team productivity, identify bottlenecks, and drive engineering excellence across your squad.',
    manager: 'Strategic insights across all teams. Make data-driven decisions to optimize organizational performance.',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-slate-950/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50 animate-pulse-slow" />
                <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
                  <Activity className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  NexusMetrics
                </h1>
                <p className="text-sm text-slate-400 font-medium">Engineering Intelligence Platform</p>
              </div>
            </div>
            <RoleSelector role={role} onRoleChange={setRole} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Live Dashboard</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Welcome back, {role === 'developer' ? 'Developer' : role === 'team-lead' ? 'Team Lead' : 'Engineering Manager'}
              </h2>
              <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">
                {roleDescriptions[role]}
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-4 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
            <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl metric-card-hover group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <GitPullRequest className="h-6 w-6 text-blue-400" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-400">PR Velocity</p>
                  <p className="text-3xl font-bold text-white">{latestPR?.prsMerged || 0}</p>
                  <p className="text-xs text-slate-500">Merged today</p>
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-xl metric-card-hover group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="text-xs font-semibold text-green-400 px-2 py-1 rounded-full bg-green-500/20">+2.3%</div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-400">Build Success</p>
                  <p className="text-3xl font-bold text-white">{buildSuccessRate}%</p>
                  <p className="text-xs text-slate-500">Last 24 hours</p>
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-xl metric-card-hover group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Code2 className="h-6 w-6 text-purple-400" />
                  </div>
                  <Activity className="h-5 w-5 text-purple-400 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-400">Code Commits</p>
                  <p className="text-3xl font-bold text-white">{latestChurn?.commits || 0}</p>
                  <p className="text-xs text-slate-500">Active today</p>
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-xl metric-card-hover group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-orange-400" />
                  </div>
                  <div className="text-xs font-semibold text-orange-400 px-2 py-1 rounded-full bg-orange-500/20">-15%</div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-400">Review Time</p>
                  <p className="text-3xl font-bold text-white">{latestPR?.avgReviewTime || 0}h</p>
                  <p className="text-xs text-slate-500">Current average</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Alerts */}
          <div className={mounted ? 'animate-scale-in' : 'opacity-0'} style={{ animationDelay: '0.2s' }}>
            <AlertPanel alerts={alerts} />
          </div>

          {/* Metrics Charts */}
          <div className={mounted ? 'animate-scale-in' : 'opacity-0'} style={{ animationDelay: '0.3s' }}>
            <MetricsCharts
              prMetrics={prMetrics}
              buildMetrics={buildMetrics}
              codeChurnMetrics={codeChurnMetrics}
              developerStats={developerStats}
              role={role}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-xl bg-slate-950/80 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">NexusMetrics</p>
                <p className="text-xs text-slate-400">Engineering Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-400">
              <span>FastAPI + PostgreSQL + React</span>
              <span>•</span>
              <span>Real-time Analytics</span>
              <span>•</span>
              <span>Built with ❤️</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}