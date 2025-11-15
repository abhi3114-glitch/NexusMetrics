import { PRMetric, BuildMetric, CodeChurnMetric, Alert, DeveloperStats, Developer } from '@/types';
import { subDays, format } from 'date-fns';

export const developers: Developer[] = [
  { id: '1', name: 'Alice Johnson', team: 'Frontend', avatar: 'AJ' },
  { id: '2', name: 'Bob Smith', team: 'Backend', avatar: 'BS' },
  { id: '3', name: 'Carol Williams', team: 'DevOps', avatar: 'CW' },
  { id: '4', name: 'David Brown', team: 'Frontend', avatar: 'DB' },
  { id: '5', name: 'Eve Davis', team: 'Backend', avatar: 'ED' },
];

export function generatePRMetrics(days: number = 30): PRMetric[] {
  const metrics: PRMetric[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    metrics.push({
      date,
      prsOpened: Math.floor(Math.random() * 15) + 5,
      prsMerged: Math.floor(Math.random() * 12) + 3,
      prsClosed: Math.floor(Math.random() * 3) + 1,
      avgReviewTime: Math.floor(Math.random() * 24) + 2,
    });
  }
  return metrics;
}

export function generateBuildMetrics(days: number = 30): BuildMetric[] {
  const metrics: BuildMetric[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const totalBuilds = Math.floor(Math.random() * 50) + 20;
    const failedBuilds = Math.floor(Math.random() * 10) + 1;
    metrics.push({
      date,
      totalBuilds,
      successfulBuilds: totalBuilds - failedBuilds,
      failedBuilds,
      avgBuildTime: Math.floor(Math.random() * 300) + 120,
    });
  }
  return metrics;
}

export function generateCodeChurnMetrics(days: number = 30): CodeChurnMetric[] {
  const metrics: CodeChurnMetric[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    metrics.push({
      date,
      linesAdded: Math.floor(Math.random() * 1000) + 200,
      linesDeleted: Math.floor(Math.random() * 500) + 100,
      filesChanged: Math.floor(Math.random() * 30) + 5,
      commits: Math.floor(Math.random() * 20) + 3,
    });
  }
  return metrics;
}

export function generateAlerts(): Alert[] {
  return [
    {
      id: '1',
      type: 'critical',
      message: 'Build failure rate exceeded 20% threshold',
      timestamp: format(subDays(new Date(), 0), 'yyyy-MM-dd HH:mm'),
      metric: 'Build Failures',
    },
    {
      id: '2',
      type: 'warning',
      message: 'PR review time increased by 40% this week',
      timestamp: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm'),
      metric: 'PR Velocity',
    },
    {
      id: '3',
      type: 'info',
      message: 'Code churn spike detected in frontend team',
      timestamp: format(subDays(new Date(), 2), 'yyyy-MM-dd HH:mm'),
      metric: 'Code Churn',
    },
  ];
}

export function generateDeveloperStats(): DeveloperStats[] {
  return developers.map((dev) => ({
    developer: dev,
    prVelocity: Math.floor(Math.random() * 50) + 10,
    buildSuccessRate: Math.floor(Math.random() * 20) + 75,
    codeChurn: Math.floor(Math.random() * 5000) + 1000,
    activeIssues: Math.floor(Math.random() * 15) + 2,
  }));
}