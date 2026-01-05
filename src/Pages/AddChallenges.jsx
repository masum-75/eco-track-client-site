import React, { useContext, useState } from "react";
import { FaPlus, FaImage, FaCalendarAlt, FaLayerGroup } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Loading from "./Loading";

const AddChallenges = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "", category: "", description: "", duration: "",
    target: "", participants: 0, impactMetric: "",
    startDate: "", endDate: "", imageUrl: "", createdBy: user?.email || "",
  });

  const [errors, setErrors] = useState({});

  const categories = ["Energy Conservation", "Water Conservation", "Sustainable Transport", "Green Living", "Waste Reduction"];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.imageUrl) newErrors.imageUrl = "Image URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    fetch(`https://eco-track-server-orcin.vercel.app/challenges`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Success!", text: "Challenge Created Successfully", icon: "success",
            confirmButtonText: "Awesome", buttonsStyling: false,
            customClass: { confirmButton: "bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-3 px-8 rounded-2xl transition-all" },
          });
          navigate("/my-activities");
        }
      });
  };

  if (loading) return <Loading />;

  return (
    <div className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      <div className="max-w-3xl mx-auto p-10 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-3">Create <span className="text-emerald-500">Challenge</span></h2>
            <p className="text-slate-500 dark:text-slate-400">Launch a new mission for the community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-4">Challenge Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Urban Reforestation" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white transition-all" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Category Select */}
             <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-4">Category</label>
                <select name="category" onChange={handleChange} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 outline-none text-slate-900 dark:text-white appearance-none">
                    <option value="">Select Theme</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
             </div>
             {/* Impact Metric */}
             <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-4">Impact Metric</label>
                <input type="text" name="impactMetric" onChange={handleChange} placeholder="e.g. kg CO2 saved" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 outline-none text-slate-900 dark:text-white" />
             </div>
          </div>

          <button type="submit" className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-[1.5rem] flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02] active:scale-95 uppercase tracking-widest text-sm">
            <FaPlus /> Deploy Challenge
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddChallenges;