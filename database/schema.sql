-- NexusMetrics Database Schema
-- PostgreSQL Schema for Developer Analytics Platform

-- Developers Table
CREATE TABLE IF NOT EXISTS developers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    team VARCHAR(100) NOT NULL,
    avatar VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- PR Metrics Table
CREATE TABLE IF NOT EXISTS pr_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    developer_id UUID REFERENCES developers(id),
    date DATE NOT NULL,
    prs_opened INTEGER DEFAULT 0,
    prs_merged INTEGER DEFAULT 0,
    prs_closed INTEGER DEFAULT 0,
    avg_review_time_hours DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    UNIQUE(developer_id, date)
);

-- Build Metrics Table
CREATE TABLE IF NOT EXISTS build_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    total_builds INTEGER DEFAULT 0,
    successful_builds INTEGER DEFAULT 0,
    failed_builds INTEGER DEFAULT 0,
    avg_build_time_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    UNIQUE(project_name, date)
);

-- Code Churn Metrics Table
CREATE TABLE IF NOT EXISTS code_churn_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    developer_id UUID REFERENCES developers(id),
    date DATE NOT NULL,
    lines_added INTEGER DEFAULT 0,
    lines_deleted INTEGER DEFAULT 0,
    files_changed INTEGER DEFAULT 0,
    commits INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    UNIQUE(developer_id, date)
);

-- Alerts Table
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(20) NOT NULL CHECK (type IN ('info', 'warning', 'critical')),
    message TEXT NOT NULL,
    metric VARCHAR(100) NOT NULL,
    threshold_value DECIMAL(10,2),
    actual_value DECIMAL(10,2),
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Issues Table
CREATE TABLE IF NOT EXISTS issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    developer_id UUID REFERENCES developers(id),
    title VARCHAR(500) NOT NULL,
    status VARCHAR(50) NOT NULL,
    priority VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_pr_metrics_date ON pr_metrics(date DESC);
CREATE INDEX IF NOT EXISTS idx_pr_metrics_developer ON pr_metrics(developer_id);
CREATE INDEX IF NOT EXISTS idx_build_metrics_date ON build_metrics(date DESC);
CREATE INDEX IF NOT EXISTS idx_code_churn_date ON code_churn_metrics(date DESC);
CREATE INDEX IF NOT EXISTS idx_code_churn_developer ON code_churn_metrics(developer_id);
CREATE INDEX IF NOT EXISTS idx_alerts_created ON alerts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_unresolved ON alerts(is_resolved) WHERE is_resolved = FALSE;

-- Insert Sample Data
INSERT INTO developers (name, email, team, avatar) VALUES
    ('Alice Johnson', 'alice@example.com', 'Frontend', 'AJ'),
    ('Bob Smith', 'bob@example.com', 'Backend', 'BS'),
    ('Carol Williams', 'carol@example.com', 'DevOps', 'CW'),
    ('David Brown', 'david@example.com', 'Frontend', 'DB'),
    ('Eve Davis', 'eve@example.com', 'Backend', 'ED')
ON CONFLICT (email) DO NOTHING;

-- Comments for Documentation
COMMENT ON TABLE developers IS 'Stores developer information and team assignments';
COMMENT ON TABLE pr_metrics IS 'Time-series data for pull request velocity metrics';
COMMENT ON TABLE build_metrics IS 'CI/CD pipeline build success and failure tracking';
COMMENT ON TABLE code_churn_metrics IS 'Code change metrics including lines added/deleted';
COMMENT ON TABLE alerts IS 'Anomaly detection alerts for metric thresholds';
COMMENT ON TABLE issues IS 'Active issues assigned to developers';