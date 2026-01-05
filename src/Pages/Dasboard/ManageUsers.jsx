import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaSearch, FaFilter, FaUserCheck, FaUserShield, FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";


const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Fetch all users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Filtering Logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleUpdateRole = (user, newRole) => {
    axiosSecure.patch(`/users/role/${user._id}`, { role: newRole }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Role Updated!",
          text: `${user.name} is now a ${newRole}.`,
          icon: "success",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#10b981",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">System <span className="text-emerald-500">Access</span></h2>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Manage permissions and roles</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-10 pr-10 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold text-xs uppercase tracking-widest cursor-pointer"
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins</option>
              <option value="staff">Staff</option>
              <option value="user">Users</option>
            </select>
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">User Details</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Current Status</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Promote/Demote Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-slate-500 italic">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 ${
                    user.role === 'admin' ? 'bg-rose-500/10 text-rose-500' : 
                    user.role === 'staff' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {user.role === 'admin' ? <FaUserShield /> : user.role === 'staff' ? <FaUserEdit /> : <FaUserCheck />}
                    {user.role || 'user'}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleUpdateRole(user, 'staff')}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-white rounded-xl text-[10px] font-black uppercase transition-all"
                    >
                      Staff
                    </button>
                    <button 
                      onClick={() => handleUpdateRole(user, 'admin')}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white rounded-xl text-[10px] font-black uppercase transition-all"
                    >
                      Admin
                    </button>
                    <button 
                      onClick={() => handleUpdateRole(user, 'user')}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white rounded-xl text-[10px] font-black uppercase transition-all"
                    >
                      User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="p-20 text-center text-slate-500 font-bold uppercase tracking-widest text-xs">
            No users found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;