import { getWeather, searchLocation } from "./api.js";

/* ============================================================
   ClimateWatch AI - app.js
   UI state + rendering + API integration
   ============================================================ */

const state = {
  location: { name: "Punjab, India", lat: 31.1471, lon: 75.3412 },
  selectedDate: new Date("2024-05-21T00:00:00"),
  layer: "temperature",
  anomalies: new Set(["heatwave", "rainfall", "drought", "storm"]),
  weather: null,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function fmt(value, unit = "") {
  return value === null || value === undefined || Number.isNaN(value)
    ? "—"
    : `${Math.round(value * 10) / 10}${unit}`;
}

function anomalyScore(temp) {
  if (temp == null) return 0;
  return Math.max(0, Math.min(100, Math.round((temp - 30) * 7 + 25)));
}

function currentHourIndex(weather) {
  const now = weather?.current?.time;
  if (!now || !weather?.hourly?.time) return 0;
  const i = weather.hourly.time.indexOf(now);
  return i >= 0 ? i : 0;
}

function renderCurrentWeather() {
  const w = state.weather;
  if (!w) return;

  const current = w.current || {};
  const score = anomalyScore(current.temperature_2m);

  $("#mapTemp").textContent = fmt(current.temperature_2m, " °C");
  $("#mapWind").textContent = fmt(current.wind_speed_10m, " km/h");
  $("#mapHumidity").textContent = fmt(current.relative_humidity_2m, "%");
  $("#mapPressure").textContent = fmt(current.pressure_msl, " hPa");

  $("#detectedTemp").textContent = fmt(current.temperature_2m, " °C");
  $("#confidence").textContent = `${Math.min(99, Math.max(55, score))}%`;
  $("#confidenceBar").style.width = `${Math.min(99, Math.max(55, score))}%`;

  const heat = current.temperature_2m >= 40;
  $("#riskBadge").textContent = heat ? "HIGH RISK" : "MODERATE";
  $("#riskTitle").textContent = heat ? "Heatwave Detected" : "No Major Heatwave";
  $("#riskCard").classList.toggle("high-risk", heat);
}

function renderDate() {
  const date = state.selectedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  $("#dateLabel").textContent = date;
}

function renderMap() {
  const map = $("#map");
  map.querySelectorAll(".weather-marker").forEach((n) => n.remove());

  const markers = [
    { x: 42, y: 36, type: "heat", label: "Punjab" },
    { x: 57, y: 54, type: "rain", label: "Bay of Bengal" },
    { x: 49, y: 66, type: "drought", label: "Central India" },
    { x: 67, y: 42, type: "storm", label: "East India" },
  ];

  markers.forEach((m) => {
    const el = document.createElement("button");
    el.className = `weather-marker ${m.type}`;
    el.style.left = `${m.x}%`;
    el.style.top = `${m.y}%`;
    el.title = m.label;
    el.innerHTML = m.type === "heat" ? "♨" : m.type === "rain" ? "♧" : m.type === "drought" ? "☼" : "≋";
    el.onclick = () => showToast(`${m.label}: ${m.type.replace("-", " ")} event selected`);
    map.appendChild(el);
  });
}

function drawTemperatureChart() {
  const canvas = $("#tempChart");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width, h = rect.height;
  ctx.clearRect(0, 0, w, h);

  const values = state.weather?.hourly?.temperature_2m?.slice(0, 13) ||
    [31, 32, 34, 36, 38, 40, 41, 43, 42, 40, 37, 35, 33];

  const min = Math.min(...values) - 2;
  const max = Math.max(...values) + 2;
  const px = (i) => 12 + (i / (values.length - 1)) * (w - 24);
  const py = (v) => h - 18 - ((v - min) / (max - min)) * (h - 35);

  ctx.strokeStyle = "rgba(110,145,190,.18)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const y = 12 + i * ((h - 30) / 4);
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  ctx.strokeStyle = "#ef4444";
  ctx.lineWidth = 3;
  ctx.beginPath();
  values.forEach((v, i) => i ? ctx.lineTo(px(i), py(v)) : ctx.moveTo(px(i), py(v)));
  ctx.stroke();

  values.forEach((v, i) => {
    ctx.fillStyle = "#ef4444";
    ctx.beginPath(); ctx.arc(px(i), py(v), 3, 0, Math.PI * 2); ctx.fill();
  });
}

function bindEvents() {
  $("#searchBtn").onclick = async () => {
    const input = $("#locationSearch");
    if (!input.value.trim()) return;
    try {
      const data = await searchLocation(input.value.trim());
      const place = data.results?.[0];
      if (!place) return showToast("Location not found");
      state.location = { name: `${place.name}, ${place.country}`, lat: place.latitude, lon: place.longitude };
      $("#locationName").textContent = state.location.name;
      state.weather = await getWeather(place.latitude, place.longitude);
      renderCurrentWeather();
      drawTemperatureChart();
      showToast(`Loaded live weather for ${state.location.name}`);
    } catch (error) {
      showToast("Could not load location data");
      console.error(error);
    }
  };

  $("#locationSearch").addEventListener("keydown", (e) => {
    if (e.key === "Enter") $("#searchBtn").click();
  });

  $$(".layer-control input").forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) state.layer = input.value;
      showToast(`${input.value} layer selected`);
    });
  });

  $$(".anomaly-control input").forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) state.anomalies.add(input.value);
      else state.anomalies.delete(input.value);
      renderMap();
    });
  });

  $$(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      $$(".nav-item").forEach((n) => n.classList.remove("active"));
      item.classList.add("active");
      showToast(`${item.dataset.page || item.textContent.trim()} opened`);
    });
  });

  $("#playBtn").onclick = () => showToast("Forecast timeline playback started");
  $("#prevBtn").onclick = () => shiftDate(-1);
  $("#nextBtn").onclick = () => shiftDate(1);
  $("#aiExplain").onclick = () => showToast("AI explanation panel opened");
  $("#bellBtn").onclick = () => showToast("No new alerts");
}

function shiftDate(days) {
  state.selectedDate.setDate(state.selectedDate.getDate() + days);
  renderDate();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

async function init() {
  renderDate();
  renderMap();
  bindEvents();

  try {
    state.weather = await getWeather(state.location.lat, state.location.lon);
    renderCurrentWeather();
    drawTemperatureChart();
  } catch (error) {
    console.warn("Live weather unavailable; UI remains usable.", error);
    drawTemperatureChart();
  }

  window.addEventListener("resize", drawTemperatureChart);
}

document.addEventListener("DOMContentLoaded", init);
