import React from "react";
import { useNavigate } from "react-router";
import { AlertCircle, Home, Map } from "lucide-react";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-950 text-center px-6 overflow-hidden transition-colors duration-500">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]"></div>

      <div className="relative z-10">
        {/* Animated Icon */}
        <div className="relative mb-8 inline-block">
          <Map className="w-32 h-32 text-emerald-500/20 absolute -top-4 -left-4 animate-ping" />
          <div className="relative bg-emerald-500 dark:bg-emerald-500 p-8 rounded-[2.5rem] shadow-2xl shadow-emerald-500/20 transform rotate-12 hover:rotate-0 transition-transform duration-500">
             <AlertCircle className="w-16 h-16 text-slate-950" />
          </div>
        </div>

        {/* Text Section */}
        <h1 className="text-[12rem] md:text-[16rem] font-black text-slate-100 dark:text-slate-900 leading-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 tracking-tighter">
          404
        </h1>
        
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
          Lost in the <span className="text-emerald-500 italic">Wild?</span>
        </h2>
        
        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-md mx-auto mb-12 font-medium leading-relaxed">
          The path you're looking for has been reclaimed by nature or never existed in this ecosystem.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-10 py-5 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20"
          >
            <Home size={20} className="group-hover:-translate-y-1 transition-transform" />
            Back to Base
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-10 py-5 rounded-2xl font-black transition-all hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Retrace Steps
          </button>
        </div>
      </div>

      {/* Footer Tag */}
      <div className="absolute bottom-10 text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 dark:text-slate-800">
        EcoTrack Intelligence System
      </div>
    </div>
  );
};

export default Error404;