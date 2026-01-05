import React from "react";
import { Link } from "react-router";
import useEcoTips from "../Hooks/useEcoTips";
import EcoTipCard from "../Components/EcoTipCard";
import EcoTipCardSkeleton from "../Components/EcoTipCardSkeleton";
import Container from "../Layouts/Container";
import { FaLightbulb, FaPlus } from "react-icons/fa";

const EcoTips = () => {
  const { EcoTips, loading, error } = useEcoTips();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 py-20">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <span className="flex items-center justify-center md:justify-start gap-2 text-emerald-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4">
              <FaLightbulb /> Community Wisdom
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">
              Eco <span className="text-emerald-500">Tips</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl">
              Discover and share sustainable living hacks from our global community of eco-warriors.
            </p>
          </div>

          {/* CTA: Share a Tip */}
          <Link
            to="/dashboard/add-tip" // Change this path based on your route
            className="group flex items-center gap-3 bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 px-8 py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <FaPlus className="group-hover:rotate-90 transition-transform" />
            Share Your Tip
          </Link>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <EcoTipCardSkeleton key={n} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-500/10 rounded-[3rem] border border-red-500/20">
            <p className="text-red-500 font-bold tracking-tight">Error: {error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {EcoTips.map((tip) => (
              <EcoTipCard key={tip._id} tip={tip} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && EcoTips.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-xl">No tips found. Be the first to share!</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default EcoTips;