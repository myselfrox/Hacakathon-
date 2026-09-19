import { loadDashboard, loadAIExplanation } from "./api.js";

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const state = { dashboard: null, selectedEvent: null, zoom: 1 };

document.addEventListener("DOMContentLoaded", () => {
  $("#dateInput").value = new Date().toISOString().slice(0, 10);
  setupNavigation();
  setupMapInteractions();
  setupButtons();
  drawEmptyChart();
  loadRealData();
});

function setupNavigation() {
  $$(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".nav-item").forEach(x => x.classList.remove("active"));
      btn.classList.add("active");
      $$(".page-section").forEach(x => x.classList.remove("active-section"));
      $(`#${btn.dataset.section}`).classList.add("active-section");
    });
  });
}

function setupMapInteractions() {
  $$(".event-pin").forEach(pin => pin.addEventListener("click", () => selectEvent(pin.dataset.region)));
  $("#zoomIn").onclick = () => zoomMap(1.12);
  $("#zoomOut").onclick = () => zoomMap(.89);
  $("#mapCenter").onclick = () => { state.zoom = 1; updateMapZoom(); };
  $("#resetMapBtn").onclick = () => { state.zoom = 1; $("#locationSearch").value = ""; updateMapZoom(); };
  $("#locateBtn").onclick = () => toast("Location search requires a geocoding API.");
  $("#locationSearch").addEventListener("keydown", e => {
    if (e.key === "Enter") toast(`Search requested: ${e.target.value || "empty"}`);
  });
  $("#timeSlider").addEventListener("input", e => toast(`Timeline position: ${e.target.value}`));
}

function setupButtons() {
  $("#detailsBtn").onclick = () => toast(state.selectedEvent ? "Detailed event view ready for API data." : "Select a map event first.");
  $("#explainBtn").onclick = async () => {
    if (!state.selectedEvent) return;
    try {
      const result = await loadAIExplanation(state.selectedEvent);
      toast(result?.explanation || "AI explanation received.");
    } catch {
      toast("AI explanation endpoint is not connected yet.");
    }
  };
  $("#alertBtn").onclick = () => toast("Alert center ready for live alert data.");
}

function zoomMap(amount) {
  state.zoom = Math.min(1.7, Math.max(.75, state.zoom * amount));
  updateMapZoom();
}
function updateMapZoom() {
  $(".india-shape").style.transform = `scale(${state.zoom})`;
}

function selectEvent(region) {
  state.selectedEvent = { region };
  $("#selectedRegion").textContent = `${region} · live event`;
  $("#detectionEmpty").classList.add("hidden");
  $("#detectionContent").classList.remove("hidden");
  $("#eventTitle").textContent = `${region} anomaly selected`;
  $("#eventIcon").textContent = "⚠";
  $("#riskBadge").textContent = "API DATA";
  $("#currentValue").textContent = "—";
  $("#baselineValue").textContent = "—";
  $("#deviationValue").textContent = "—";
  $("#confidenceBar").style.width = "0%";
  $("#confidenceValue").textContent = "—";
  toast(`Selected ${region}. Waiting for live event details.`);
}

async function loadRealData() {
  try {
    const data = await loadDashboard();
    state.dashboard = data;
    renderDashboard(data);
    $("#connectionText").textContent = "LIVE API";
  } catch (error) {
    // Expected until the user connects a backend.
    $("#connectionText").textContent = "API READY";
    renderEmptyState();
  }
}

function renderDashboard(data) {
  const stats = data?.stats || [];
  $("#statGrid").innerHTML = stats.map(s => `
    <article class="stat">
      <span class="icon">${escapeHtml(s.icon || "◉")}</span>
      <strong>${escapeHtml(s.value ?? "—")}</strong>
      <small>${escapeHtml(s.label || "")}</small>
      <div class="delta ${s.direction === "down" ? "down" : "up"}">${escapeHtml(s.change || "")}</div>
    </article>`).join("");

  if (Array.isArray(data?.alerts)) {
    $("#alertCount").textContent = data.alerts.length;
    $("#alertsList").innerHTML = data.alerts.map(a =>
      `<div class="metric-row"><span>${escapeHtml(a.title)}</span><b>${escapeHtml(a.time || "")}</b></div>`
    ).join("");
  }
}

function renderEmptyState() {
  $("#statGrid").innerHTML = ["Heatwave Events","Extreme Rainfall","Drought Conditions","Severe Storms","Monitored Regions","Overall Risk Level"]
    .map(label => `<article class="stat"><span class="icon">◌</span><strong>—</strong><small>${label}</small><div class="delta status-warn">Connect API</div></article>`).join("");
}

function drawEmptyChart() {
  const canvas = $("#forecastChart");
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const dpr = devicePixelRatio || 1;
  canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  ctx.strokeStyle = "#163b52";
  ctx.lineWidth = 1;
  for (let y = 20; y < rect.height; y += 32) {
    ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(rect.width,y); ctx.stroke();
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c]));
}

let toastTimer;
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}
