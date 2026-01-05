import React from "react";
import { FaCalendarCheck } from "react-icons/fa";
import useEvents from "../Hooks/useEvents";
import EventsCard from "../Components/EventsCard";
import EcoTipCardSkeleton from "../Components/EcoTipCardSkeleton";
import Container from "../Layouts/Container";

const Events = () => {
  const { events, loading, error } = useEvents();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20 transition-colors duration-500">
      <Container>
        {/* Modern Header Section */}
        <div className="text-center mb-16">
          <span className="flex items-center justify-center gap-2 text-emerald-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4">
            <FaCalendarCheck /> Upcoming Gatherings
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Global <span className="text-emerald-500">Events</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Join hands with fellow eco-warriors in real-world actions. Every participant counts.
          </p>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <EcoTipCardSkeleton key={n} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-500/10 rounded-[2.5rem] border border-red-500/20">
            <p className="text-red-500 font-bold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {events.map((event) => (
              <EventsCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Events;