import React from 'react';
import { FaCrown, FaMedal, FaTrophy } from 'react-icons/fa';

const Leaderboard = () => {
    // Mock data: Real project-e eta backend specific logic diye fetch hobe
    const warriors = [
        { id: 1, name: "Tanbir Hossain", impact: 1250, tasks: 45, image: "https://i.pravatar.cc/150?u=1" },
        { id: 2, name: "Arif Ahmed", impact: 1100, tasks: 38, image: "https://i.pravatar.cc/150?u=2" },
        { id: 3, name: "Sara Islam", impact: 950, tasks: 32, image: "https://i.pravatar.cc/150?u=3" },
        { id: 4, name: "Rakib Hasan", impact: 820, tasks: 28, image: "https://i.pravatar.cc/150?u=4" },
        { id: 5, name: "Mehedi Hasan", impact: 700, tasks: 22, image: "https://i.pravatar.cc/150?u=5" },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-amber-500/10 rounded-2xl">
                    <FaTrophy className="text-amber-500 text-3xl" />
                </div>
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Top <span className="text-emerald-500">Warriors</span></h2>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Global sustainability rankings</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {warriors.map((warrior, index) => (
                    <div 
                        key={warrior.id}
                        className={`group relative flex items-center justify-between p-6 rounded-[2rem] border transition-all duration-500 ${
                            index === 0 ? 'bg-gradient-to-r from-amber-500/10 to-transparent border-amber-500/30' : 
                            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                        } hover:scale-[1.01] hover:shadow-2xl`}
                    >
                        {/* Rank & Profile */}
                        <div className="flex items-center gap-6">
                            <div className="w-12 text-2xl font-black text-slate-400 group-hover:text-emerald-500 transition-colors">
                                {index === 0 ? <FaCrown className="text-amber-500 animate-bounce" /> : `#${index + 1}`}
                            </div>
                            <div className="relative">
                                <img src={warrior.image} alt={warrior.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-800" />
                                {index < 3 && (
                                    <div className={`absolute -top-2 -right-2 p-1 rounded-full shadow-lg ${
                                        index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-slate-300' : 'bg-orange-400'
                                    }`}>
                                        <FaMedal className="text-white text-[10px]" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{warrior.name}</h4>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{warrior.tasks} Challenges Completed</p>
                            </div>
                        </div>

                        {/* Impact Points */}
                        <div className="text-right">
                            <div className="text-2xl font-black text-emerald-500 tracking-tighter">
                                {warrior.impact} <span className="text-xs text-slate-500 uppercase">kg CO₂</span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Total Impact</p>
                        </div>

                        {/* Rank Specific Ambient Glow */}
                        {index === 0 && (
                            <div className="absolute top-0 right-0 w-32 h-full bg-amber-500/5 blur-3xl pointer-events-none"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;