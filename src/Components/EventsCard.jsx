import React from "react";
import { Link } from "react-router"; 
import { FaCalendarAlt, FaMapMarkerAlt, FaEnvelope, FaUsers, FaArrowRight } from "react-icons/fa";

const EventsCard = ({ event }) => {
  const { _id, title, description, date, location, organizer, maxParticipants, currentParticipants } = event;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).toUpperCase();

  const participantPercentage = Math.min(Math.round((currentParticipants / maxParticipants) * 100), 100);

  return (
    <div className="group bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-[2.5rem] overflow-hidden flex flex-col h-full transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30">
      
      {/* Top Emerald Accent Strip */}
      <div className="h-2 bg-emerald-500 w-full opacity-90 group-hover:opacity-100 transition-opacity"></div>

      <div className="p-8 flex flex-col h-full">
        {/* Date Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-emerald-600 dark:text-emerald-400 text-[10px] font-black tracking-[0.15em] uppercase">
            <FaCalendarAlt /> {formattedDate}
          </span>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors duration-300">
            {title}
          </h2>
          <p className="text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        <div className="space-y-5 mb-10">
          <div className="flex items-center gap-4 group/item">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/5 flex items-center justify-center text-emerald-500 border border-emerald-500/20 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-all duration-300">
              <FaMapMarkerAlt />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{location}</span>
          </div>

          <div className="flex items-center gap-4 group/item">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/5 flex items-center justify-center text-emerald-500 border border-emerald-500/20 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-all duration-300">
              <FaEnvelope />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate max-w-[180px]">
                {organizer}
            </span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-900">
          <div className="flex justify-between items-end mb-3">
            <div className="flex items-center gap-2">
              <FaUsers className="text-emerald-500/60 text-lg" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {currentParticipants} / {maxParticipants} Joined
              </span>
            </div>
            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{participantPercentage}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 p-[2px]">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              style={{ width: `${participantPercentage}%` }}
            ></div>
          </div>
        </div>

        <Link
          to={`/events/${_id}`}
          className="mt-8 flex items-center justify-center gap-3 w-full py-4 bg-slate-950 dark:bg-slate-900 hover:bg-emerald-500 text-white hover:text-slate-950 font-black rounded-2xl transition-all duration-300 shadow-xl active:scale-95 group/btn"
        >
          VIEW DETAILS
          <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default EventsCard;