import React from "react";

const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  loading = false, 
  className = "",
  disabled = false,
  fullWidth = false 
}) => {
  
 
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  

  const variants = {
    primary: "bg-emerald-500 text-slate-950 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20",
    secondary: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700",
    outline: "border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-slate-950",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white",
    ghost: "text-slate-500 hover:text-emerald-500 bg-transparent"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
    >
      {loading ? (
        <div className="flex items-center gap-2">
         
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          <span>Processing</span>
        </div>
      ) : (
        <span className="flex items-center gap-2">{children}</span>
      )}
      
      
      {!loading && !disabled && (
        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      )}
    </button>
  );
};

export default Button;