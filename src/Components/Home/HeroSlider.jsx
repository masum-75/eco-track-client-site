import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./HeroSlider.css";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";

const slides = [
  {
    title: "Join the Green Movement",
    desc: "Be part of a sustainable community where every small action counts toward a cleaner planet.",
    btnText: "Join Now",
    link: "/events",
    bg: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026",
  },
  {
    title: "Sustainability Challenges",
    desc: "Test your eco-habits and join community challenges that make real-world impact.",
    btnText: "Explore Now",
    link: "/challenges",
    bg: "https://images.unsplash.com/photo-1518173946687-a4c8a3b77bf2?q=80&w=1974",
  },
  {
    title: "Track Your Eco Impact",
    desc: "Monitor your personal progress, carbon savings, and celebrate your green wins!",
    btnText: "Start Tracking",
    link: "/my-activities",
    bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070",
  }
];

const HeroSlider = () => {
  return (
    <div className="h-[85vh] w-full overflow-hidden relative group">
      <Swiper
        effect={"fade"}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        modules={[Pagination, Autoplay, EffectFade]}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="relative h-full w-full flex items-center justify-center bg-cover bg-center transition-transform duration-[10000ms] scale-110 group-hover:scale-100"
              style={{ backgroundImage: `url('${slide.bg}')` }}
            >
              {/* Overlay for Readability */}
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"></div>
              
              <div className="relative z-10 text-center px-6 max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex justify-center mb-6">
                    <span className="bg-emerald-500/20 text-emerald-400 p-3 rounded-full backdrop-blur-md border border-emerald-500/30">
                      <Leaf size={24} className="animate-pulse" />
                    </span>
                  </div>
                  
                  <h2 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none">
                    {slide.title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-emerald-400 italic">{slide.title.split(" ").pop()}</span>
                  </h2>
                  
                  <p className="text-lg md:text-xl text-slate-100 mb-10 max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
                    {slide.desc}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                      to={slide.link} 
                      className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-10 py-5 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-500/20"
                    >
                      {slide.btnText} <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;