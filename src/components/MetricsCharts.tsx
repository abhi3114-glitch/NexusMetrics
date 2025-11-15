import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PRMetric, BuildMetric, CodeChurnMetric, DeveloperStats, UserRole } from '@/types';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, GitPullRequest, AlertCircle, Code2, Users } from 'lucide-react';
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

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function MetricsCharts({ prMetrics, buildMetrics, codeChurnMetrics, developerStats, role }: MetricsChartsProps) {
  const latestPR = prMetrics[prMetrics.length - 1];
  const latestBuild = buildMetrics[buildMetrics.length - 1];
  const latestChurn = codeChurnMetrics[codeChurnMetrics.length - 1];
  const buildSuccessRate = latestBuild ? ((latestBuild.successfulBuilds / latestBuild.totalBuilds) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PR Velocity</CardTitle>
            <GitPullRequest className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestPR?.prsMerged || 0}</div>
            <p className="text-xs text-muted-foreground">PRs merged today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Build Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buildSuccessRate}%</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Code Churn</CardTitle>
            <Code2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestChurn?.commits || 0}</div>
            <p className="text-xs text-muted-foreground">Commits today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Review Time</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestPR?.avgReviewTime || 0}h</div>
            <p className="text-xs text-muted-foreground">Current average</p>
          </CardContent>
        </Card>
      </div>

      {/* PR Velocity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>PR Velocity Trends</CardTitle>
          <CardDescription>Pull request activity over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(value) => value.slice(5)} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="prsOpened" stroke="#3b82f6" name="Opened" strokeWidth={2} />
              <Line type="monotone" dataKey="prsMerged" stroke="#10b981" name="Merged" strokeWidth={2} />
              <Line type="monotone" dataKey="prsClosed" stroke="#ef4444" name="Closed" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Build Failures Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Build Success & Failure Rates</CardTitle>
          <CardDescription>CI/CD pipeline performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={buildMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(value) => value.slice(5)} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="successfulBuilds" fill="#10b981" name="Successful" />
              <Bar dataKey="failedBuilds" fill="#ef4444" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Code Churn Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Code Churn Analysis</CardTitle>
          <CardDescription>Lines of code added and deleted over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={codeChurnMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(value) => value.slice(5)} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="linesAdded" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Lines Added" />
              <Area type="monotone" dataKey="linesDeleted" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Lines Deleted" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Team Performance Table - Only for Team Lead and Manager */}
      {(role === 'team-lead' || role === 'manager') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Performance Overview
            </CardTitle>
            <CardDescription>Individual developer metrics and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Developer</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="text-right">PR Velocity</TableHead>
                  <TableHead className="text-right">Build Success</TableHead>
                  <TableHead className="text-right">Code Churn</TableHead>
                  <TableHead className="text-right">Active Issues</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {developerStats.map((stat) => (
                  <TableRow key={stat.developer.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{stat.developer.avatar}</AvatarFallback>
                        </Avatar>
                        {stat.developer.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{stat.developer.team}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{stat.prVelocity}</TableCell>
                    <TableCell className="text-right">{stat.buildSuccessRate}%</TableCell>
                    <TableCell className="text-right">{stat.codeChurn.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{stat.activeIssues}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Team Distribution Pie Chart - Manager Only */}
      {role === 'manager' && (
        <Card>
          <CardHeader>
            <CardTitle>Team Distribution</CardTitle>
            <CardDescription>Developer count by team</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
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
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[0, 1, 2].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}