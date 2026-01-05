import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Container from "../../Layouts/Container";
import { FaMoon, FaSun } from "react-icons/fa"; 
import useRole from "../../Hooks/useRole"; 

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [role] = useRole();
  

  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    const html = window.document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const navStyles = "font-bold text-sm uppercase tracking-widest hover:text-emerald-500 transition-colors py-2 px-1";
  const activeStyles = "text-emerald-500 border-b-2 border-emerald-500";

  const links = (
    <>
      <li><NavLink to="/" className={({isActive}) => `${navStyles} ${isActive ? activeStyles : "text-slate-600 dark:text-slate-300"}`}>Home</NavLink></li>
      <li><NavLink to="/challenges" className={({isActive}) => `${navStyles} ${isActive ? activeStyles : "text-slate-600 dark:text-slate-300"}`}>Challenges</NavLink></li>
      <li><NavLink to="/tips" className={({isActive}) => `${navStyles} ${isActive ? activeStyles : "text-slate-600 dark:text-slate-300"}`}>Eco Tips</NavLink></li>
      <li><NavLink to="/events" className={({isActive}) => `${navStyles} ${isActive ? activeStyles : "text-slate-600 dark:text-slate-300"}`}>Events</NavLink></li>
    </>
  );

  return (
    <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <Container>
        <div className="navbar py-4">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-slate-900 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-white dark:bg-slate-900 rounded-2xl w-52 gap-4 border border-slate-100 dark:border-slate-800">{links}</ul>
            </div>
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500 transition-all duration-500">
                <span className="text-emerald-500 font-black text-xl">E</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                Eco<span className="text-emerald-500 italic">Track</span>
              </span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="flex gap-8">{links}</ul>
          </div>

          <div className="navbar-end gap-3">
           
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-amber-400 hover:scale-110 transition-all"
            >
              {isDark ? <FaSun size={18}/> : <FaMoon size={18}/>}
            </button>

            {loading ? (
              <span className="loading loading-spinner text-emerald-500"></span>
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar">
                  <div className="w-11 rounded-2xl ring ring-emerald-500/20 ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL || "https://i.ibb.co/mF96mQJ/avatar.png"} alt="User" />
                  </div>
                </div>
                <ul tabIndex={0} className="dropdown-content mt-4 z-[1] p-6 shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] w-64 text-center space-y-4">
                  <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-[0.2em]">{user?.displayName}</p>
                    <p className="text-[10px] text-slate-500 truncate mt-1">{user?.email}</p>
                    <p className="mt-2 inline-block px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[9px] font-black uppercase tracking-widest">{role}</p>
                  </div>
                  
                  {/* Dashboard Hub */}
                  <NavLink to="/dashboard/overview" className="block text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-500 py-1">Dashboard</NavLink>
                  
                  {role === 'user' && <NavLink to="/dashboard/my-challenges" className="block text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-500 py-1">My Missions</NavLink>}
                  
                  {(role === 'admin' || role === 'staff') && <NavLink to="/dashboard/manage-challenges" className="block text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-500 py-1">Manage Missions</NavLink>}
                  
                  <button onClick={signOutUser} className="btn btn-block bg-emerald-500 hover:bg-emerald-600 border-none text-slate-950 font-black rounded-xl uppercase text-xs tracking-widest">Sign Out</button>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn bg-slate-900 dark:bg-white hover:bg-emerald-500 text-white dark:text-slate-900 px-8 rounded-xl font-black border-none uppercase text-xs tracking-widest transition-all">Log in</Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;