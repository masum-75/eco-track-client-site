import React, { useState, useContext } from "react";
import Container from "../Layouts/Container";
import { AuthContext } from "../Context/AuthContext";
import { IoEyeOff } from "react-icons/io5";
import { FaEye, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const {
    signInWithGoogle,
    createUser,
    updateUserProfile,
    signOutUser,
    setLoading,
    setUser,
    loading,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, photoURL, password } = formData;

    createUser(email, password)
      .then((res) => {
        updateUserProfile(name, photoURL)
          .then(() => {
            const newUser = {
              name,
              email,
              photoURL,
              registrationType: "manual",
              role: "user" // Default role
            };

            fetch(`https://eco-track-server-orcin.vercel.app/users`, {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(newUser),
            })
            .then(() => {
              signOutUser();
              setLoading(false);
              toast.success("Account created! Please log in.");
              navigate("/login");
            });
          });
      })
      .catch((e) => {
        setLoading(false);
        toast.error(e.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const newUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          registrationType: "google",
          role: "user"
        };
        fetch(`https://eco-track-server-orcin.vercel.app/users`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        });
        toast.success("Joined successfully with Google!");
        navigate("/");
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-100 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      
      {/* Background Decorative Blur */}
      <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-slate-200/40 rounded-full blur-3xl"></div>

      <Container>
        <div className="max-w-lg w-full mx-auto relative z-10">
          
          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white">
            
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Join <span className="text-[#297B33]">EcoTrack</span></h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Start your eco-friendly journey</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Name */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-5 py-3.5 bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#297B33] transition-all font-semibold outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-5 py-3.5 bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#297B33] transition-all font-semibold outline-none"
                  required
                />
              </div>

              {/* Photo URL */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Photo URL (Optional)</label>
                <input
                  type="url"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  placeholder="https://image.link"
                  className="w-full px-5 py-3.5 bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#297B33] transition-all font-semibold outline-none"
                />
              </div>

              {/* Password */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Create Password</label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-5 py-3.5 bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#297B33] transition-all font-semibold outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#297B33]"
                  >
                    {show ? <FaEye size={18} /> : <IoEyeOff size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full md:col-span-2 bg-slate-900 hover:bg-[#297B33] text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 transform active:scale-95 shadow-xl mt-4"
              >
                {loading ? <span className="loading loading-spinner loading-xs"></span> : "Create Account"}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-slate-400">
                <span className="bg-white/0 px-4">Instant Signup</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-black text-xs uppercase tracking-widest text-slate-600"
            >
              <FaGoogle className="text-emerald-500" />
              <span>Continue with Google</span>
            </button>

            <p className="text-center mt-8 text-xs font-bold text-slate-400 uppercase tracking-tighter">
              Member already?{" "}
              <Link to="/login" className="text-[#297B33] hover:text-[#82B532] underline underline-offset-4">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;