import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaCheckCircle, FaLeaf } from 'react-icons/fa';

const DailyTasks = () => {
    const axiosSecure = useAxiosSecure();
    const [tasks, setTasks] = useState([
        { id: 1, name: "Use Public Transport", points: 50, completed: false },
        { id: 2, name: "Plant a Tree / Water Plants", points: 30, completed: false },
        { id: 3, name: "No Plastic Day", points: 40, completed: false }
    ]);

    const handleComplete = (id, name, pts) => {
        axiosSecure.post('/daily-task/complete', { taskId: id })
            .then(res => {
                setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: true } : t));
                Swal.fire({
                    title: `+${pts} Points!`,
                    text: `Great job on: ${name}`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#0f172a',
                    color: '#10b981'
                });
            })
            .catch(err => Swal.fire("Oops!", "Already completed today!", "error"));
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Daily <span className="text-emerald-500">Missions</span></h2>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Tasks reset in 12 hours</p>
                </div>
                <div className="text-emerald-500 text-3xl animate-pulse"><FaLeaf /></div>
            </div>

            <div className="space-y-4">
                {tasks.map(task => (
                    <div key={task.id} className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                        task.completed ? 'border-emerald-500/50 bg-emerald-500/5 opacity-60' : 'border-slate-100 dark:border-slate-800'
                    }`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                                task.completed ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                            }`}>
                                {task.completed ? <FaCheckCircle /> : task.id}
                            </div>
                            <span className="font-bold text-slate-700 dark:text-slate-200">{task.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-black text-emerald-500">+{task.points} PTS</span>
                            {!task.completed && (
                                <button 
                                    onClick={() => handleComplete(task.id, task.name, task.points)}
                                    className="px-4 py-2 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase rounded-lg hover:scale-105 transition-transform"
                                >
                                    Done
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyTasks;