import React, { useState, useContext } from "react";
import Container from "../Layouts/Container";
import { AuthContext } from "../Context/AuthContext";
import { IoEyeOff } from "react-icons/io5";
import { FaEye, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const { signInWithGoogle, setLoading, setUser, loginUser, loading } = useContext(AuthContext);
  
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    loginUser(formData.email, formData.password)
      .then((res) => {
        setUser(res.user);
        toast.success("Welcome Back to EcoTrack!");
        navigate(from);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        toast.error("Invalid credentials.");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        setLoading(false);
        setUser(result.user);
        toast.success("Google Login Successful!");
        navigate(from);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-100 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-slate-200/40 rounded-full blur-3xl"></div>

      <Container>
        <div className="max-w-md w-full mx-auto relative z-10">
          <div className="text-center mb-6">
          
            <h2 className="text-3xl font-black text-slate-800 mt-4 tracking-tighter">
              ECO<span className="text-emerald-500">TRACK</span>
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white">
            <div className="text-center mb-8">
               <h3 className="text-xl font-bold text-slate-900">Sign In</h3>
               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Access your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-6 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold text-slate-700"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                  <Link to="/forgot-password" size="sm" className="text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-700">Forgot?</Link>
                </div>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-6 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold text-slate-700"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors"
                  >
                    {show ? <FaEye size={18} /> : <IoEyeOff size={18} />}
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-emerald-500 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 transform active:scale-95 shadow-xl shadow-slate-200 disabled:opacity-50 mt-2"
              >
                {loading ? <span className="loading loading-spinner loading-xs"></span> : "Enter Dashboard"}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-slate-400">
                <span className="bg-white/0 px-4">Social Login</span>
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
              New explorer?{" "}
              <Link to="/register" className="text-emerald-600 hover:text-emerald-700">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;