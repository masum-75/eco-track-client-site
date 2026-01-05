import React from 'react';
import { FaUsers, FaLeaf, FaTree, FaCheckCircle } from 'react-icons/fa';

const StatsSection = () => {
    const stats = [
        { id: 1, label: 'Active Users', value: '12K+', icon: <FaUsers /> },
        { id: 2, label: 'CO2 Reduced', value: '5.2 Tons', icon: <FaLeaf /> },
        { id: 3, label: 'Trees Planted', value: '850+', icon: <FaTree /> },
        { id: 4, label: 'Impact Score', value: '15K+', icon: <FaCheckCircle /> },
    ];

    return (
        /* Using consistent bg-white/dark:slate-950 logic */
        <section className="bg-white dark:bg-slate-950 transition-colors duration-500">
            <div className="container mx-auto px-6 lg:px-10">
                
                {/* Mission Header Section */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                   
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white m-10 leading-tight">
                        Our Mission to <span className="text-emerald-500">Heal the Planet</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                        We are committed to empowering individuals through sustainable actions. 
                        Every statistic represents a shared step towards a greener, more resilient world.
                    </p>
                </div>

                {/* Stats Wrapper with consistent border radius */}
                <div className="grid grid-cols-2 lg:grid-cols-4 my-5 gap-6 md:gap-8">
                    {stats.map((stat) => (
                        <div 
                            key={stat.id} 
                            className="group relative p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/30 transition-all duration-500 text-center overflow-hidden"
                        >
                            {/* Subtle Background Glow on Hover */}
                            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Icon - Using strict Emerald color */}
                            <div className="relative z-10 text-3xl md:text-4xl flex justify-center text-emerald-500 mb-5 group-hover:scale-110 transition-transform duration-500">
                                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                                    {stat.icon}
                                </div>
                            </div>

                            {/* Value - Bold and Professional */}
                            <h3 className="relative z-10 text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                                {stat.value}
                            </h3>

                            {/* Label - Consistent with secondary text style */}
                            <p className="relative z-10 text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-black">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;