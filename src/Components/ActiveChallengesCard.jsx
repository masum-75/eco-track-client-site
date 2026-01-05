import React from "react";
import { Link } from "react-router";
import { FaArrowRight, FaClock, FaUsers } from "react-icons/fa";

const ActiveChallengesCard = ({ challenge }) => {
  return (
    <div className="group flex flex-col bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-500 h-full">
      
      {/* Visual Section - Image on Top */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={challenge.imageUrl} 
          alt={challenge.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
           {challenge.category}
        </div>
        {/* Overlay gradient for a premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Info Section */}
      <div className="p-6 lg:p-8 flex flex-col flex-grow">
        <div className="flex-grow">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 line-clamp-2 group-hover:text-emerald-500 transition-colors duration-300 min-h-[56px]">
            {challenge.title}
          </h2>

          <div className="flex items-center justify-between border-y border-slate-200/50 dark:border-slate-800/50 py-4 mb-6">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <FaClock className="text-emerald-500 text-xs" />
                <span className="text-[11px] font-black uppercase tracking-wider">{challenge.duration} Days</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <FaUsers className="text-emerald-500 text-xs" />
                <span className="text-[11px] font-black uppercase tracking-wider">{challenge.participants} Joined</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link 
          to={`/challenges/${challenge._id}`} 
          className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-800 group-hover:bg-emerald-500 text-white group-hover:text-slate-950 py-4 rounded-xl font-black transition-all duration-300 shadow-md text-xs uppercase tracking-[0.1em]"
        >
          Explore Mission <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ActiveChallengesCard;