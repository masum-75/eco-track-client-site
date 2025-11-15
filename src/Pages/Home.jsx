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


const Home = () => {

        const { challenges, loading, error }  =useChallenges();
        if(loading){
        return <Loading/>;
       }
        if(error){
        return <Error404/>
       }
       const featureChallenges = challenges.slice(0, 8);
       console.log(featureChallenges)
    return (
        <div>
            <HeroSlider/>
            <EcoStatusCards/>
            <ActiveChallenges/>
            <RecentTips/>
            <UpcomingEvents/>
            <WhyGoGreen/>
            <HowItWorks/>
        </div>
    );
};

export default Home;