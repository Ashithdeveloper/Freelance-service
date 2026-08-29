import React, { useState } from "react";
import useDataStore from "../../Zustand/datahandle";
import {
  Briefcase,
  Code,
  LayoutDashboard,
  ShoppingCart,
  Smartphone,
  Settings,
  Database,
  Cloud,
  Edit3,
  Trash2,
  Sparkles,
  Plus,
  X,
  CheckCircle2,
} from "lucide-react";

const ICON_OPTIONS = [
  { id: "Code", label: "Web Code", icon: Code },
  { id: "LayoutDashboard", label: "Dashboard / SaaS", icon: LayoutDashboard },
  { id: "ShoppingCart", label: "E-Commerce", icon: ShoppingCart },
  { id: "Smartphone", label: "Mobile Apps", icon: Smartphone },
  { id: "Settings", label: "Custom Software", icon: Settings },
  { id: "Database", label: "Database / APIs", icon: Database },
  { id: "Cloud", label: "Cloud & DevOps", icon: Cloud },
];

const SERVICE_CATEGORIES = [
  "website",
  "webapp",
  "ecommerce",
  "mobileapp",
  "custom",
  "cloud",
];

const Service = () => {
  const services = useDataStore((state) => state.services);
  const addService = useDataStore((state) => state.addService);
  const editService = useDataStore((state) => state.editService);
  const deleteService = useDataStore((state) => state.deleteService);

  const [editingId, setEditingId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Code",
    type: "website",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSelect = (service) => {
    setEditingId(service._id);
    setFormData({
      title: service.title || "",
      description: service.description || "",
      icon: service.icon || "Code",
      type: service.type || "website",
      isActive: service.isActive !== undefined ? service.isActive : true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId("");
    setFormData({
      title: "",
      description: "",
      icon: "Code",
      type: "website",
      isActive: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await editService(editingId, formData);
    } else {
      await addService(formData);
    }
    cancelEdit();
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Service Form */}
      <div className="rounded-3xl glass-panel-glow border border-white/10 p-6 sm:p-10 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Sparkles size={14} />
              <span>Service Catalogue</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {editingId ? "Edit Service Offering" : "Add New Freelance Service"}
            </h2>
          </div>
          {editingId && (
            <button
              onClick={cancelEdit}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 text-gray-300 hover:text-white text-xs border border-white/10"
            >
              <X size={14} /> Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Service Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Custom SaaS Platforms"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Category Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Service Category Key
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
              >
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Service Description *
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="What value and deliverables does this service include?"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition resize-none"
            />
          </div>

          {/* Icon Picker */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Select Display Icon
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {ICON_OPTIONS.map((item) => {
                const Icon = item.icon;
                const isSelected = formData.icon === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: item.id })}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 transition text-left ${
                      isSelected
                        ? "bg-purple-600/20 border-purple-500 text-white ring-1 ring-purple-500/50"
                        : "bg-slate-900/60 border-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    <Icon size={18} className={isSelected ? "text-purple-400" : ""} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <input
              type="checkbox"
              id="isActiveService"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 rounded text-purple-600 bg-slate-800 border-white/20 focus:ring-purple-500"
            />
            <label htmlFor="isActiveService" className="text-xs font-medium text-gray-200 cursor-pointer">
              Active & Visible to Clients
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-white/10 flex gap-3">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-500/30 transition transform hover:scale-[1.01]"
            >
              {editingId ? "Update Service" : "Add Service"}
            </button>
          </div>
        </form>
      </div>

      {/* Services List */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white">Active Service Catalog</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(services) &&
            services.map((s) => {
              const matchedIcon =
                ICON_OPTIONS.find((opt) => opt.id === s.icon)?.icon || Briefcase;
              const Icon = matchedIcon;

              return (
                <div
                  key={s._id}
                  className="p-6 rounded-2xl glass-card border border-white/10 flex flex-col justify-between group hover:border-purple-500/40 transition shadow-lg"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-purple-300 border border-white/5 font-mono">
                        {s.type}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2">{s.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      {s.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        s.isActive !== false
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {s.isActive !== false ? "Active" : "Disabled"}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSelect(s)}
                        className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-blue-400 border border-white/5 transition"
                        title="Edit service"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this service?")) {
                            deleteService(s._id);
                          }
                        }}
                        className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-red-400 border border-white/5 transition"
                        title="Delete service"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Service;
