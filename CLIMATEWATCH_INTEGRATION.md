# ClimateWatch AI Dashboard Integration

The existing authenticated app now serves the provided ClimateWatch dashboard at the root route through `public/climate-dashboard/`.

## Files added
- `public/climate-dashboard/index.html`
- `public/climate-dashboard/styles.css`
- `public/climate-dashboard/app.js`
- `public/climate-dashboard/api.js`

## Root route
`src/routes/index.tsx` keeps the existing sign-in gate and loads the dashboard in an iframe after authentication.

## API
The dashboard expects these same-origin routes:
- `/api/dashboard`
- `/api/weather/observations`
- `/api/weather/forecast`
- `/api/anomalies`
- `/api/alerts`
- `/api/ai/explain`

No fabricated weather data was added. Until those routes exist, the dashboard will show `API READY` / empty states.
