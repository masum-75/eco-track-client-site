import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loading from "./Loading";
import { FaEdit, FaTrash, FaCalendarAlt, FaLayerGroup, FaPlus } from "react-icons/fa";
import Container from "../Layouts/Container";

const MyActivities = () => {
  const { user } = useContext(AuthContext);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const res = await fetch("https://eco-track-server-orcin.vercel.app/challenges");
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
      title: "Terminate Mission?",
      text: "This will permanently remove your progress data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        confirmButton: "bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded-xl font-bold mr-4 transition-all",
        cancelButton: "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-3 px-8 rounded-xl font-bold transition-all",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://eco-track-server-orcin.vercel.app/challenges/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.deletedCount) {
            Swal.fire({
              title: "Removed!",
              icon: "success",
              confirmButtonText: "OK",
              buttonsStyling: false,
              customClass: { confirmButton: "bg-emerald-500 text-slate-950 py-2 px-8 rounded-lg font-black" },
            });
            fetchChallenges();
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20 transition-colors duration-500">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
              My <span className="text-emerald-500 text-outline">Activities</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Manage your active environmental missions and contributions.
            </p>
          </div>
          
          <Link
            to="/challenges"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-6 py-3 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <FaPlus size={14} /> New Challenge
          </Link>
        </div>

        {/* Challenges List */}
        {challenges.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-400 font-bold italic">No active missions found. Start your first journey today!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge._id}
                className="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6 transition-all hover:shadow-2xl hover:border-emerald-500/30"
              >
                {/* Info Left */}
                <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0">
                    <FaLayerGroup size={24} />
                  </div>
                  <div className="text-center md:text-left space-y-2">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {challenge.title}
                    </h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full">
                        {challenge.category}
                      </span>
                      <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                        <FaCalendarAlt className="text-emerald-500" /> {challenge.startDate} — {challenge.endDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Right */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Link
                    to={`/my-activities/${challenge._id}`}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-xl font-black text-xs hover:bg-emerald-500 hover:text-slate-950 hover:border-emerald-500 transition-all shadow-sm"
                  >
                    <FaEdit /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(challenge._id)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-3 rounded-xl font-black text-xs hover:bg-red-500 hover:text-white transition-all"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyActivities;