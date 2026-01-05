import React from 'react';
import EcoTipCard from '../EcoTipCard';
import { Link } from 'react-router';
import useEcoTips from '../../Hooks/useEcoTips';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const RecentTips = () => {
    const { EcoTips } = useEcoTips();

    // Latest 6 tips sort kora holo
    const recentTips = [...EcoTips]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

    return (
        <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="text-left">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4"
                        >
                            <Sparkles size={14} /> Knowledge Base
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                            Recent <span className="text-emerald-500 italic text-outline">Eco Tips</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg font-medium text-lg leading-relaxed">
                            Stay inspired with the latest micro-habits that make a massive difference for our ecosystem.
                        </p>
                    </div>

                    <Link 
                        to="/eco-tips" 
                        className="group flex items-center gap-3 text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest border-b-2 border-emerald-500 pb-2 hover:text-emerald-500 transition-all"
                    >
                        Explore All <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                {/* Tips Grid */}
                {recentTips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentTips.map((tip, index) => (
                            <motion.div
                                key={tip._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <EcoTipCard tip={tip} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
                        <p className="text-slate-400 font-bold italic tracking-wider">Gathering fresh eco-intelligence...</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecentTips;