import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';


const ManageChallenges = () => {
    const axiosSecure = useAxiosSecure();
    const { data: challenges = [], refetch } = useQuery({
        queryKey: ['challenges'],
        queryFn: async () => {
            const res = await axiosSecure.get('/challenges');
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/challenges/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire("Deleted!", "Challenge has been removed.", "success");
                    }
                });
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Manage <span className="text-emerald-500">Challenges</span></h2>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Add or remove eco-missions</p>
                </div>
                <Link to="/challenges-add" className="btn bg-emerald-500 hover:bg-emerald-600 border-none text-slate-950 font-black gap-2 rounded-2xl">
                    <FaPlus /> Add New
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Task Title</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Category</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Points</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {challenges.map((item) => (
                            <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group">
                                <td className="p-6 font-bold text-slate-800 dark:text-white">{item.title}</td>
                                <td className="p-6 italic text-slate-500">{item.category}</td>
                                <td className="p-6">
                                    <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full font-black text-xs">
                                        {item.points} pts
                                    </span>
                                </td>
                                <td className="p-6 text-right space-x-3">
                                    <Link to={`/dashboard/edit-challenge/${item._id}`}>
                                        <button className="text-blue-500 hover:text-blue-600 transition-colors"><FaEdit /></button>
                                    </Link>
                                    <button onClick={() => handleDelete(item._id)} className="text-rose-500 hover:text-rose-600 transition-colors"><FaTrashAlt /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageChallenges;