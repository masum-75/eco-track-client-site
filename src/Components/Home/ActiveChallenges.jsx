import React, { useMemo } from 'react';
import useChallenges from '../../Hooks/useChallenges';
import ActiveChallengesCard from '../ActiveChallengesCard';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Flame, ArrowRight } from 'lucide-react';

const ActiveChallenges = () => {
    const { challenges, loading } = useChallenges();

    // useMemo use kora hoyeche jate protibar re-render-e sorting/filtering na hoy
    const activeChallenges = useMemo(() => {
        const today = new Date();
        return challenges
            .filter(challenge => {
                const start = new Date(challenge.startDate);
                const end = new Date(challenge.endDate);
                return today >= start && today <= end;
            })
            .sort((a, b) => b._id.localeCompare(a._id))
            .slice(0, 4);
    }, [challenges]);

    return (
        <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 relative">
            {/* Ambient Background Light */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
                    >
                        <Flame size={14} className="animate-pulse" /> Live Now
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
                        Active <span className="text-emerald-500 italic">Missions</span>
                    </h2>
                    
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                        Measure your impact and spark inspiration. Turn eco-actions into daily habits with our currently running sustainability challenges.
                    </p>
                </div>

                {/* Challenge Cards Grid */}
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                    {activeChallenges.map((challenge, index) => (
                        <motion.div
                            key={challenge._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ActiveChallengesCard challenge={challenge} />
                        </motion.div>
                    ))}
                </div>

                {/* Empty State Management */}
                {!loading && activeChallenges.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
                        <p className="text-slate-400 font-bold italic tracking-widest uppercase text-xs">No active missions found at this moment.</p>
                    </div>
                )}

                {/* Footer Action */}
                <div className="mt-16 text-center">
                    <Link 
                        to="/challenges" 
                        className="group inline-flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-xl hover:shadow-emerald-500/10"
                    >
                        View All Challenges 
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ActiveChallenges;