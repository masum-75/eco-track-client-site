import React, { useEffect, useState, useMemo } from "react";
import { FaLeaf, FaUsers, FaCloud } from "react-icons/fa";
import { motion } from "framer-motion";
import Container from "../../Layouts/Container";
import useChallenges from "../../Hooks/useChallenges";

const EcoStatusCards = () => {
  const { challenges, loading, error } = useChallenges();

  const stats = useMemo(() => {
    if (loading || !challenges.length) return { active: 0, participants: 0, co2: 0 };

    const today = new Date();
    
    return {
      active: challenges.filter(ch => 
        new Date(ch.startDate) <= today && new Date(ch.endDate) >= today
      ).length,
      participants: challenges.reduce((sum, ch) => sum + (Number(ch.participants) || 0), 0),
      co2: challenges.reduce((sum, ch) => sum + (Number(ch.impactMetric) || 0), 0),
    };
  }, [challenges, loading]);

  if (loading) return (
    <div className="py-20 flex justify-center gap-6 max-w-7xl mx-auto px-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-40 w-full bg-slate-100 dark:bg-slate-900 animate-pulse rounded-[2rem]"></div>
      ))}
    </div>
  );

  const cardData = [
    { label: "Active Challenges", value: stats.active, icon: <FaLeaf />, unit: "" },
    { label: "Total Participants", value: stats.participants.toLocaleString(), icon: <FaUsers />, unit: "+" },
    { label: "CO₂ Saved", value: stats.co2.toLocaleString(), icon: <FaCloud />, unit: " kg" },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-emerald-500/10 rounded-full blur-[120px] -z-10"></div>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all duration-500 text-center"
            >
              {/* Floating Icon */}
              <div className="mx-auto w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-emerald-500 text-2xl mb-6 shadow-xl group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-500">
                {card.icon}
              </div>

              {/* Counter Display */}
              <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
                {card.value}{card.unit}
              </h2>
              
              <p className="text-slate-500 dark:text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
                {card.label}
              </p>

              {/* Bottom Subtle Bar */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-500/20 rounded-full group-hover:w-16 group-hover:bg-emerald-500 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default EcoStatusCards;