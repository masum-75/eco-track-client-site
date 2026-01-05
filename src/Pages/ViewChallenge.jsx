import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import useChallenges from "../Hooks/useChallenges";
import Loading from "./Loading";
import Container from "../Layouts/Container";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaCalendarAlt, FaBullseye, FaChartLine, FaUserEdit, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

const ViewChallenge = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { challenges, loading, error } = useChallenges();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localChallenge, setLocalChallenge] = useState(null);

  useEffect(() => {
    if (!loading && challenges.length > 0) {
      const found = challenges.find((c) => c._id === id);
      setLocalChallenge(found);
    }
  }, [challenges, id, loading]);

  const getCurrentDateTime = () => {
    return new Date().toLocaleString("en-GB", {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hour12: true,
    });
  };

  const [formData, setFormData] = useState({
    participantName: user?.displayName || "",
    participantEmail: user?.email || "",
    imageUrl: "",
    location: "",
    joinDate: getCurrentDateTime(),
    notes: "",
    status: "Not Started",
    progress: 0,
  });

  if (loading) return <Loading />;
  if (error || !localChallenge) return <div className="min-h-screen flex items-center justify-center dark:text-white">Challenge not found.</div>;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Confirm Enrollment?",
      text: "Ready to start this eco-mission?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Let's Go!",
      buttonsStyling: false,
      customClass: {
        confirmButton: "bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-3 px-8 rounded-xl mr-3",
        cancelButton: "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-3 px-8 rounded-xl"
      },
    });

    if (!result.isConfirmed) return;

    try {
      const participantRes = await fetch("https://eco-track-server-orcin.vercel.app/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, challengeId: localChallenge._id }),
      });

      if (participantRes.ok) {
        setLocalChallenge(prev => ({ ...prev, participants: (prev.participants || 0) + 1 }));
        setIsModalOpen(false);
        Swal.fire({ title: "Welcome Aboard!", icon: "success", customClass: { confirmButton: "bg-emerald-500 text-slate-950 px-8 py-2 rounded-lg" } });
      } else {
        const data = await participantRes.json();
        toast.error(data.message || "Enrollment failed.");
      }
    } catch (err) { toast.error("Something went wrong."); }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20 px-4 transition-colors duration-500">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Main Detail Card */}
          <div className="flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
            
            {/* Left side: Image & Category */}
            <div className="lg:w-1/2 relative h-[400px] lg:h-auto">
              <img src={localChallenge.imageUrl} alt={localChallenge.title} className="w-full h-full object-cover" />
              <div className="absolute top-8 left-8 bg-emerald-500 text-slate-950 px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-xl">
                {localChallenge.category}
              </div>
            </div>

            {/* Right side: Information */}
            <div className="lg:w-1/2 p-8 lg:p-14 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                  {localChallenge.title}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-emerald-500" />
                    <span className="text-sm font-bold">{localChallenge.duration} Days Mission</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaBullseye className="text-emerald-500" />
                    <span className="text-sm font-bold">Target: {localChallenge.target}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaChartLine className="text-emerald-500" />
                    <span className="text-sm font-bold">{localChallenge.impactMetric}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaUserEdit className="text-emerald-500" />
                    <span className="text-sm font-bold">By {localChallenge.createdBy.split('@')[0]}</span>
                  </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 border-l-4 border-emerald-500/30 pl-6 italic">
                  {localChallenge.description}
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-5 rounded-2xl transition-all shadow-lg hover:scale-[1.02] active:scale-95 text-lg"
              >
                Accept Challenge Mission
              </button>
            </div>
          </div>
        </div>

        {/* Professional Enrollment Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-xl p-10 shadow-2xl relative border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-emerald-500 transition-colors">
                <FaTimes size={24} />
              </button>

              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">
                Mission <span className="text-emerald-500">Enrollment</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Name</label>
                    <input type="text" name="participantName" value={formData.participantName} readOnly className="w-full bg-slate-100 dark:bg-slate-950 border-none rounded-xl px-4 py-3 text-slate-500 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Location</label>
                    <input type="text" name="location" onChange={handleChange} placeholder="City, Country" required className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                  </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Action Evidence (Image URL)</label>
                    <input type="url" name="imageUrl" onChange={handleChange} placeholder="https://..." className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm outline-none dark:text-white focus:ring-2 focus:ring-emerald-500" />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Personal Notes</label>
                    <textarea name="notes" onChange={handleChange} rows="3" placeholder="Why are you joining?" className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm outline-none dark:text-white focus:ring-2 focus:ring-emerald-500"></textarea>
                </div>

                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-4 rounded-xl transition-all shadow-xl hover:shadow-emerald-500/20 uppercase tracking-widest text-xs mt-4">
                  Submit Enrollment
                </button>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ViewChallenge;