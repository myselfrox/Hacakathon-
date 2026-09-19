import React, { useState } from 'react';
import {
  Thermometer, CloudRain, SunDim, Tornado, Globe2, ShieldCheck,
  Home, Map as MapIcon, CloudLightning, Activity, FileText, Database, Settings,
  Bell, ChevronDown, Plus, Minus, Layers, AlertTriangle, ArrowRight, Play,
  Droplets, Wind, Gauge, Cloud, MapPin, Info, ArrowUp, ArrowDown
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const navItems = [
  { icon: Home, label: 'Overview', active: true },
  { icon: MapIcon, label: 'Live Map' },
  { icon: CloudLightning, label: 'Forecast' },
  { icon: AlertTriangle, label: 'Anomalies' },
  { icon: Activity, label: 'Analytics' },
  { icon: FileText, label: 'AI Insights' },
  { icon: Database, label: 'Reports' },
  { icon: Layers, label: 'Data Sources' },
  { icon: Settings, label: 'Settings' },
];

const tempForecastData = [
  { time: 'Now', temp: 43.8 },
  { time: '<12h', temp: 45.1 },
  { time: '+24h', temp: 46.5 },
  { time: '+48h', temp: 47.2 },
  { time: '+72h', temp: 44.0 },
];

const anomalyDistributionData = [
  { name: 'Heatwave', value: 42, color: '#ef4444' },
  { name: 'Extreme Rainfall', value: 28, color: '#3b82f6' },
  { name: 'Drought', value: 16, color: '#eab308' },
  { name: 'Severe Storm', value: 9, color: '#8b5cf6' },
  { name: 'Flood Risk', value: 5, color: '#06b6d4' },
];

const topRegions = [
  { rank: 1, region: 'Punjab', event: 'Heatwave', icon: Thermometer, color: 'text-red-500', score: 92.4 },
  { rank: 2, region: 'Assam', event: 'Extreme Rainfall', icon: CloudRain, color: 'text-blue-500', score: 87.1 },
  { rank: 3, region: 'Rajasthan', event: 'Drought', icon: SunDim, color: 'text-yellow-500', score: 84.3 },
  { rank: 4, region: 'Odisha', event: 'Cyclone Risk', icon: Tornado, color: 'text-purple-500', score: 81.6 },
  { rank: 5, region: 'Madhya Pradesh', event: 'Heatwave', icon: Thermometer, color: 'text-red-500', score: 78.9 },
];

const recentAlerts = [
  { title: 'High Heatwave Risk', desc: 'Punjab, India', time: 'May 21, 14:20', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/20' },
  { title: 'Heavy Rainfall Warning', desc: 'Assam, India', time: 'May 21, 11:05', icon: CloudRain, color: 'text-blue-500', bg: 'bg-blue-500/20' },
  { title: 'Cyclone Alert', desc: 'Bay of Bengal', time: 'May 21, 08:30', icon: Tornado, color: 'text-purple-500', bg: 'bg-purple-500/20' },
  { title: 'Air Quality Degradation', desc: 'Delhi, India', time: 'May 20, 19:15', icon: Wind, color: 'text-orange-500', bg: 'bg-orange-500/20' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-300 font-sans flex overflow-hidden selection:bg-blue-500/30">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-4 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center shrink-0">
            <Globe2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold tracking-tight text-lg leading-tight">ClimateWatch AI</h1>
            <p className="text-[10px] text-slate-400">Predict Today, Safer Tomorrow.</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Promo Card */}
        <div className="p-4">
          <div className="bg-gradient-to-b from-teal-900/40 to-blue-900/40 border border-slate-700/50 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl rounded-full translate-x-10 -translate-y-10"></div>
            <div className="flex justify-center mb-3">
              <Globe2 className="w-12 h-12 text-teal-400" />
            </div>
            <h3 className="text-white font-semibold mb-1 text-sm">A Safer Climate-Resilient Tomorrow</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Leveraging AI for a sustainable and resilient planet.</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-[#0b1120]">
          <div>
            <h2 className="text-white font-semibold text-lg">AI-Driven Spatio-Temporal Tracking of Extreme Weather Anomalies</h2>
            <p className="text-sm text-slate-400">in Medium-Range Forecasts</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5 text-sm cursor-pointer">
              <span className="text-slate-300">May 21, 2024</span>
              <ChevronDown className="w-4 h-4 ml-2 text-slate-500" />
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm text-slate-300 font-medium">Live</span>
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#0b1120]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm border border-slate-700 cursor-pointer">
              AV
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#070b14]">
          
          {/* Stats Row */}
          <div className="grid grid-cols-6 gap-4">
            {[
              { icon: Thermometer, label: 'Heatwave Events', value: '27', trend: '▲ 18%', trendUp: true, color: 'text-red-500', bg: 'bg-red-500/10' },
              { icon: CloudRain, label: 'Extreme Rainfall', value: '18', trend: '▲ 12%', trendUp: true, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { icon: SunDim, label: 'Drought Conditions', value: '9', trend: '▼ 29%', trendUp: false, color: 'text-amber-600', bg: 'bg-amber-500/10' },
              { icon: Tornado, label: 'Severe Storms', value: '6', trend: '▲ 20%', trendUp: true, color: 'text-teal-400', bg: 'bg-teal-500/10' },
              { icon: Globe2, label: 'Monitored Regions', value: '124', trend: '▲ 8%', trendUp: true, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 flex items-center gap-4">
                <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white leading-none mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-medium mb-1">{stat.label}</div>
                  <div className={`text-[10px] font-medium flex items-center gap-1 ${stat.trendUp ? 'text-red-400' : 'text-emerald-400'}`}>
                    {stat.trend} vs. last month
                  </div>
                </div>
              </div>
            ))}
            
            {/* Overall Risk Card */}
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-700/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden">
              <div className="p-3 rounded-full bg-amber-500/20 text-amber-500 z-10">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="z-10">
                <div className="text-xl font-bold text-amber-500 leading-none mb-1">Moderate</div>
                <div className="text-xs text-slate-300 font-medium mb-1">Overall Risk Level</div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 cursor-pointer hover:text-slate-300">
                  Stable <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-4 gap-6 h-[480px]">
            {/* Map Area */}
            <div className="col-span-3 bg-slate-800/40 border border-slate-700/50 rounded-xl relative overflow-hidden flex flex-col">
              {/* Map Header Overlay */}
              <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none">
                <div className="flex items-center gap-3 bg-[#0b1120]/80 backdrop-blur border border-slate-700 rounded-lg p-3 pointer-events-auto">
                  <div className="text-blue-400"><MapIcon className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Live Weather Anomaly Map</h3>
                    <p className="text-xs text-slate-400">Real-time and forecasted extreme weather events</p>
                  </div>
                </div>

                <div className="flex gap-2 pointer-events-auto">
                   <div className="flex bg-[#0b1120]/80 backdrop-blur border border-slate-700 rounded-lg overflow-hidden text-sm">
                      <button className="px-4 py-1.5 bg-blue-600/20 text-blue-400 border-b-2 border-blue-500 font-medium">India</button>
                      <button className="px-4 py-1.5 hover:bg-slate-700/50">South Asia</button>
                      <button className="px-4 py-1.5 hover:bg-slate-700/50">World</button>
                   </div>
                   <div className="relative">
                     <input type="text" placeholder="Search location..." className="bg-[#0b1120]/80 backdrop-blur border border-slate-700 rounded-lg pl-3 pr-8 py-1.5 text-sm w-48 focus:outline-none focus:border-slate-500" />
                     <SearchIcon className="w-4 h-4 absolute right-2.5 top-2 text-slate-400" />
                   </div>
                </div>
              </div>

              {/* Map Controls Overlay (Left) */}
              <div className="absolute left-4 top-24 flex flex-col gap-2 z-10 pointer-events-auto">
                <div className="bg-[#0b1120]/80 backdrop-blur border border-slate-700 rounded-lg flex flex-col">
                  <button className="p-2 hover:bg-slate-700/50 border-b border-slate-700"><Plus className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-slate-700/50"><Minus className="w-4 h-4" /></button>
                </div>
                <button className="p-2 bg-[#0b1120]/80 backdrop-blur border border-slate-700 rounded-lg hover:bg-slate-700/50">
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              {/* Layers & Types Overlay (Right) */}
              <div className="absolute right-4 top-20 bottom-24 w-56 flex flex-col gap-4 z-10 pointer-events-auto overflow-y-auto custom-scrollbar">
                 <div className="bg-[#0b1120]/90 backdrop-blur border border-slate-700 rounded-lg p-4">
                   <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Layers</h4>
                   <div className="space-y-2.5">
                     {['Temperature', 'Rainfall', 'Wind', 'Humidity', 'Pressure', 'Cloud Cover'].map((layer, i) => (
                       <label key={i} className="flex items-center gap-2 cursor-pointer group">
                         <input type="checkbox" defaultChecked={i < 2} className="rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-slate-900" />
                         <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{layer}</span>
                       </label>
                     ))}
                   </div>
                 </div>
                 <div className="bg-[#0b1120]/90 backdrop-blur border border-slate-700 rounded-lg p-4">
                   <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Anomaly Types</h4>
                   <div className="space-y-2.5">
                     {[
                       { name: 'Heatwave', icon: Thermometer, color: 'text-red-500' },
                       { name: 'Extreme Rainfall', icon: CloudRain, color: 'text-blue-500' },
                       { name: 'Drought', icon: SunDim, color: 'text-amber-500' },
                       { name: 'Severe Storm', icon: Tornado, color: 'text-purple-500' },
                       { name: 'Flood Risk', icon: Droplets, color: 'text-cyan-500' },
                       { name: 'Weather Stations', icon: MapPin, color: 'text-slate-300', defaultOn: true }
                     ].map((type, i) => (
                       <label key={i} className="flex items-center gap-2 cursor-pointer group">
                         <input type="checkbox" defaultChecked={i < 4 || type.defaultOn} className="rounded border-slate-600 bg-slate-800 text-blue-500" />
                         <type.icon className={`w-3.5 h-3.5 ${type.color}`} />
                         <span className="text-sm text-slate-400 group-hover:text-slate-200">{type.name}</span>
                       </label>
                     ))}
                   </div>
                   <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between">
                     <span className="text-xs text-slate-400">View Satellite</span>
                     <div className="w-7 h-4 bg-slate-700 rounded-full relative cursor-pointer">
                        <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-slate-400 rounded-full"></div>
                     </div>
                   </div>
                 </div>
              </div>

              {/* Fake Map Background (representing the dark map style) */}
              <div className="flex-1 bg-[#1e293b] w-full h-full relative overflow-hidden" 
                   style={{
                     backgroundImage: `radial-gradient(#334155 1px, transparent 1px)`,
                     backgroundSize: '24px 24px'
                   }}>
                {/* Simulated Map Markers */}
                <div className="absolute top-[40%] left-[30%] animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                    <Thermometer className="w-4 h-4 text-red-500" />
                  </div>
                </div>
                <div className="absolute top-[30%] left-[32%] text-xs font-bold text-slate-400">PUNJAB</div>

                <div className="absolute top-[50%] left-[45%] animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                    <CloudRain className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
                
                <div className="absolute top-[65%] left-[35%] animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center">
                    <SunDim className="w-4 h-4 text-amber-500" />
                  </div>
                </div>
                <div className="absolute top-[55%] left-[55%] text-xs font-bold text-slate-500 tracking-widest">BAY OF BENGAL</div>
              </div>

              {/* Timeline Slider Overlay (Bottom) */}
              <div className="absolute bottom-4 left-4 right-4 z-10 bg-[#0b1120]/90 backdrop-blur border border-slate-700 rounded-lg p-4 pointer-events-auto">
                 <div className="flex items-center justify-between mb-2">
                   <div>
                     <span className="text-white font-medium text-sm mr-2">May 21, 2024</span>
                     <span className="text-slate-400 text-sm">14:30 IST</span>
                     <div className="text-xs text-blue-400 mt-0.5">Real-time data</div>
                   </div>
                   <div className="flex gap-2">
                     <button className="p-1.5 bg-slate-800 rounded hover:bg-slate-700 text-slate-300"><Play className="w-4 h-4" /></button>
                     <button className="p-1.5 bg-slate-800 rounded hover:bg-slate-700 text-slate-300"><ChevronDown className="w-4 h-4 rotate-90" /></button>
                   </div>
                 </div>
                 
                 <div className="relative mt-6 px-2">
                    <div className="h-1 bg-slate-700 rounded-full w-full"></div>
                    <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-500 -translate-x-1/2"></div>
                    
                    {/* Timeline markers */}
                    <div className="absolute -top-1 left-0 w-3 h-3 rounded-full bg-slate-600"></div>
                    <div className="absolute -top-1 left-1/4 w-3 h-3 rounded-full bg-slate-600"></div>
                    <div className="absolute -top-1 left-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <div className="absolute -top-1 left-3/4 w-3 h-3 rounded-full bg-slate-600"></div>
                    <div className="absolute -top-1 right-0 w-3 h-3 rounded-full bg-slate-600"></div>

                    {/* Labels */}
                    <div className="flex justify-between text-[10px] text-slate-400 mt-2">
                      <span>-72h</span>
                      <span>-48h</span>
                      <span>-24h</span>
                      <span className="text-blue-400 font-medium">Now</span>
                      <span>+24h</span>
                      <span>+48h</span>
                      <span>+72h</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right Column (2 Cards) */}
            <div className="flex flex-col gap-6">
              {/* Anomaly Detection Details */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-white">Anomaly Detection</h3>
                  <a href="#" className="text-xs text-blue-400 flex items-center hover:underline">View Details <ArrowRight className="w-3 h-3 ml-1" /></a>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-300 mb-4">
                  <MapPin className="w-4 h-4 text-slate-500" /> Punjab, India
                  <span className="ml-auto text-[10px] text-slate-500">31.1°N, 75.3°E</span>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-red-500" />
                    <span className="font-medium text-red-500 text-sm">Heatwave Detected</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-red-500/20 text-red-400 rounded">HIGH RISK</span>
                </div>

                <div className="space-y-3 flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Temperature (Current)</span>
                    <span className="text-white font-medium">43.8 °C</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Normal (Historical Avg.)</span>
                    <span className="text-slate-300">37.2 °C</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-slate-700/50 pb-3">
                    <span className="text-slate-400">Deviation</span>
                    <span className="text-red-400 font-medium">+6.6 °C</span>
                  </div>
                  <div className="pt-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Confidence</span>
                      <span className="text-white font-medium">91%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5 mb-3">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Expected Duration</span>
                    <span className="text-white font-medium">3 - 5 days</span>
                  </div>
                </div>

                <button className="w-full mt-4 py-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-600/20 transition-colors">
                  View AI Explanation
                </button>
              </div>

              {/* Weather Anomaly Analysis (Heatmap placeholder) */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 h-[200px] flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-white text-sm">Weather Anomaly Analysis</h3>
                  <div className="flex items-center text-xs text-slate-400 cursor-pointer">
                    Last 7 days <ChevronDown className="w-3 h-3 ml-1" />
                  </div>
                </div>
                <div className="flex-1 bg-slate-900 rounded-lg border border-slate-700/50 relative overflow-hidden flex items-center justify-center">
                   {/* Abstract representation of a heatmap */}
                   <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#1e293b] to-slate-900 opacity-80"></div>
                   
                   {/* Fake map shape with heatmap colors */}
                   <div className="relative w-3/4 h-3/4 blur-xl opacity-60">
                      <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-red-500 rounded-full mix-blend-screen"></div>
                      <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-yellow-500 rounded-full mix-blend-screen"></div>
                      <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-blue-500 rounded-full mix-blend-screen"></div>
                      <div className="absolute top-1/4 right-1/4 w-14 h-14 bg-green-500 rounded-full mix-blend-screen"></div>
                   </div>
                   <MapIcon className="w-16 h-16 text-slate-700 absolute opacity-50" />

                   {/* Legend */}
                   <div className="absolute right-2 top-2 bottom-2 w-2 flex flex-col justify-between items-center py-1">
                     <span className="text-[8px] text-slate-400 leading-none">High</span>
                     <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-red-500 via-yellow-500 to-blue-500"></div>
                     <span className="text-[8px] text-slate-400 leading-none">Low</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-4 gap-6 h-[260px]">
            
            {/* Forecast Chart */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 flex flex-col">
              <h3 className="font-semibold text-white text-sm mb-4">Forecast: Temperature (Punjab)</h3>
              <div className="flex-1 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tempForecastData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={[30, 50]} ticks={[30, 35, 40, 45, 50]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }}
                      itemStyle={{ color: '#ef4444' }}
                    />
                    <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} dot={{ r: 4, fill: '#ef4444', strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
                {/* Overlay annotation */}
                <div className="absolute bottom-8 right-8 bg-slate-900/80 border border-slate-700 backdrop-blur p-2 rounded text-center">
                  <p className="text-[10px] text-slate-300 mb-1">Extreme heat likely to persist<br/>for next 48-72 hours.</p>
                  <div className="bg-red-500/20 text-red-400 text-xs font-bold py-1 px-2 rounded">84% probability</div>
                </div>
              </div>
            </div>

            {/* Top Regions Table */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white text-sm">Top Regions by Anomaly Risk</h3>
                <a href="#" className="text-xs text-blue-400 flex items-center hover:underline">View All <ArrowRight className="w-3 h-3 ml-1" /></a>
              </div>
              <div className="flex-1 overflow-auto custom-scrollbar pr-2">
                <table className="w-full text-sm text-left text-slate-300">
                  <thead className="text-xs text-slate-400 border-b border-slate-700/50">
                    <tr>
                      <th className="font-medium pb-2 w-8">#</th>
                      <th className="font-medium pb-2">Region</th>
                      <th className="font-medium pb-2">Event</th>
                      <th className="font-medium pb-2 text-right">Risk Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {topRegions.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                        <td className="py-2 text-slate-500">{row.rank}</td>
                        <td className="py-2 font-medium">{row.region}</td>
                        <td className="py-2">
                          <div className="flex items-center gap-1.5 text-xs">
                            <row.icon className={`w-3.5 h-3.5 ${row.color}`} />
                            {row.event}
                          </div>
                        </td>
                        <td className="py-2 text-right font-medium text-white">{row.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Anomaly Distribution Donut */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 flex flex-col">
               <h3 className="font-semibold text-white text-sm mb-2">Anomaly Distribution</h3>
               <div className="flex-1 flex items-center">
                 <div className="w-1/2 h-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={anomalyDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={55}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {anomalyDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xl font-bold text-white leading-none">64</span>
                      <span className="text-[10px] text-slate-400">Total Events</span>
                    </div>
                 </div>
                 
                 <div className="w-1/2 pl-2 space-y-2">
                   {anomalyDistributionData.map((item, idx) => (
                     <div key={idx} className="flex items-center justify-between text-xs">
                       <div className="flex items-center gap-1.5">
                         <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                         <span className="text-slate-300 truncate w-20">{item.name}</span>
                       </div>
                       <span className="text-slate-400 font-medium">{item.value}%</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white text-sm">Recent Alerts</h3>
                <a href="#" className="text-xs text-blue-400 flex items-center hover:underline">View All <ArrowRight className="w-3 h-3 ml-1" /></a>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1">
                {recentAlerts.map((alert, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${alert.bg}`}>
                      <alert.icon className={`w-4 h-4 ${alert.color}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-200 leading-tight">{alert.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-slate-400">{alert.desc}</span>
                        <span className="text-[10px] text-slate-500 whitespace-nowrap ml-4">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          
          {/* Footer Footer Info */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800/50">
            <div className="flex gap-4">
               <span>ClimateWatch AI</span>
               <span>Ministry of Earth for a Resilient Future</span>
            </div>
            <div className="flex gap-4">
               <a href="#" className="hover:text-slate-300">About</a>
               <a href="#" className="hover:text-slate-300">Contact</a>
               <a href="#" className="hover:text-slate-300">Help</a>
               <a href="#" className="hover:text-slate-300">Privacy</a>
               <a href="#" className="hover:text-slate-300">Terms</a>
            </div>
          </div>

        </div>
      </main>

      {/* Basic Custom Scrollbar Styles for nested scrollable areas */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}} />
    </div>
  );
}

// Minimal Search Icon placeholder since it's used inside the map search input
function SearchIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )
}