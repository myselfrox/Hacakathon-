// Replace these endpoints with your real backend/API.
// This module deliberately has NO fabricated weather results.
// Expected JSON can be adapted in normalizeDashboard() below.

export const API_CONFIG = {
  dashboard: "/api/dashboard",
  observations: "/api/weather/observations",
  forecasts: "/api/weather/forecast",
  anomalies: "/api/anomalies",
  alerts: "/api/alerts",
  aiExplanation: "/api/ai/explain"
};

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Accept": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

export async function loadDashboard() {
  return request(API_CONFIG.dashboard);
}

export async function loadAnomalies(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`${API_CONFIG.anomalies}${query ? `?${query}` : ""}`);
}

export async function loadAIExplanation(payload) {
  return request(API_CONFIG.aiExplanation, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}
