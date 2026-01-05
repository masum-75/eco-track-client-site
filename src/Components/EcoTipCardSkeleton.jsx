import React from "react";

const EcoTipCardSkeleton = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between h-full animate-pulse">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        </div>
        <div className="h-7 w-full bg-slate-200 dark:bg-slate-800 rounded-lg mb-4"></div>
        <div className="space-y-3 mb-6 pl-4 border-l-2 border-slate-200 dark:border-slate-800">
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
      </div>
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-2 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
        </div>
        <div className="h-10 w-16 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>
    </div>
  );
};

export default EcoTipCardSkeleton;