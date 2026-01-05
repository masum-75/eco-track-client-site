import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const FAQ = () => {
    const faqs = [
        { q: "How do I join a challenge?", a: "Simply browse the challenges section, pick one you like, and click the 'Join' button after logging in." },
        { q: "Are the events free to attend?", a: "Most of our community-led events are free. Some specialized workshops may have a small eco-contribution fee." },
        { q: "Can I suggest my own eco-tip?", a: "Absolutely! We encourage our community to share their sustainable living tips through the dashboard." }
    ];

    return (
        <section className="bg-white dark:bg-slate-950 transition-colors duration-500">
            <div className="max-w-4xl mx-auto">
                {/* FAQ Header - Consistent with StatsSection */}
                <div className="text-center mb-16">
                    <div className="flex justify-center items-center gap-3 mb-4 text-emerald-500">
                        <FaQuestionCircle size={28} />
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                            General <span className="text-emerald-500">Questions</span>
                        </h2>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg">
                        Find answers to common queries about our sustainability platform and community.
                    </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="collapse collapse-arrow bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] transition-all duration-300 hover:border-emerald-500/30 group"
                        >
                            <input type="radio" name="faq-accordion" defaultChecked={index === 0} className="peer" /> 
                            
                            <div className="collapse-title text-xl font-black text-slate-800 dark:text-slate-200 peer-checked:text-emerald-500 transition-colors duration-300 py-6 px-10">
                                {faq.q}
                            </div>
                            
                            <div className="collapse-content px-10"> 
                                <p className="pt-4 pb-6 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;