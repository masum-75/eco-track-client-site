import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import axios from "axios";

const EcoTipCard = ({ tip }) => {
  const { _id, title, content, category, author, authorName, upvotes, createdAt } = tip;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  const [voteCount, setVoteCount] = useState(upvotes);
  const [isVoting, setIsVoting] = useState(false);

  const handleUpvote = async () => {
 

    if (isVoting) return;
    try {
      
      setVoteCount(prev => prev + 1);

      await axios.patch(`https://eco-track-server-orcin.vercel.app/tips/${_id}/upvote`);

    } catch (error) {
      console.error("Error upvoting:", error);
      
      setVoteCount(prev => prev - 1);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
      
      <div className="bg-[#297B33] px-4 py-2">
        <h2 className="text-white font-semibold text-lg">{title}</h2>
      </div>

      
      <div className="p-4">
        <p className="text-gray-700 mb-2">{content}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span className="font-medium">Category:</span> {category}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span className="font-medium">Author Email:</span> {author}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span className="font-medium">Author Name:</span> {authorName}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span className="font-medium">Upvotes:</span> {voteCount}
        </div>
        <div className="text-sm text-gray-400">
          Posted on: {formattedDate}
        </div>
      </div>

      
      <div className="flex justify-center">
        <button
          onClick={handleUpvote}
          disabled={isVoting}
          className={`rounded-t-4xl flex flex-col justify-center items-center w-1/3 px-4 py-2 bg-[#297B33] text-white text-center font-medium cursor-pointer hover:bg-[#82B532] transition-colors duration-300 ${isVoting ? "opacity-70 cursor-not-allowed" : ""
            }`}
        >
          <FaArrowUp />
          <span>{isVoting ? "Voting..." : "Upvote Tip"}</span>
        </button>
      </div>
    </div>
  );
};

export default EcoTipCard;