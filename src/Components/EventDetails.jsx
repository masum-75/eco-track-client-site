import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaUsers, FaArrowLeft, FaTimes } from "react-icons/fa";
import Loading from "../Pages/Loading";
import { AuthContext } from "../Context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [joining, setJoining] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    userLocation: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`https://eco-track-server-orcin.vercel.app/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        toast.error("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setJoining(true);
    try {
      await axios.post("https://eco-track-server-orcin.vercel.app/joined-events", {
        participantName: formData.name,
        participantEmail: formData.email,
        participantLocation: formData.userLocation,
        challengeId: id,
      });

      setEvent(prev => ({ ...prev, currentParticipants: prev.currentParticipants + 1 }));
      toast.success("Successfully registered for the event!");
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to join event");
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <Loading />;
  if (!event) return <div className="min-h-screen flex items-center justify-center dark:text-white">Event not found</div>;

  const isFull = event.currentParticipants >= event.maxParticipants;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 font-bold mb-8 transition-colors group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Events
        </button>

        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-8 lg:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                  {event.title}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">
                  {event.description}
                </p>
              </div>
              <div className={`px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest ${isFull ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                {isFull ? 'Registration Full' : 'Registration Open'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 p-8 bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><FaCalendarAlt size={20}/></div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400">Date & Time</p>
                  <p className="text-slate-900 dark:text-white font-bold">{new Date(event.date).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><FaMapMarkerAlt size={20}/></div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400">Location</p>
                  <p className="text-slate-900 dark:text-white font-bold">{event.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><FaUser size={20}/></div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400">Organizer</p>
                  <p className="text-slate-900 dark:text-white font-bold">{event.organizer}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><FaUsers size={20}/></div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400">Attendance</p>
                  <p className="text-slate-900 dark:text-white font-bold">{event.currentParticipants} / {event.maxParticipants} Spots</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              disabled={isFull}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl ${isFull ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 hover:scale-[1.01] active:scale-95'}`}
            >
              {isFull ? "Event Capacity Reached" : "Join This Event Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Modern Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl relative border border-slate-200 dark:border-slate-800 scale-in-center">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-emerald-500"><FaTimes size={20}/></button>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 text-center">Confirm <span className="text-emerald-500">Attendance</span></h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 outline-none dark:text-white focus:ring-2 focus:ring-emerald-500"/>
              <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 outline-none dark:text-white focus:ring-2 focus:ring-emerald-500"/>
              <input type="text" placeholder="Your City" value={formData.userLocation} onChange={(e) => setFormData({...formData, userLocation: e.target.value})} required className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 outline-none dark:text-white focus:ring-2 focus:ring-emerald-500"/>
              <button type="submit" disabled={joining} className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-4 rounded-xl mt-4 shadow-lg uppercase tracking-widest text-xs">
                {joining ? "Processing..." : "Confirm My Spot"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;