import React from 'react';
import HeroSlider from '../Components/Home/HeroSlider';
import EcoStatusCards from "../components/Home/EcoStatusCards";
import useChallenges from '../Hooks/useChallenges';
import Loading from './Loading';
import Error404 from './Error404';
import ActiveChallenges from '../Components/Home/ActiveChallenges';
import RecentTips from '../Components/Home/RecentTips';
import UpcomingEvents from '../Components/Home/UpcomingEvents';
import WhyGoGreen from '../Components/Home/WhyGoGreen';
import HowItWorks from '../Components/Home/HowItWorks';
import StatsSection from '../Components/Home/StatsSection'; 
import Newsletter from '../Components/Home/Newsletter'; 
import FAQ from '../Components/Home/FAQ'; 

const Home = () => {
    const { challenges, loading, error } = useChallenges();

    if (loading) return <Loading />;
    if (error) return <Error404 />;

    return (
        <main className="bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
            
            {/* 1. HERO SECTION - Controlled Height */}
            <div className="relative max-h-[70vh] md:max-h-[80vh] overflow-hidden">
                <HeroSlider />
                {/* Subtle bottom fade to transition to main content */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent"></div>
            </div>

            {/* 2. QUICK STATS CARDS - Floating Header */}
            <section className="relative z-10 -mt-16 container mx-auto px-6 lg:px-10">
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 lg:p-12">
                    <EcoStatusCards />
                </div>
            </section>

            {/* 3. WHY GO GREEN - Consistent Spacing */}
            <section className="py-28 container mx-auto px-6 lg:px-16">
                <WhyGoGreen />
            </section>

            {/* 4. HOW IT WORKS - Removed Mixed Colors, Clean Slate */}
            <section className="py-28 border-t border-slate-100 dark:border-slate-900">
                <div className="container mx-auto px-6 lg:px-16">
                    <HowItWorks />
                </div>
            </section>

            {/* 5. ACTIVE CHALLENGES - Core Feature */}
            <section className="py-28 border-t border-slate-100 dark:border-slate-900">
                <div className="container mx-auto px-6 lg:px-16">
                    
                    <ActiveChallenges />
                </div>
            </section>

            {/* 6. STATS SECTION - Full Width Dark Contrast */}
            <div className="py-28 bg-slate-900 dark:bg-slate-900/50">
                <div className="container mx-auto px-6 lg:px-16">
                    <StatsSection />
                </div>
            </div>

            {/* 7. RECENT ECO TIPS - Clean Background */}
            <section className="py-28 border-t border-slate-100 dark:border-slate-900">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="text-center mb-16">
                         <h2 className="text-3xl md:text-5xl font-black dark:text-white">Eco Insights & <span className="text-emerald-500">Tips</span></h2>
                         <div className="h-1.5 w-24 bg-emerald-500 mx-auto mt-6 rounded-full opacity-30"></div>
                    </div>
                    <RecentTips />
                </div>
            </section>

            {/* 8. UPCOMING EVENTS - Interactive Grid */}
            <section className="py-28 border-t border-slate-100 dark:border-slate-900">
                <UpcomingEvents />
            </section>

            {/* 9. FAQ SECTION - Structured & Professional */}
            <section className="py-28 border-t border-slate-100 dark:border-slate-900">
               
                <div className="container mx-auto px-6 lg:px-16">
                    <FAQ />
                </div>
            </section>

            {/* 10. NEWSLETTER - High Impact Footer Link */}
            <section className="py-28 border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950">
                <Newsletter />
            </section>
            
        </main>
    );
};

export default Home;