import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden relative">
      
      
      <div className="absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>

      <div className="flex flex-col items-center relative z-10">
        <div className="relative flex items-center justify-center">
  
          <div className="w-20 h-20 border-2 border-slate-100 dark:border-slate-800 rounded-full"></div>
          
        
          <div className="absolute w-20 h-20 border-t-4 border-emerald-500 rounded-full animate-spin"></div>
          
       
          <div className="absolute w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
        </div>

       
        <div className="mt-8 text-center">
          <p className="text-slate-950 dark:text-white font-black text-xs uppercase tracking-[0.4em] animate-pulse">
            Syncing <span className="text-emerald-500">Eco</span> System
          </p>
          <div className="flex gap-1 justify-center mt-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>

     
      <div className="absolute bottom-10 text-[8px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-800">
        Processing Environmental Data
      </div>
    </div>
  );
};

export default Loading;