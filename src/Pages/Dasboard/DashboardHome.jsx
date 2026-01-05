import React from 'react';
import { FaUsers, FaLeaf, FaTrophy, FaChartLine } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DashboardHome = () => {
    // Mock data for Chart (Ekhane backend data use kora jabe)
    const data = [
        { name: 'Jan', points: 400 },
        { name: 'Feb', points: 300 },
        { name: 'Mar', points: 600 },
        { name: 'Apr', points: 800 },
        { name: 'May', points: 500 },
    ];

    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                    System <span className="text-emerald-500 font-italic">Overview</span>
                </h2>
                <p className="text-slate-500 text-sm font-bold mt-1 uppercase tracking-widest">Welcome back, Eco Warrior!</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<FaUsers />} title="Total Users" value="1,250" color="bg-blue-500" />
                <StatCard icon={<FaLeaf />} title="CO2 Saved" value="450 kg" color="bg-emerald-500" />
                <StatCard icon={<FaTrophy />} title="Total Points" value="85,000" color="bg-amber-500" />
                <StatCard icon={<FaChartLine />} title="Active Missions" value="12" color="bg-purple-500" />
            </div>

            {/* Charts Section */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-black uppercase mb-8 dark:text-white tracking-widest">Monthly Growth</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} />
                            <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', backgroundColor: '#0f172a', color: '#fff'}}
                            />
                            <Bar dataKey="points" radius={[10, 10, 10, 10]} barSize={40}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

// Internal StatCard Component
const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 flex items-center gap-5 hover:shadow-xl transition-all duration-500 group">
        <div className={`w-14 h-14 rounded-2xl ${color} text-white flex items-center justify-center text-2xl shadow-lg shadow-${color}/20 group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{title}</p>
            <h4 className="text-2xl font-black dark:text-white tracking-tighter">{value}</h4>
        </div>
    </div>
);

export default DashboardHome;