import React from "react";
import Container from "../Layouts/Container";

const ActiveChallengesCardSkeleton = () => {
  return (
<Container>
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-pulse">

      <div className="w-full h-40 md:h-full skeleton"></div>

      
      <div className="p-6 flex flex-col justify-between bg-gray-50">
        
        <div className="skeleton h-6 w-3/4 mb-4"></div>

        <div className="space-y-2">
          <div className="skeleton h-4 w-1/2"></div>
          <div className="skeleton h-4 w-2/3"></div>
          <div className="skeleton h-4 w-1/3"></div>
          <div className="skeleton h-4 w-1/2"></div>
          <div className="skeleton h-4 w-2/5"></div>
          <div className="skeleton h-4 w-2/3"></div>
          <div className="skeleton h-4 w-3/5"></div>
          <div className="skeleton h-4 w-2/4"></div>
        </div>

        
        <div className="skeleton h-10 w-full mt-6 rounded-xl"></div>
      </div>
    </div>
</Container>
  );
};

export default ActiveChallengesCardSkeleton;