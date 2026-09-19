/* ============================================================
   ClimateWatch AI - api.js
   Centralized API layer. Replace BASE_URL values with your own
   backend/API endpoints when you connect real anomaly models.
   ============================================================ */

const API_CONFIG = {
  weatherBase: "https://api.open-meteo.com/v1/forecast",
  geocodeBase: "https://geocoding-api.open-meteo.com/v1/search",
  // Optional backend endpoints:
  anomalyEndpoint: "",
  forecastEndpoint: "",
};

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { Accept: "application/json", ...(options.headers || {}) },
  });
  if (!response.ok) throw new Error(`API ${response.status}: ${response.statusText}`);
  return response.json();
}

export async function searchLocation(name) {
  const url = new URL(API_CONFIG.geocodeBase);
  url.searchParams.set("name", name);
  url.searchParams.set("count", "5");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");
  return fetchJSON(url);
}

export async function getWeather(lat, lon) {
  const url = new URL(API_CONFIG.weatherBase);
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lon);
  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,pressure_msl,cloud_cover"
  );
  url.searchParams.set(
    "hourly",
    "temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m,pressure_msl,cloud_cover"
  );
  url.searchParams.set("forecast_days", "7");
  url.searchParams.set("timezone", "auto");
  return fetchJSON(url);
}

export async function getAnomalies(params = {}) {
  if (!API_CONFIG.anomalyEndpoint) return null;
  const url = new URL(API_CONFIG.anomalyEndpoint, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  });
  return fetchJSON(url);
}

export async function getModelForecast(params = {}) {
  if (!API_CONFIG.forecastEndpoint) return null;
  const url = new URL(API_CONFIG.forecastEndpoint, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  });
  return fetchJSON(url);
}
