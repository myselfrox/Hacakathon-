import { loadDashboard, loadAIExplanation } from "./api.js";

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];  const state = { dashboard: null, selectedEvent: null, zoom: 1 };  document.addEventListener("DOMContentLoaded", () => {   setupNavigation();   setupMapInteractions();   setupButtons();   drawEmptyChart();   loadRealData(); });  function setupNavigation() {   $$(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
      // Handle active state on sidebar
      $$(".nav-item").forEach(x => x.classList.remove("active"));       btn.classList.add("active");              // Handle section visibility       $$
(".page-section").forEach(x => x.classList.remove("active-section"));
      const targetSection = $(`#${btn.dataset.section}`);
      if (targetSection) targetSection.classList.add("active-section");
    });
  });
}

function setupMapInteractions() {
  // Map zoom controls targeting the new basemap container
  const zoomInBtn = $("#zoomIn");
  const zoomOutBtn = $("#zoomOut");
  const centerBtn = $("#mapCenter");
  
  if (zoomInBtn) zoomInBtn.onclick = () => zoomMap(1.15);
  if (zoomOutBtn) zoomOutBtn.onclick = () => zoomMap(0.85);
  if (centerBtn) {
    centerBtn.onclick = () => { 
      state.zoom = 1; 
      updateMapZoom(); 
    };
  }

  // Search interactions
  const searchInput = $("#locationSearch");
  if (searchInput) {
    searchInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        toast(`Geocoding search: ${e.target.value || "empty"}`);
      }
    });
  }

  // Timeline slider
  const timeSlider = $("#timeSlider");
  if (timeSlider) {
    timeSlider.addEventListener("input", e => {
      const hours = parseInt(e.target.value);
      const label = hours === 0 ? "Now" : hours > 0 ? `+${hours}h` : `${hours}h`;
      toast(`Forecasting: ${label}`);
    });
  }
}

function setupButtons() {
  const explainBtn = $(".anomaly-card .btn-primary");
  if (explainBtn) {
    explainBtn.onclick = async () => {
      explainBtn.textContent = "Analyzing...";
      try {
        const result = await loadAIExplanation(state.selectedEvent || "Punjab Heatwave");
        toast(result?.explanation || "AI Explanation generation complete.");
      } catch {
        toast("AI explanation endpoint is not connected yet.");
      }
      explainBtn.textContent = "View AI Explanation";
    };
  }

  const alertBell = $(".alert-bell");
  if (alertBell) {
    alertBell.onclick = () => toast("Alert center is synced with live data stream.");
  }
}

function zoomMap(amount) {
  state.zoom = Math.min(2.5, Math.max(0.5, state.zoom * amount));
  updateMapZoom();
}

function updateMapZoom() {
  const basemap = $(".map-basemap");
  if (basemap) {
    basemap.style.transform = `scale(${state.zoom})`;
    basemap.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  }
}

function selectEvent(regionData) {
  state.selectedEvent = regionData;
  toast(`Selected ${regionData.name}. Loading local telemetry...`);
}

async function loadRealData() {
  try {
    const data = await loadDashboard();
    state.dashboard = data;
    renderDashboard(data);
    
    const statusIndicator = $(".status-indicator");
    if (statusIndicator) {
      statusIndicator.innerHTML = `<i class="dot"></i> LIVE API`;
      statusIndicator.classList.add("live");
    }
  } catch (error) {
    // If API is missing, render the fallback state to match the screenshot UI
    console.warn("API not connected. Loading static UI state.");
    renderFallbackState();
  }
}

function renderDashboard(data) {
  const stats = data?.stats || [];
  const statGrid = $("#statGrid");
  
  if (statGrid && stats.length > 0) {
    statGrid.innerHTML = stats.map(s => `
      <div class="kpi-card ${s.isRisk ? 'risk-card' : ''}">
        <div class="kpi-icon ${s.type || 'global'}">${escapeHtml(s.icon || "🌐")}</div>
        <div class="kpi-data">
          <h3 class="${s.isRisk ? 'warning-text' : ''}">${escapeHtml(s.value ?? "—")}</h3>
          <p>${escapeHtml(s.label || "")}</p>
          <span class="trend ${s.direction || 'neutral'}">${escapeHtml(s.change || "")}</span>
        </div>
      </div>`).join("");
  }

  if (Array.isArray(data?.alerts)) {
    const alertCount = $("#alertCount");
    const alertsList = $(".alerts-list");
    
    if (alertCount) alertCount.textContent = data.alerts.length;
    if (alertsList) {
      alertsList.innerHTML = data.alerts.map(a => `
        <div class="alert-item">
          <div class="icon ${a.type || 'warning'}">${escapeHtml(a.icon || "⚠️")}</div>
          <div class="alert-info">
            <strong>${escapeHtml(a.title)}</strong>
            <span>${escapeHtml(a.location || "")}</span>
          </div>
          <div class="alert-time">${escapeHtml(a.time || "")}</div>
        </div>`).join("");
    }
  }
}

function renderFallbackState() {
  // If api.js fails, we keep the hardcoded HTML components as they are,
  // since they are already styled perfectly to match the design mock.
  const statusIndicator = $(".status-indicator");
  if (statusIndicator) {
    statusIndicator.innerHTML = `<i class="dot" style="background:var(--warning)"></i> MOCK DATA`;
    statusIndicator.style.color = "var(--warning)";
    statusIndicator.style.borderColor = "rgba(245, 158, 11, 0.2)";
    statusIndicator.style.background = "rgba(245, 158, 11, 0.1)";
  }
}

function drawEmptyChart() {
  const wrapper = $("#tempChartWrapper");
  if (!wrapper) return;

  // Create a canvas dynamically for the chart wrapper
  wrapper.innerHTML = '<canvas id="forecastChart" style="width:100%; height:100%;"></canvas>';
  const canvas = $("#forecastChart");
  const ctx = canvas.getContext("2d");
  const rect = wrapper.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  
  canvas.width = rect.width * dpr; 
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  
  // Draw a clean, minimal placeholder grid
  ctx.strokeStyle = "#374151"; // Matches var(--border-color)
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  
  for (let y = 20; y < rect.height; y += 40) {
    ctx.beginPath(); 
    ctx.moveTo(0, y); 
    ctx.lineTo(rect.width, y); 
    ctx.stroke();
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ 
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" 
  }[c]));
}

let toastTimer;
function toast(message) {
  let el = $("#toast");
  
  // Create toast element if it doesn't exist in DOM
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  
  el.textContent = message;
  el.classList.add("show");
  
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3000);
}
