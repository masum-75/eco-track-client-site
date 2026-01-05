import React from "react";
import Container from "../Layouts/Container";

const ActiveChallengesCardSkeleton = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-pulse min-h-[400px]">
        
        <div className="w-full h-64 md:h-full bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-slate-700/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>

        <div className="p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-2xl w-3/4 mb-6"></div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3"></div>
              </div>
            </div>

            <div className="mt-10 space-y-3">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-full"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-[90%]"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-[40%]"></div>
            </div>
          </div>

          
          <div className="h-14 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-2xl w-full mt-8 border border-emerald-500/10"></div>
        </div>
      </div>
    </Container>
  );
};

export default ActiveChallengesCardSkeleton;