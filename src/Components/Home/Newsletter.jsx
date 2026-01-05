import React from 'react';
import { FaPaperPlane, FaShieldAlt, FaCheckCircle, FaLeaf, FaEnvelopeOpenText } from 'react-icons/fa';

const Newsletter = () => {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="relative rounded-[3.5rem] bg-[#0f172a] dark:bg-slate-900 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
                    
                    {/* Background Visual Interest */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-500/10 to-transparent hidden lg:block"></div>
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
                    <FaLeaf className="absolute -bottom-16 -right-16 text-emerald-500/5 text-[20rem] rotate-12 pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-stretch">
                        
                        {/* Left Side: Impact & Content */}
                        <div className="lg:w-7/12 p-8 md:p-20 text-left">
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-10">
                                <FaEnvelopeOpenText className="text-emerald-500" />
                                <span className="uppercase tracking-widest">Join the Newsletter</span>
                            </div>
                            
                            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mb-8">
                                Tiny actions lead to <br />
                                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Great Changes.</span>
                            </h2>
                            
                            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-lg leading-relaxed">
                                Connect with 5,000+ eco-warriors. Get high-impact green challenges and curated sustainability guides.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    'Weekly Action Items',
                                    'Impact Tracking',
                                    'Community Rewards',
                                    'Ad-Free Content'
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 text-slate-300 group">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                                            <FaCheckCircle className="text-emerald-500 group-hover:text-white text-sm transition-colors" />
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: High-Conversion Form */}
                        <div className="lg:w-5/12 bg-white/5 backdrop-blur-sm border-l border-white/10 p-8 md:p-16 flex flex-col justify-center">
                            <div className="max-w-md mx-auto w-full">
                                <h3 className="text-2xl font-bold text-white mb-2 text-center lg:text-left">Get Started Now</h3>
                                <p className="text-slate-400 mb-8 text-center lg:text-left">Join our movement in one click.</p>
                                
                                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                    <div className="relative">
                                        <input 
                                            type="email" 
                                            placeholder="yourname@email.com" 
                                            className="w-full px-7 py-5 bg-slate-950/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all duration-300 shadow-inner"
                                            required 
                                        />
                                    </div>
                                    
                                    <button className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-[#0f172a] font-bold text-xl rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] active:scale-[0.98] group">
                                        Secure My Invite
                                        <FaPaperPlane className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                    </button>
                                </form>

                                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 border-t border-white/5 pt-8">
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-tighter">
                                        <FaShieldAlt className="text-emerald-500 text-sm" />
                                        <span>Privacy Protected</span>
                                    </div>
                                    <div className="h-1 w-1 bg-slate-700 rounded-full hidden sm:block"></div>
                                    <span className="text-xs text-slate-500 font-medium uppercase">No Credit Card Needed</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;