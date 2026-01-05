import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaArrowLeft, FaCloudUploadAlt, FaCalendarAlt } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "./Loading";

const EditChallenge = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    duration: "",
    target: "",
    participants: 0,
    impactMetric: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
    createdBy: user?.email,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const categories = [
    "Energy Conservation",
    "Water Conservation",
    "Sustainable Transport",
    "Green Living",
    "Waste Reduction",
  ];

  useEffect(() => {
    if (!id) return;
    const fetchChallenge = async () => {
      try {
        const res = await fetch(`https://eco-track-server-orcin.vercel.app/challenges`);
        const data = await res.json();
        const challenge = data.find((c) => c._id === id);
        if (challenge) setFormData({ ...challenge });
      } catch (error) {
        Swal.fire("Error", "Failed to load challenge data", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    const requiredFields = ["title", "category", "description", "target", "impactMetric", "startDate", "endDate", "imageUrl"];
    requiredFields.forEach(field => {
      if (!formData[field]) newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    });
    if (!formData.duration || isNaN(formData.duration)) newErrors.duration = "Duration must be a number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(`https://eco-track-server-orcin.vercel.app/challenges/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.modifiedCount) {
        Swal.fire({
          title: "Mission Updated!",
          icon: "success",
          confirmButtonText: "Return to Workspace",
          buttonsStyling: false,
          customClass: { confirmButton: "bg-emerald-500 text-slate-950 py-3 px-8 rounded-xl font-black" },
        });
        navigate("/my-activities");
      } else {
        Swal.fire("No Changes", "Form content is identical to saved data.", "info");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to sync changes.", "error");
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Terminate Mission?",
      text: "This action is irreversible and will remove all participant data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete Permanently",
      buttonsStyling: false,
      customClass: {
        confirmButton: "bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-bold mr-3",
        cancelButton: "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-3 px-6 rounded-xl font-bold"
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://eco-track-server-orcin.vercel.app/challenges/${id}`, { method: "DELETE" });
          const data = await res.json();
          if (data.deletedCount) navigate("/my-activities");
        } catch (error) {
          Swal.fire("Error", "Deletion failed.", "error");
        }
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20 px-4 transition-colors duration-500">
      <div className="max-w-3xl mx-auto">
        {/* Navigation & Header */}
        <div className="flex justify-between items-center mb-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 font-bold transition-colors">
            <FaArrowLeft /> Workspace
          </button>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Manage <span className="text-emerald-500">Challenge</span>
          </h2>
        </div>

        <form onSubmit={handleUpdate} className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 lg:p-12 shadow-2xl space-y-8">
          
          {/* Main Info Section */}
          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Challenge Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm" />
              {errors.title && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-2"><FaCalendarAlt className="inline mr-1"/> Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-2"><FaCalendarAlt className="inline mr-1"/> End Date</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Target Metric</label>
                <input type="text" name="target" value={formData.target} onChange={handleChange} placeholder="e.g. 500kg CO2" className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Mission Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 appearance-none">
                  <option value="">Select Category</option>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 ml-2"><FaCloudUploadAlt className="inline mr-1"/> Cover Image URL</label>
              <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Mission Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 resize-none"></textarea>
            </div>
          </div>

          {/* Actions Section */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4">
            <button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-5 rounded-2xl transition-all shadow-xl hover:shadow-emerald-500/20 flex items-center justify-center gap-3">
              <FaEdit /> Sync Changes
            </button>
            <button type="button" onClick={handleDelete} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-black px-10 py-5 rounded-2xl transition-all flex items-center justify-center gap-3 border border-red-500/20">
              <FaTrash /> Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChallenge;