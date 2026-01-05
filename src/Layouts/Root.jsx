import React from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Outlet, useLocation } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
  const { pathname } = useLocation();

  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='flex flex-col min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 font-sans selection:bg-emerald-500 selection:text-slate-950'>
  
      <header className='sticky top-0 z-[100]'>
        <Navbar />
      </header>

    
      <main className='flex-1 relative'>
    
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-screen pointer-events-none -z-10 opacity-50">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px]"></div>
        </div>
        
        <Outlet />
      </main>

      
      <footer className='mt-auto'>
        <Footer />
      </footer>

     
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Root;