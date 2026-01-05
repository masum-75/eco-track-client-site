import React, { useContext } from "react";
import { Outlet, NavLink, Link } from "react-router";

import {
  FaHome,
  FaUsers,
  FaTasks,
  FaUserCircle,
  FaPlusCircle,
  FaHistory,
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);

  // TODO: Ekhane backend theke role fetch hobe.
  const role = "admin"; 

  const sidebarLinks = (
    <ul className="space-y-3 font-bold uppercase text-[10px] tracking-widest mt-10">
      {/* Common Links */}
      <SidebarItem
        to="/dashboard/user-home"
        icon={<FaUserCircle />}
        label="Overview"
      />

      {/* User Only Links */}
      {role === "user" && (
        <SidebarItem
          to="/dashboard/my-activities"
          icon={<FaHistory />}
          label="My Progress"
        />
      )}

      {/* Staff & Admin Links */}
      {(role === "staff" || role === "admin") && (
        <SidebarItem
          to="/dashboard/manage-challenges"
          icon={<FaTasks />}
          label="Manage Tasks"
        />
      )}

      {/* Admin Only Links */}
      {role === "admin" && (
        <>
          <div className="pt-4 pb-2 border-t border-slate-800 text-slate-500">
            Administration
          </div>
          <SidebarItem
            to="/dashboard/manage-users"
            icon={<FaUsers />}
            label="All Users"
          />
          <SidebarItem
            to="/challenges-add"
            icon={<FaPlusCircle />}
            label="Create Challenge"
          />
        </>
      )}

      <div className="pt-10">
        <Link
          to="/"
          className="flex items-center gap-3 p-3 text-slate-400 hover:text-emerald-500 transition-all uppercase"
        >
          <FaHome /> Back to Home
        </Link>
      </div>
    </ul>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar Section */}
      <div className="w-64 bg-slate-900 text-white p-6 sticky top-0 h-screen hidden lg:block border-r border-slate-800 transition-all">
        <Link to="/" className="flex items-center gap-2 group mb-10">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500 transition-all duration-500">
            <span className="text-emerald-500 font-black text-xl">E</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            Eco<span className="text-emerald-500 italic">Track</span>
          </span>
        </Link>
        {/* Render Sidebar Links */}
        {sidebarLinks}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white dark:bg-slate-900 p-6 flex justify-between items-center border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-black uppercase tracking-widest text-[10px] text-slate-500">
            Dashboard / <span className="text-emerald-500">{role}</span>
          </h3>
          <div className="flex items-center gap-4">
             <span className="text-xs font-bold dark:text-slate-400">{user?.displayName}</span>
             <button
                onClick={signOutUser}
                className="btn btn-xs bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border-none rounded-lg font-bold px-4"
              >
                Log Out
              </button>
          </div>
        </header>

        <main className="p-8 flex-1">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ to, icon, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl transition-all ${
          isActive
            ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  </li>
);

export default DashboardLayout;