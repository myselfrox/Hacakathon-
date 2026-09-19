/**
 * ClimateWatch AI - API Integration Module
 * Replace the API_BASE URL with your actual backend endpoint.
 * This module deliberately has NO fabricated weather results.
 */

const API_BASE = process.env.NODE_ENV === 'production' 
  ? "https://api.climatewatch.local/v1" 
  : "http://localhost:3000/api";

export const API_CONFIG = {
  dashboard: `${API_BASE}/dashboard`,
  observations: `${API_BASE}/weather/observations`,
  forecasts: `${API_BASE}/weather/forecast`,
  anomalies: `${API_BASE}/anomalies`,
  alerts: `${API_BASE}/alerts`,
  aiExplanation: `${API_BASE}/ai/explain`
};

/**
 * Core fetch wrapper with timeout control and strict error handling
 * @param {string} url - The endpoint URL
 * @param {RequestInit} options - Fetch options
 * @param {number} timeoutMs - Timeout in milliseconds
 */
async function request(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      headers: { 
        "Accept": "application/json", 
        "Content-Type": "application/json",
        ...(options.headers || {}) 
      },
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error(`[API Timeout] ${url} took longer than ${timeoutMs}ms`);
      throw new Error("Request timed out. Please check your connection.");
    }
    console.error(`[API Error] Failed to fetch ${url}:`, error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Normalizes raw backend payload into the structure expected by the frontend app.js
 * @param {Object} rawData - The raw JSON from your backend
 */
function normalizeDashboard(rawData) {
  if (!rawData) return null;
  
  // Adapt this mapping once your real backend is connected
  return {
    stats: rawData.key_metrics || [],
    alerts: rawData.active_alerts || [],
    heatmapData: rawData.spatial_data || null
  };
}

/**
 * Fetch top-level dashboard metrics and alerts
 */
export async function loadDashboard() {
  const rawData = await request(API_CONFIG.dashboard);
  return normalizeDashboard(rawData);
}

/**
 * Fetch paginated or filtered anomaly records
 * @param {Object} params - Query parameters (e.g., { region: "Punjab", type: "heatwave" })
 */
export async function loadAnomalies(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${API_CONFIG.anomalies}?${query}` : API_CONFIG.anomalies;
  return request(url);
}

/**
 * Request an AI-generated explanation for a specific weather event
 * @param {Object} payload - Event coordinates, telemetry, or region ID
 */
export async function loadAIExplanation(payload) {
  return request(API_CONFIG.aiExplanation, {
    method: "POST",
    body: JSON.stringify({
      eventContext: payload,
      requestTimestamp: new Date().toISOString()
    })
  }, 15000); // Allow slightly longer timeout for AI model generation
}
