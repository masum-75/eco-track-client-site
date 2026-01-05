import React from "react";
import { FaCalendarCheck } from "react-icons/fa";
import EventsCard from "../EventsCard";
import { Link } from "react-router";
import useEvents from "../../Hooks/useEvents";

const UpcomingEvents = () => {
  const { events } = useEvents();

  const recentEvents = events ? [...events].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 4) : [];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500" id="upcoming-events">
      <div className="container mx-auto px-6 lg:px-10">
        
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-4 text-emerald-500">
            <FaCalendarCheck size={28} className="animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Upcoming <span className="text-emerald-500">Events</span>
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Join our community initiatives and make a real difference in the environment. 
            Together, we can build a sustainable future.
          </p>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto mt-6 rounded-full opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recentEvents.map((event) => (
            <EventsCard key={event._id} event={event} />
          ))}
        </div>

        <div className="text-center mt-20">
          <Link 
            to={"/events"} 
            className="inline-flex items-center gap-2 px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-2xl transition-all duration-300 shadow-[0_10px_25px_rgba(16,185,129,0.2)] hover:scale-105 active:scale-95 group"
          >
            View All Events
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;