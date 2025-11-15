import { useState, useEffect } from 'react';
import { UserRole } from '@/types';
import RoleSelector from '@/components/RoleSelector';
import AlertPanel from '@/components/AlertPanel';
import MetricsCharts from '@/components/MetricsCharts';
import ParticleBackground from '@/components/ParticleBackground';
import MetricCard from '@/components/MetricCard';
import { generatePRMetrics, generateBuildMetrics, generateCodeChurnMetrics, generateAlerts, generateDeveloperStats } from '@/lib/mockData';
import { Activity, TrendingUp, GitPullRequest, Code2, AlertCircle, Sparkles, Zap } from 'lucide-react';

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />
      <ParticleBackground />
      
      {/* Liquid Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="liquid-blob absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full" />
        <div className="liquid-blob absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full" style={{ animationDelay: '5s' }} />
        <div className="liquid-blob absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full" style={{ animationDelay: '10s' }} />
      </div>

      {/* Gradient Mesh Overlay */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/50 border-b border-white/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                  <Activity className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient">
                  NexusMetrics
                </h1>
                <p className="text-sm text-purple-300/80 font-medium flex items-center gap-2">
                  <Sparkles className="h-3 w-3" />
                  Engineering Intelligence Platform
                </p>
              </div>
            </div>
            <RoleSelector role={role} onRoleChange={setRole} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 relative z-10">
        <div className="space-y-8">
          {/* Hero Section with Neumorphic Design */}
          <div className={`neuro-card rounded-3xl p-8 ${mounted ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Live Dashboard</span>
                <div className="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
                Welcome back, {role === 'developer' ? 'Developer' : role === 'team-lead' ? 'Team Lead' : 'Engineering Manager'}
                <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />
              </h2>
              <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">
                {roleDescriptions[role]}
              </p>
            </div>
          </div>

          {/* Bento Box Grid - Asymmetric Layout */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${mounted ? 'animate-slide-up-fade' : 'opacity-0'}`}>
            <MetricCard
              icon={GitPullRequest}
              title="PR Velocity"
              value={latestPR?.prsMerged || 0}
              subtitle="Merged today"
              trend={<div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full"><TrendingUp className="h-3 w-3" />+12%</div>}
              gradient="bg-gradient-to-br from-blue-600/30 to-blue-800/30"
              delay={0}
            />
            
            <MetricCard
              icon={TrendingUp}
              title="Build Success"
              value={`${buildSuccessRate}%`}
              subtitle="Last 24 hours"
              trend={<div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full"><TrendingUp className="h-3 w-3" />+2.3%</div>}
              gradient="bg-gradient-to-br from-emerald-600/30 to-emerald-800/30"
              delay={100}
            />
            
            <MetricCard
              icon={Code2}
              title="Code Commits"
              value={latestChurn?.commits || 0}
              subtitle="Active today"
              trend={<Activity className="h-4 w-4 text-purple-400 animate-pulse" />}
              gradient="bg-gradient-to-br from-purple-600/30 to-purple-800/30"
              delay={200}
            />
            
            <MetricCard
              icon={AlertCircle}
              title="Review Time"
              value={`${latestPR?.avgReviewTime || 0}h`}
              subtitle="Current average"
              trend={<div className="flex items-center gap-1 text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full">-15%</div>}
              gradient="bg-gradient-to-br from-orange-600/30 to-orange-800/30"
              delay={300}
            />
          </div>

          {/* Alerts with Enhanced Design */}
          <div className={mounted ? 'animate-scale-in' : 'opacity-0'} style={{ animationDelay: '0.4s' }}>
            <AlertPanel alerts={alerts} />
          </div>

          {/* Metrics Charts with Glassmorphism */}
          <div className={mounted ? 'animate-scale-in' : 'opacity-0'} style={{ animationDelay: '0.5s' }}>
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

      {/* Premium Footer */}
      <footer className="relative z-10 backdrop-blur-2xl bg-slate-950/50 border-t border-white/5 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">NexusMetrics</p>
                <p className="text-xs text-slate-400">Engineering Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-400" />
                FastAPI + PostgreSQL + React
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Zap className="h-3 w-3 text-yellow-400" />
                Real-time Analytics
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-pink-400" />
                Built with ❤️
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}