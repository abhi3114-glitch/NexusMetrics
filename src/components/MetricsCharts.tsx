import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PRMetric, BuildMetric, CodeChurnMetric, DeveloperStats, UserRole } from '@/types';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, GitPullRequest, Code2, Users, Activity, Zap, Sparkles } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface MetricsChartsProps {
  prMetrics: PRMetric[];
  buildMetrics: BuildMetric[];
  codeChurnMetrics: CodeChurnMetric[];
  developerStats: DeveloperStats[];
  role: UserRole;
}

const COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444', '#10b981'];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl p-4 shadow-2xl border border-white/10">
        <p className="text-slate-300 text-xs mb-3 font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-3 text-sm mb-1">
            <div className="h-3 w-3 rounded-full shadow-lg" style={{ backgroundColor: entry.color }} />
            <span className="text-white font-semibold">{entry.name}:</span>
            <span className="text-slate-300 font-bold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function MetricsCharts({ prMetrics, buildMetrics, codeChurnMetrics, developerStats, role }: MetricsChartsProps) {
  return (
    <div className="space-y-8">
      {/* PR Velocity Chart */}
      <Card className="glass-card rounded-3xl overflow-hidden border-white/10 group hover:shadow-2xl transition-all duration-500">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <CardHeader className="relative pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl animate-pulse" />
                <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <GitPullRequest className="h-7 w-7 text-blue-400" />
                </div>
              </div>
              <div>
                <CardTitle className="text-white text-2xl font-bold">PR Velocity Trends</CardTitle>
                <CardDescription className="text-slate-400 flex items-center gap-2 mt-1">
                  <Sparkles className="h-3 w-3" />
                  Pull request activity over the last 30 days
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300 px-3 py-1.5 font-semibold">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={prMetrics} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMerged" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} 
                tickFormatter={(value) => value.slice(5)}
                stroke="#334155"
              />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} stroke="#334155" />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
                formatter={(value) => <span className="text-slate-300 text-sm font-medium">{value}</span>}
              />
              <Line 
                type="monotone" 
                dataKey="prsOpened" 
                stroke="#3b82f6" 
                name="Opened" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, fill: '#3b82f6', strokeWidth: 3, stroke: '#fff' }}
                fill="url(#colorOpened)"
              />
              <Line 
                type="monotone" 
                dataKey="prsMerged" 
                stroke="#10b981" 
                name="Merged" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, fill: '#10b981', strokeWidth: 3, stroke: '#fff' }}
                fill="url(#colorMerged)"
              />
              <Line 
                type="monotone" 
                dataKey="prsClosed" 
                stroke="#ef4444" 
                name="Closed" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Build Failures Chart */}
      <Card className="glass-card rounded-3xl overflow-hidden border-white/10 group hover:shadow-2xl transition-all duration-500">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <CardHeader className="relative pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
                <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Activity className="h-7 w-7 text-green-400" />
                </div>
              </div>
              <div>
                <CardTitle className="text-white text-2xl font-bold">CI/CD Pipeline Performance</CardTitle>
                <CardDescription className="text-slate-400 flex items-center gap-2 mt-1">
                  <Zap className="h-3 w-3" />
                  Build success and failure rates over time
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300 px-3 py-1.5 font-semibold">
              <Zap className="h-3 w-3 mr-1" />
              Healthy
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={buildMetrics} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="failGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} 
                tickFormatter={(value) => value.slice(5)}
                stroke="#334155"
              />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} stroke="#334155" />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
                formatter={(value) => <span className="text-slate-300 text-sm font-medium">{value}</span>}
              />
              <Bar 
                dataKey="successfulBuilds" 
                fill="url(#successGradient)" 
                name="Successful" 
                radius={[10, 10, 0, 0]}
                maxBarSize={60}
              />
              <Bar 
                dataKey="failedBuilds" 
                fill="url(#failGradient)" 
                name="Failed" 
                radius={[10, 10, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Code Churn Chart */}
      <Card className="glass-card rounded-3xl overflow-hidden border-white/10 group hover:shadow-2xl transition-all duration-500">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <CardHeader className="relative pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/30 rounded-2xl blur-xl animate-pulse" />
                <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Code2 className="h-7 w-7 text-purple-400" />
                </div>
              </div>
              <div>
                <CardTitle className="text-white text-2xl font-bold">Code Churn Analysis</CardTitle>
                <CardDescription className="text-slate-400 flex items-center gap-2 mt-1">
                  <Activity className="h-3 w-3 animate-pulse" />
                  Lines of code added and deleted over time
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-300 px-3 py-1.5 font-semibold">
              <Activity className="h-3 w-3 mr-1 animate-pulse" />
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={codeChurnMetrics} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="addedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="deletedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} 
                tickFormatter={(value) => value.slice(5)}
                stroke="#334155"
              />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} stroke="#334155" />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
                formatter={(value) => <span className="text-slate-300 text-sm font-medium">{value}</span>}
              />
              <Area 
                type="monotone" 
                dataKey="linesAdded" 
                stackId="1" 
                stroke="#8b5cf6" 
                fill="url(#addedGradient)" 
                name="Lines Added"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="linesDeleted" 
                stackId="1" 
                stroke="#f59e0b" 
                fill="url(#deletedGradient)" 
                name="Lines Deleted"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Team Performance Table - Only for Team Lead and Manager */}
      {(role === 'team-lead' || role === 'manager') && (
        <Card className="glass-card rounded-3xl overflow-hidden border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl" />
          <CardHeader className="relative pb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/30 rounded-2xl blur-xl animate-pulse" />
                <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-blue-500/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Users className="h-7 w-7 text-indigo-400" />
                </div>
              </div>
              <div>
                <CardTitle className="text-white text-2xl font-bold">Team Performance Overview</CardTitle>
                <CardDescription className="text-slate-400 flex items-center gap-2 mt-1">
                  <Sparkles className="h-3 w-3" />
                  Individual developer metrics and statistics
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-slate-800/30">
                    <TableHead className="text-slate-300 font-bold">Developer</TableHead>
                    <TableHead className="text-slate-300 font-bold">Team</TableHead>
                    <TableHead className="text-right text-slate-300 font-bold">PR Velocity</TableHead>
                    <TableHead className="text-right text-slate-300 font-bold">Build Success</TableHead>
                    <TableHead className="text-right text-slate-300 font-bold">Code Churn</TableHead>
                    <TableHead className="text-right text-slate-300 font-bold">Active Issues</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {developerStats.map((stat, index) => (
                    <TableRow 
                      key={stat.developer.id} 
                      className="border-white/10 hover:bg-slate-800/30 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-11 w-11 border-2 border-white/10 shadow-lg">
                            <AvatarFallback className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-sm">
                              {stat.developer.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-white font-semibold">{stat.developer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-slate-800/50 border-white/10 text-slate-300 font-medium">
                          {stat.developer.team}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-white font-bold text-lg">{stat.prVelocity}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-3">
                          <div className="h-2.5 w-20 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                            <div 
                              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                              style={{ width: `${stat.buildSuccessRate}%` }}
                            />
                          </div>
                          <span className="text-white font-bold w-12">{stat.buildSuccessRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-white font-bold text-lg">{stat.codeChurn.toLocaleString()}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge 
                          variant="outline" 
                          className={`font-bold ${
                            stat.activeIssues > 10 
                              ? 'bg-red-500/10 border-red-500/30 text-red-300' 
                              : 'bg-green-500/10 border-green-500/30 text-green-300'
                          }`}
                        >
                          {stat.activeIssues}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Distribution Pie Chart - Manager Only */}
      {role === 'manager' && (
        <Card className="glass-card rounded-3xl overflow-hidden border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full blur-3xl" />
          <CardHeader className="relative pb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-500/30 rounded-2xl blur-xl animate-pulse" />
                <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-500/30 to-rose-500/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Users className="h-7 w-7 text-pink-400" />
                </div>
              </div>
              <div>
                <CardTitle className="text-white text-2xl font-bold">Team Distribution</CardTitle>
                <CardDescription className="text-slate-400 flex items-center gap-2 mt-1">
                  <Sparkles className="h-3 w-3" />
                  Developer count by team across organization
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <defs>
                  {COLORS.map((color, index) => (
                    <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={1}/>
                      <stop offset="100%" stopColor={color} stopOpacity={0.7}/>
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={[
                    { name: 'Frontend', value: 2 },
                    { name: 'Backend', value: 2 },
                    { name: 'DevOps', value: 1 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={110}
                  innerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="#1e293b"
                  strokeWidth={3}
                >
                  {[0, 1, 2].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#pieGradient${index})`} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}