from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import random
from typing import List
from pydantic import BaseModel

app = FastAPI(title="NexusMetrics API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models
class PRMetric(BaseModel):
    date: str
    prs_opened: int
    prs_merged: int
    prs_closed: int
    avg_review_time: float

class BuildMetric(BaseModel):
    date: str
    total_builds: int
    successful_builds: int
    failed_builds: int
    avg_build_time: float

class CodeChurnMetric(BaseModel):
    date: str
    lines_added: int
    lines_deleted: int
    files_changed: int
    commits: int

class Alert(BaseModel):
    id: str
    type: str
    message: str
    timestamp: str
    metric: str

class Developer(BaseModel):
    id: str
    name: str
    team: str
    avatar: str

class DeveloperStats(BaseModel):
    developer: Developer
    pr_velocity: int
    build_success_rate: float
    code_churn: int
    active_issues: int

# Mock Data Generation
def generate_pr_metrics(days: int = 30) -> List[PRMetric]:
    metrics = []
    for i in range(days - 1, -1, -1):
        date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
        metrics.append(PRMetric(
            date=date,
            prs_opened=random.randint(5, 20),
            prs_merged=random.randint(3, 15),
            prs_closed=random.randint(1, 4),
            avg_review_time=random.uniform(2, 26)
        ))
    return metrics

def generate_build_metrics(days: int = 30) -> List[BuildMetric]:
    metrics = []
    for i in range(days - 1, -1, -1):
        date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
        total = random.randint(20, 70)
        failed = random.randint(1, 11)
        metrics.append(BuildMetric(
            date=date,
            total_builds=total,
            successful_builds=total - failed,
            failed_builds=failed,
            avg_build_time=random.uniform(120, 420)
        ))
    return metrics

def generate_code_churn_metrics(days: int = 30) -> List[CodeChurnMetric]:
    metrics = []
    for i in range(days - 1, -1, -1):
        date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
        metrics.append(CodeChurnMetric(
            date=date,
            lines_added=random.randint(200, 1200),
            lines_deleted=random.randint(100, 600),
            files_changed=random.randint(5, 35),
            commits=random.randint(3, 23)
        ))
    return metrics

def generate_alerts() -> List[Alert]:
    return [
        Alert(
            id="1",
            type="critical",
            message="Build failure rate exceeded 20% threshold",
            timestamp=datetime.now().strftime('%Y-%m-%d %H:%M'),
            metric="Build Failures"
        ),
        Alert(
            id="2",
            type="warning",
            message="PR review time increased by 40% this week",
            timestamp=(datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d %H:%M'),
            metric="PR Velocity"
        ),
        Alert(
            id="3",
            type="info",
            message="Code churn spike detected in frontend team",
            timestamp=(datetime.now() - timedelta(days=2)).strftime('%Y-%m-%d %H:%M'),
            metric="Code Churn"
        )
    ]

developers = [
    Developer(id="1", name="Alice Johnson", team="Frontend", avatar="AJ"),
    Developer(id="2", name="Bob Smith", team="Backend", avatar="BS"),
    Developer(id="3", name="Carol Williams", team="DevOps", avatar="CW"),
    Developer(id="4", name="David Brown", team="Frontend", avatar="DB"),
    Developer(id="5", name="Eve Davis", team="Backend", avatar="ED"),
]

def generate_developer_stats() -> List[DeveloperStats]:
    return [
        DeveloperStats(
            developer=dev,
            pr_velocity=random.randint(10, 60),
            build_success_rate=random.uniform(75, 95),
            code_churn=random.randint(1000, 6000),
            active_issues=random.randint(2, 17)
        ) for dev in developers
    ]

# API Endpoints
@app.get("/")
def read_root():
    return {
        "message": "NexusMetrics API",
        "version": "1.0.0",
        "endpoints": [
            "/api/metrics/pr",
            "/api/metrics/builds",
            "/api/metrics/code-churn",
            "/api/alerts",
            "/api/developers/stats"
        ]
    }

@app.get("/api/metrics/pr", response_model=List[PRMetric])
def get_pr_metrics(days: int = 30):
    """Get PR velocity metrics for the specified number of days"""
    return generate_pr_metrics(days)

@app.get("/api/metrics/builds", response_model=List[BuildMetric])
def get_build_metrics(days: int = 30):
    """Get build success/failure metrics"""
    return generate_build_metrics(days)

@app.get("/api/metrics/code-churn", response_model=List[CodeChurnMetric])
def get_code_churn_metrics(days: int = 30):
    """Get code churn metrics"""
    return generate_code_churn_metrics(days)

@app.get("/api/alerts", response_model=List[Alert])
def get_alerts():
    """Get current anomaly alerts"""
    return generate_alerts()

@app.get("/api/developers/stats", response_model=List[DeveloperStats])
def get_developer_stats():
    """Get individual developer statistics"""
    return generate_developer_stats()

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)