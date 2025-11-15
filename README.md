# NexusMetrics - Developer Analytics Platform

An internal tool that aggregates GitHub/Jira/CI pipeline data to visualize developer productivity and bottlenecks.

## Features

- Time-series Metrics: Track PR velocity, build failures, and code churn over time
- Role-based Dashboards: Different views for Developers, Team Leads, and Managers
- Alert System: Anomaly detection for critical metrics
- Interactive Visualizations: Powered by Recharts for rich data visualization
- Mock Data: Pre-populated with realistic sample data for demonstration

## Tech Stack

### Frontend
- React with TypeScript
- Shadcn-ui for UI components
- Tailwind CSS for styling
- Recharts for data visualization
- Vite for build tooling

### Backend
- FastAPI for REST API
- PostgreSQL for data storage
- Pydantic for data validation
- Uvicorn as ASGI server

## Key Metrics

1. PR Velocity: Track pull requests opened, merged, and closed
2. Build Failures: Monitor CI/CD pipeline success rates
3. Code Churn: Analyze lines added/deleted and file changes
4. Team Performance: Individual developer statistics and team distribution

## Role-Based Views

### Developer View
- Personal metrics and performance
- Team-wide trends
- Active alerts

### Team Lead View
- All developer features
- Team performance table
- Individual developer statistics

### Manager View
- Comprehensive cross-team insights
- Team distribution charts
- Organization-wide metrics

## Quick Start

### Frontend Setup

```bash
cd /workspace/NexusMetrics
pnpm install
pnpm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd /workspace/NexusMetrics/backend
pip install -r requirements.txt
python main.py
```

The API will be available at `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

### Database Setup

```bash
# Connect to PostgreSQL
psql -U your_username -d your_database

# Run the schema
\i database/schema.sql
```

## Project Structure

```
NexusMetrics/
├── backend/
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
├── database/
│   └── schema.sql          # PostgreSQL schema
├── src/
│   ├── components/
│   │   ├── AlertPanel.tsx
│   │   ├── MetricsCharts.tsx
│   │   ├── MetricCard.tsx
│   │   ├── ParticleBackground.tsx
│   │   └── RoleSelector.tsx
│   ├── lib/
│   │   └── mockData.ts     # Mock data generation
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   └── pages/
│       └── Index.tsx       # Main dashboard
└── README.md
```

## API Endpoints

- `GET /` - API information
- `GET /api/metrics/pr` - PR velocity metrics
- `GET /api/metrics/builds` - Build success/failure metrics
- `GET /api/metrics/code-churn` - Code churn metrics
- `GET /api/alerts` - Current anomaly alerts
- `GET /api/developers/stats` - Developer statistics
- `GET /api/health` - Health check

## Features in Detail

### Anomaly Detection
The alert system monitors:
- Build failure rates exceeding 20%
- PR review time increases greater than 40%
- Unusual code churn spikes

### Data Visualization
- Line charts for PR velocity trends
- Bar charts for build success/failure rates
- Area charts for code churn analysis
- Pie charts for team distribution
- Interactive tooltips and legends

### Responsive Design
- Mobile-friendly layout
- Dark mode support
- Accessible UI components

## Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/nexusmetrics
GITHUB_TOKEN=your_github_token
JIRA_API_TOKEN=your_jira_token
```

## Performance Optimizations

- React.memo for component memoization
- useMemo and useCallback for expensive computations
- CSS-based animations instead of canvas for better performance
- Code splitting and lazy loading
- Optimized build configuration with Vite

## Future Enhancements

- Real GitHub API integration
- Jira ticket tracking
- CI/CD pipeline webhooks
- Advanced anomaly detection with ML
- Custom dashboard configuration
- Export reports to PDF
- Real-time updates with WebSockets
- User authentication and authorization

## Contributing

This is an internal tool for demonstration purposes. For production use:
1. Replace mock data with real API integrations
2. Implement proper authentication
3. Add comprehensive error handling
4. Set up monitoring and logging
5. Configure production database

## License

MIT License - Internal Use Only

## Team

Built by the Engineering Team

---

Note: This MVP uses mock data for demonstration. For production deployment, integrate with actual GitHub, Jira, and CI/CD APIs.