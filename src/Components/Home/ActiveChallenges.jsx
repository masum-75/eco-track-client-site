import React from 'react';
import useChallenges from '../../Hooks/useChallenges';
import ActiveChallengesCard from '../ActiveChallengesCard';
import { Link } from 'react-router';

const ActiveChallenges = () => {
    const { challenges } = useChallenges();

    
    const today = new Date();

        
  const sortedChallenges = [...challenges].sort(
    (a, b) => b._id.localeCompare(a._id) 
  );

    
    const activeChallenges = sortedChallenges.filter(challenge => {
        const start = new Date(challenge.startDate);
        const end = new Date(challenge.endDate);
        return today >= start && today <= end;
    });
    const firstFourActive = activeChallenges.slice(0, 4);

    

    return (
        <div>
            <section className="py-12 bg-gray-50 text-center">
             
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#297B33]">
                        Active Challenges
                    </h2>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                      Take part in an active challenge and make your first step toward sustainability.
Measure your impact, spark inspiration, and turn eco-actions into daily habits!
                    </p>
                </div>

                {/* Challenge Cards */}
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 px-6 md:px-12">
                    {firstFourActive.map((challenge) => (
                        <ActiveChallengesCard key={challenge._id} challenge={challenge} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-10">
                    <Link to={`/challenges`} className=" text-white px-6 py-2 rounded-xl bg-[#297B33] hover:bg-[#82B532] transition-colors duration-300">
                        View All Challenges
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ActiveChallenges;