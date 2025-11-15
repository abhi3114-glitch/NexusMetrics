export type UserRole = 'developer' | 'team-lead' | 'manager';

export interface Developer {
  id: string;
  name: string;
  team: string;
  avatar: string;
}

export interface PRMetric {
  date: string;
  prsOpened: number;
  prsMerged: number;
  prsClosed: number;
  avgReviewTime: number;
}

export interface BuildMetric {
  date: string;
  totalBuilds: number;
  successfulBuilds: number;
  failedBuilds: number;
  avgBuildTime: number;
}

export interface CodeChurnMetric {
  date: string;
  linesAdded: number;
  linesDeleted: number;
  filesChanged: number;
  commits: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  timestamp: string;
  metric: string;
}

export interface DeveloperStats {
  developer: Developer;
  prVelocity: number;
  buildSuccessRate: number;
  codeChurn: number;
  activeIssues: number;
}