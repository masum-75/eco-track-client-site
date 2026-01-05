import React, { useState } from "react";
import { FaArrowUp, FaRegCalendarAlt, FaUserCircle, FaTag } from "react-icons/fa";
import axios from "axios";

const EcoTipCard = ({ tip }) => {
  const { _id, title, content, category, author, authorName, upvotes, createdAt } = tip;
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric"
  });

  const [voteCount, setVoteCount] = useState(upvotes);
  const [isVoting, setIsVoting] = useState(false);

  const handleUpvote = async () => {
    if (isVoting) return;
    setIsVoting(true);
    try {
      setVoteCount(prev => prev + 1);
      await axios.patch(`https://eco-track-server-orcin.vercel.app/tips/${_id}/upvote`);
    } catch (error) {
      console.error("Error upvoting:", error);
      setVoteCount(prev => prev - 1);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="group bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:border-emerald-500/30 h-full">
      
      <div>
        <div className="flex justify-between items-center mb-6">
          <span className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full">
            <FaTag size={10} /> {category}
          </span>
          <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold flex items-center gap-1">
            <FaRegCalendarAlt /> {formattedDate}
          </span>
        </div>

        <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-emerald-500 transition-colors duration-300">
          {title}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-4 italic border-l-2 border-slate-200 dark:border-slate-800 pl-4">
          "{content}"
        </p>
      </div>

      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-full text-slate-500">
            <FaUserCircle size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              {authorName || "Eco Member"}
            </span>
            <span className="text-[10px] text-slate-500 truncate max-w-[100px]">
              {author}
            </span>
          </div>
        </div>

        <button
          onClick={handleUpvote}
          disabled={isVoting}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs transition-all duration-300 shadow-lg ${
            isVoting 
            ? "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed" 
            : "bg-emerald-500 hover:bg-emerald-600 text-slate-950 active:scale-95"
          }`}
        >
          <FaArrowUp className={isVoting ? "animate-bounce" : ""} />
          <span>{voteCount}</span>
        </button>
      </div>
    </div>
  );
};

export default EcoTipCard;