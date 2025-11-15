# Developer Analytics Platform - MVP Implementation Plan

## Project Structure
```
nexus-metrics/
├── backend/
│   ├── main.py (FastAPI app, API endpoints)
│   ├── models.py (Pydantic models)
│   ├── database.py (PostgreSQL connection)
│   ├── mock_data.py (Mock data generator)
│   └── requirements.txt
├── frontend/ (React + Shadcn-ui)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx (Main dashboard)
│   │   │   ├── PRVelocityChart.tsx
│   │   │   ├── BuildFailuresChart.tsx
│   │   │   ├── CodeChurnChart.tsx
│   │   │   ├── RoleSelector.tsx
│   │   │   └── AlertPanel.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── database/
│   └── schema.sql (PostgreSQL schema)
└── README.md
```

## Files to Create (Max 8 code files)
1. **backend/main.py** - FastAPI application with endpoints
2. **backend/mock_data.py** - Mock data generation
3. **database/schema.sql** - PostgreSQL schema
4. **src/App.tsx** - Main React app with routing
5. **src/components/Dashboard.tsx** - Main dashboard component
6. **src/components/MetricsCharts.tsx** - All visualization charts combined
7. **src/components/RoleSelector.tsx** - Role-based view switcher
8. **README.md** - Setup and deployment instructions

## Implementation Strategy
- Use Shadcn-ui template for React frontend
- FastAPI backend with mock data (no real DB connection for MVP)
- Plotly.js for interactive charts
- Role-based filtering in frontend
- Simple anomaly detection logic
- Git push to provided repository

## Tech Stack
- Backend: FastAPI + Python
- Frontend: React + TypeScript + Shadcn-ui + Tailwind CSS
- Visualization: Plotly.js
- Mock Database: In-memory data structures