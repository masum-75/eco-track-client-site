import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        
        {/* Brand Section */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500 transition-all duration-500">
               <span className="text-emerald-500 font-black text-xl">E</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              Eco<span className="text-emerald-500 italic">Track</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed font-medium max-w-xs">
            Inspiring eco-minded individuals to live sustainably, embrace green challenges, and create measurable impact.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-8">Navigation</h3>
          <ul className="space-y-4 font-bold text-xs uppercase tracking-widest">
            <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
            <li><Link to="/challenges" className="hover:text-emerald-400 transition-colors">Challenges</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
            <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-8">Resources</h3>
          <ul className="space-y-4 font-bold text-xs uppercase tracking-widest">
            <li><Link to="/tips" className="hover:text-emerald-400 transition-colors">Eco Tips</Link></li>
            <li><Link to="/events" className="hover:text-emerald-400 transition-colors">Events</Link></li>
            <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social & Newsletter Concept */}
        <div>
          <h3 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-8">Follow Our Journey</h3>
          <div className="flex gap-3">
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaXTwitter />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
              { icon: <FaLinkedinIn />, link: "#" },
              { icon: <FaYoutube />, link: "#" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-slate-950 hover:border-emerald-500 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-900/50 flex flex-col md:row justify-between items-center gap-6">
        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
          © {new Date().getFullYear()} <span className="text-emerald-500">EcoTrack</span> — Building a sustainable future.
        </div>
        
        <div className="text-[10px] uppercase tracking-[0.2em] font-bold">
          Architected by <Link to="https://github.com/masum-75" className="text-white hover:text-emerald-400 border-b border-emerald-500/30 pb-0.5 transition-all">Tanbir</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;