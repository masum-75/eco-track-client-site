import React from "react";
import { Link } from "react-router";

const ActiveChallengesCard = ({ challenge }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 max-w-4xl mx-auto border border-gray-300">

      {/* Image */}
      <div className="md:w-1/2 w-full">
        <img
          src={challenge.imageUrl}
          alt={challenge.title}
          className="w-full h-48 md:h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="md:w-1/2 w-full p-6 flex flex-col justify-between bg-white">

        {/* Title */}
        <h2 className="text-2xl font-bold text-black mb-4">
          {challenge.title}
        </h2>

        {/* Details */}
        <div className="text-start space-y-2 text-black text-[16px] leading-relaxed">

          <p>
            <span className="font-semibold">Category:</span>{" "}
            {challenge.category}
          </p>

          <p>
            <span className="font-semibold">Duration:</span>{" "}
            {challenge.duration} days
          </p>

          <p>
            <span className="font-semibold">Participants:</span>{" "}
            {challenge.participants}
          </p>

          <p>
            <span className="font-semibold">Created By:</span>{" "}
            {challenge.createdBy}
          </p>

          <p>
            <span className="font-semibold">Start Date:</span>{" "}
            {challenge.startDate}
          </p>

          <p>
            <span className="font-semibold">End Date:</span>{" "}
            {challenge.endDate}
          </p>

          <p>
            <span className="font-semibold">Target:</span>{" "}
            {challenge.target}
          </p>

          <p>
            <span className="font-semibold">Impact Metric:</span>{" "}
            {challenge.impactMetric}
          </p>
        </div>

        {/* View Button */}
        <Link
          to={`/challenges/${challenge._id}`}
          className="mt-6 w-full text-center bg-[#297B33] hover:bg-[#82B532] text-white py-2 rounded-xl font-medium transition"
        >
          View Challenge
        </Link>
      </div>
    </div>
  );
};

export default ActiveChallengesCard;
