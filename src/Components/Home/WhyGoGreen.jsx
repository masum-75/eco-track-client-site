import React from "react";
import { Leaf, Recycle, Globe2, HeartHandshake, Zap, Footprints } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <Leaf />,
    title: "Environmental Impact",
    desc: "Small daily habits drastically cut waste, pollution, and carbon emissions for a cleaner world.",
  },
  {
    icon: <Globe2 />,
    title: "Planet Protection",
    desc: "Preserve forests, oceans, and biodiversity for future generations through mindful living.",
  },
  {
    icon: <HeartHandshake />,
    title: "Conscious Community",
    desc: "Join our network and collaborate with people who share your core ecological values.",
  },
  {
    icon: <Recycle />,
    title: "Circular Living",
    desc: "Adopt the ‘reduce, reuse, recycle’ mindset to extend product life and minimize waste.",
  },
  {
    icon: <Zap />,
    title: "Energy Efficiency",
    desc: "Smart habits reduce power bills and carbon output simultaneously. Sustainability pays off.",
  },
  {
    icon: <Footprints />,
    title: "Progress Tracking",
    desc: "Measure your impact and stay motivated with visible, data-driven green results.",
  },
];

const WhyGoGreen = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden relative" id="why-go-green">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block"
          >
            The Sustainability Shift
          </motion.span>
          
          <motion.h2
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Go <span className="text-emerald-500 italic">Green?</span>
          </motion.h2>

          <motion.p 
            className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Living sustainably isn’t just about saving the planet — it’s about optimizing your lifestyle for the future.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              className="group relative bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-500 text-emerald-500">
                {React.cloneElement(item.icon, { size: 24, strokeWidth: 2.5 })}
              </div>

              <h3 className="font-black text-slate-900 dark:text-white text-xl mb-3 tracking-tight group-hover:text-emerald-500 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {item.desc}
              </p>

              
              <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500/20">
                 <div className="w-2 h-2 rounded-full bg-current"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyGoGreen;