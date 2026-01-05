import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaLeaf, FaBolt, FaGlobeAmericas } from 'react-icons/fa';

// Mock data for the chart (Trend of CO2 savings)
const data = [
  { name: 'Jan', savings: 40 }, { name: 'Feb', savings: 30 },
  { name: 'Mar', savings: 60 }, { name: 'Apr', savings: 45 },
  { name: 'May', savings: 90 }, { name: 'Jun', savings: 75 },
];

const UserHome = () => {
  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Eco <span className="text-emerald-500 italic">Pulse</span>
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Real-time Environmental Impact</p>
        </div>
        <div className="px-6 py-2 bg-emerald-500 text-slate-950 font-black rounded-full text-[10px] uppercase tracking-widest animate-pulse">
          Live Tracking
        </div>
      </div>

      {/* Futuristic Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard icon={<FaLeaf />} label="CO2 Saved" value="120.5" unit="kg" color="text-emerald-500" />
        <StatCard icon={<FaBolt />} label="Energy Offset" value="840" unit="kWh" color="text-amber-400" />
        <StatCard icon={<FaGlobeAmericas />} label="Eco Rank" value="#12" unit="Global" color="text-blue-500" />
      </div>

      {/* Visual Analytics Section */}
      <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="mb-8">
          <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-widest">Impact Velocity</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Monthly CO₂ Offset Trend</p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '20px', backgroundColor: '#0f172a', border: 'none', color: '#fff' }}
                itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey="savings" 
                stroke="#10b981" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorSavings)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Sub-component for Stat Cards
const StatCard = ({ icon, label, value, unit, color }) => (
  <div className="group p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all duration-500 relative overflow-hidden">
    <div className={`text-2xl mb-4 ${color} group-hover:scale-125 transition-transform duration-500`}>
      {icon}
    </div>
    <div className="flex items-baseline gap-2">
      <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</h2>
      <span className="text-slate-400 font-bold text-xs uppercase">{unit}</span>
    </div>
    <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] mt-2">{label}</p>
    
    {/* Subtle Background Glow */}
    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>
  </div>
);

export default UserHome;