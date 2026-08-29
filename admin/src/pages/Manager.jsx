import React, { useEffect, useState } from "react";
import axiosInstance from "../../axois";
import { toast } from "react-toastify";
import { Users, Shield, Plus, Trash2, Key, Sparkles, CheckCircle2 } from "lucide-react";

const Manager = () => {
  const [formData, setFormData] = useState({
    username: "",
    role: "Manager",
    password: "",
  });
  const [listManagers, setListManagers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchManagers = async () => {
    try {
      const response = await axiosInstance.get("/listmanagers");
      if (Array.isArray(response.data)) {
        setListManagers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/createManager", formData);
      toast.success("Manager created successfully");
      setFormData({ username: "", role: "Manager", password: "" });
      fetchManagers();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create manager");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Create Manager Card */}
      <div className="rounded-3xl glass-panel-glow border border-white/10 p-6 sm:p-10 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Sparkles size={14} />
              <span>Team & Access Control</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Create Team Member Account
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Access Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="Manager">Manager (Editor)</option>
                <option value="Admin">Admin (Full Access)</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create secure password"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition transform hover:scale-[1.01]"
            >
              <Plus size={16} />
              <span>{loading ? "Creating..." : "Add Account"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Managers List Table */}
      <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Users size={20} className="text-cyan-400" />
          <span>Active Administrators & Managers</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-gray-400 font-semibold uppercase">
              <tr>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Role Permission</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {listManagers.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-6 text-center text-gray-500">
                    No sub-managers registered yet.
                  </td>
                </tr>
              ) : (
                listManagers.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-900/40 transition">
                    <td className="py-3 px-4 font-semibold text-white">
                      {item.username}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {item.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 size={13} /> Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Manager;