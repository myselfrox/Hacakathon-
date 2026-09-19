# ClimateWatch AI Frontend

A responsive hackathon dashboard frontend based on the supplied reference design.

## Recommended project structure

```text
climatewatch-ai/
├── index.html
├── styles.css
├── app.js
├── api.js
├── assets/
│   ├── icons/
│   └── images/
└── README.md
```

For a production version, migrate the same UI to:

```text
src/
├── components/
├── pages/
├── services/
├── hooks/
├── types/
└── assets/
```

## Run

The current version is plain HTML/CSS/JavaScript, so it can run directly with VS Code Live Server.

Do NOT open it with `file://` if your API uses fetch/CORS. Use Live Server or a local HTTP server.

## Connect real data

Edit `api.js`:

- `/api/dashboard`
- `/api/weather/observations`
- `/api/weather/forecast`
- `/api/anomalies`
- `/api/alerts`
- `/api/ai/explain`

No fabricated weather values are inserted by the frontend. Until an endpoint responds, the UI deliberately shows `—` / `Connect API`.

## Suggested production stack

- React + Vite + TypeScript
- Tailwind CSS
- Recharts or ECharts for analytics
- MapLibre GL JS or Leaflet for maps
- FastAPI / Node.js backend
- PostgreSQL/PostGIS for spatial event data
- WebSocket/SSE for live updates
- Python model service for anomaly detection and AI explanations

## Important

The frontend is a presentation and interaction layer. Forecast/anomaly accuracy must come from your real weather/model APIs and backend pipeline.
