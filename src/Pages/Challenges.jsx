import React, { useState } from "react";
import ActiveChallengesCard from "../Components/ActiveChallengesCard";
import Loading from "./Loading";
import useAllChallenges from "../Hooks/useAllChallenges";
import ActiveChallengesCardSkeleton from "../Components/ActiveChallengesCardSkeleton";
import { FaFilter, FaSearch } from "react-icons/fa";

const Challenges = () => {
  const [participantsMinInput, setParticipantsMinInput] = useState("");
  const [participantsMaxInput, setParticipantsMaxInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [startDateFromInput, setStartDateFromInput] = useState("");
  const [startDateToInput, setStartDateToInput] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({});

  const categories = [
    "Waste Reduction", "Energy Saving", "Water Conservation",
    "Community Clean-Up", "Sustainable Diet", "Plastic-Free July",
  ];

  const handleApplyFilters = () => {
    const f = {};
    if (participantsMinInput) f.participantsMin = participantsMinInput;
    if (participantsMaxInput) f.participantsMax = participantsMaxInput;
    if (categoryInput) f.category = categoryInput;
    if (startDateFromInput) f.startDateFrom = startDateFromInput;
    if (startDateToInput) f.startDateTo = startDateToInput;
    setAppliedFilters(f);
  };

  const { challenges, loading, error } = useAllChallenges(appliedFilters);

  const sortedChallenges = [...challenges]
    .filter((challenge) => challenge && challenge._id)
    .sort((a, b) => b._id.localeCompare(a._id));

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 py-20 px-4 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-emerald-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">
            Discovery Hub
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            All <span className="text-emerald-500">Challenges</span>
          </h2>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] mb-12 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <input
              type="number"
              placeholder="Min Joined"
              value={participantsMinInput}
              onChange={(e) => setParticipantsMinInput(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white transition-all"
            />
            <input
              type="number"
              placeholder="Max Joined"
              value={participantsMaxInput}
              onChange={(e) => setParticipantsMaxInput(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white transition-all"
            />
            <select
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm outline-none dark:text-white appearance-none"
            >
              <option value="">Categories</option>
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <input
              type="date"
              value={startDateFromInput}
              onChange={(e) => setStartDateFromInput(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm outline-none dark:text-white"
            />
            <input
              type="date"
              value={startDateToInput}
              onChange={(e) => setStartDateToInput(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm outline-none dark:text-white"
            />
            <button
              onClick={handleApplyFilters}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
            >
              <FaSearch /> Search
            </button>
          </div>
        </div>

        {/* 4-Column Grid for Challenges */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <ActiveChallengesCardSkeleton key={n} />)}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-500/10 rounded-[2rem] border border-red-500/20">
            <p className="text-red-500 font-bold">{error}</p>
          </div>
        ) : !sortedChallenges.length ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-lg">No missions found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {sortedChallenges.map((challenge) => (
              <ActiveChallengesCard key={challenge._id} challenge={challenge} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;