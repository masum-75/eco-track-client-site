import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loading from "./Loading";

const MyActivities = () => {
  const { user } = useContext(AuthContext);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const res = await fetch("https://eco-track-server-dun.vercel.app/challenges");
      const data = await res.json();
      const userChallenges = data.filter((c) => c.createdBy === user.email);
      setChallenges(userChallenges);
    } catch (error) {
      console.error("Error fetching challenges:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This challenge will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-[#297B33] hover:bg-[#82B532] text-white py-2 px-4 rounded-xl transition-colors mr-5",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-xl transition-colors",
        popup: "swal2-popup-custom",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://eco-track-server-dun.vercel.app/challenges/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Challenge has been deleted.",
              icon: "success",
              confirmButtonText: "OK",
              buttonsStyling: false,
              customClass: {
                confirmButton:
                  "bg-[#297B33] hover:bg-[#82B532] text-white py-2 px-4 rounded-xl transition-colors",
              },
            });
            fetchChallenges();
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Failed to delete challenge.",
            icon: "error",
            confirmButtonText: "OK",
            buttonsStyling: false,
            customClass: {
              confirmButton:
                "bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl transition-colors",
            },
          });
        }
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-[#297B33] text-center">
          My Activities
        </h2>

        {challenges.length === 0 ? (
          <p className="text-center text-gray-500">No challenges found.</p>
        ) : (
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div
                key={challenge._id}
                className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Left Column: Info */}
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{challenge.title}</h3>
                  <p className="text-sm text-gray-600">
                    Category: {challenge.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    Start: {challenge.startDate} | End: {challenge.endDate}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created By: {challenge.createdBy}
                  </p>
                </div>

                {/* Right Column: Buttons */}
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/my-activities/${challenge._id}`}
                    className="btn bg-[#297B33] hover:bg-[#82B532] text-white"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(challenge._id)}
                    className="btn bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyActivities;
