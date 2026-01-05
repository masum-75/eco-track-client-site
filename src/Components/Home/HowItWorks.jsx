import React from "react";
import { motion } from "framer-motion";
import { Target, BarChart2, MessageSquareHeart, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: <Target />,
    title: "Join a Challenge",
    desc: "Pick a sustainability challenge that inspires you — from waste reduction to energy saving. Take your first step toward greener living.",
    color: "bg-emerald-500"
  },
  {
    icon: <BarChart2 />,
    title: "Track Your Progress",
    desc: "Monitor your eco-actions, measure your impact, and see your personal contribution grow within the EcoTrack community.",
    color: "bg-emerald-500"
  },
  {
    icon: <MessageSquareHeart />,
    title: "Share Eco Tips",
    desc: "Inspire others by sharing practical tips and success stories — together we build a conscious, sustainable community.",
    color: "bg-emerald-500"
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It <span className="text-emerald-500 italic">Works</span>
          </motion.h2>
          <motion.p 
            className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            EcoTrack simplifies sustainable living through three measurable steps. 
            Start your journey toward a greener lifestyle today.
          </motion.p>
        </div>

        {/* Steps Path Logic */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-10"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 -right-2 w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center font-black text-xs z-20">
                0{index + 1}
              </div>

              {/* Icon Container */}
              <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl flex items-center justify-center mb-8 relative group transition-all duration-500 hover:border-emerald-500">
                <div className="text-emerald-500 group-hover:scale-110 transition-transform duration-500">
                  {React.cloneElement(step.icon, { size: 36, strokeWidth: 2.5 })}
                </div>
                
                {/* Connection Arrow for Mobile/Tablet */}
                {index !== steps.length - 1 && (
                   <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-slate-200 dark:text-slate-800 hidden md:block">
                      <ChevronRight size={24} />
                   </div>
                )}
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                {step.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium px-4">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;