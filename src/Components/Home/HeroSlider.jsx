import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./HeroSlider.css";
import { Link } from "react-router";


const HeroSlider = () => {
  return (
    <div className="h-[80vh] w-full overflow-hidden">
      <Swiper
        direction="vertical"
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper h-full"
      >
        
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-full bg-[#297B33] text-white text-center p-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Join the Green Movement
            </h2>
            <p className="max-w-xl mb-6 text-lg opacity-90">
              Be part of a sustainable community where every small action
              counts toward a cleaner, greener planet.
            </p>
            <Link to={"/events"} className="btn bg-[#82B532] hover:bg-[#A3E635] text-white border-none">
              Join Now
            </Link>
          </div>
        </SwiperSlide>

        
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-full bg-[#82B532] text-white text-center p-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Take Sustainability Challenges
            </h2>
            <p className="max-w-xl mb-6 text-lg opacity-90">
              Test your eco-habits and join community challenges that make
              real-world impact — from recycling to energy saving.
            </p>
            <Link to={"/challenges"} className="btn bg-white text-[#297B33] hover:bg-[#F0FDF4] border-none">
              Explore Challenges
            </Link>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="flex flex-col items-center justify-center h-full text-white text-center p-6 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://sanishtech.com/i/6918b5ab6b63d9.33952389-1763227051.jpg')",
            }}
          >
            <div className="bg-black/40 p-10 rounded-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Discover Local Green Events
              </h2>
              <p className="max-w-xl mb-6 text-lg opacity-90">
                Stay connected with local eco-initiatives, workshops, and
                meetups that empower sustainable living.
              </p>
              <Link to={"/events"} className="btn bg-[#82B532] hover:bg-[#A3E635] text-white border-none">
                Browse Events
              </Link>
            </div>
          </div>
        </SwiperSlide>

        
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-full bg-[#D9F99D] text-[#297B33] text-center p-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Track Your Eco Impact
            </h2>
            <p className="max-w-xl mb-6 text-lg opacity-90">
              Monitor your personal progress, carbon savings, and contribution
              to the environment — and celebrate your green wins!
            </p>
            <Link to={"/my-challenges"} className="btn bg-[#297B33] hover:bg-[#82B532] text-white border-none">
              Start Tracking
            </Link>
          </div>
        </SwiperSlide>

        
        <SwiperSlide>
          <div
            className="flex flex-col items-center justify-center h-full text-white text-center p-6 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://sanishtech.com/i/6918b61f49bdf9.35654502-1763227167.jpg')",
            }}
          >
            <div className="bg-black/40 p-10 rounded-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Share Your Eco Tips
              </h2>
              <p className="max-w-xl mb-6 text-lg opacity-90">
                Inspire others by sharing your sustainable habits and creative
                eco-friendly hacks with the community.
              </p>
              <Link to={"/tips"} className="btn bg-[#82B532] hover:bg-[#A3E635] text-white border-none">
                Share Tips
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;