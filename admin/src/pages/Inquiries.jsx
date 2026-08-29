import React, { useEffect, useState } from "react";
import useDataStore from "../../Zustand/datahandle";
import {
  Inbox,
  Search,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Sparkles,
  Layers,
  Filter,
  DollarSign,
  Calendar,
  Zap,
} from "lucide-react";

const Inquiries = () => {
  const {
    inquiries,
    inquiryStats,
    fetchInquiries,
    updateInquiryStatus,
    deleteInquiry,
    loadingInquiries,
  } = useDataStore();

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchInquiries(selectedStatus, searchQuery);
  }, [selectedStatus]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchInquiries(selectedStatus, searchQuery);
  };

  const handleWhatsAppReply = (inquiry) => {
    const phone = inquiry.phone
      ? inquiry.phone.replace(/[^0-9]/g, "")
      : "";

    const text = encodeURIComponent(
      `Hello ${inquiry.name}! This is Ashith from A4-TechSentinels. I received your project inquiry regarding "${inquiry.serviceType}". I would love to connect with you and discuss the roadmap!`
    );

    if (phone) {
      window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    } else {
      window.open(`https://wa.me/?text=${text}`, "_blank");
    }
  };

  const handleEmailReply = (inquiry) => {
    const subject = encodeURIComponent(
      `Re: Your Project Inquiry for ${inquiry.serviceType} - A4-TechSentinels`
    );
    const body = encodeURIComponent(
      `Hi ${inquiry.name},\n\nThank you for reaching out regarding your project for ${inquiry.serviceType}.\n\nI have reviewed your requirements and would love to schedule a quick call to discuss the specifications and timeline.\n\nBest regards,\nAshith S F\nFounder & Full Stack Engineer, A4-TechSentinels`
    );
    window.open(`mailto:${inquiry.email}?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-blue-500/20 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">Total Inquiries</p>
            <h4 className="text-2xl font-black text-white mt-1">
              {inquiryStats.total || 0}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Inbox size={20} />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel-glow border border-emerald-500/30 flex items-center justify-between">
          <div>
            <p className="text-xs text-emerald-400 font-bold uppercase">New Leads</p>
            <h4 className="text-2xl font-black text-white mt-1">
              {inquiryStats.new || 0}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-pulse">
            <Zap size={20} />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-purple-500/20 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">In Discussion</p>
            <h4 className="text-2xl font-black text-white mt-1">
              {inquiryStats.in_discussion || 0}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <MessageSquare size={20} />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">Closed / Done</p>
            <h4 className="text-2xl font-black text-white mt-1">
              {inquiryStats.completed || 0}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 space-y-6">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Sparkles size={14} />
              <span>Client Inquiries & Quote Leads</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              Project Leads Manager
            </h2>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by client or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </form>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { id: "all", label: "All Leads" },
            { id: "new", label: "New Leads" },
            { id: "in_discussion", label: "In Discussion" },
            { id: "completed", label: "Completed" },
            { id: "archived", label: "Archived" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedStatus === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-slate-900/60 text-gray-400 hover:text-white border border-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Inquiries List */}
        {loadingInquiries ? (
          <div className="text-center py-16 text-gray-400 text-xs flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading Inquiries...</span>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-white/5">
            <Inbox size={40} className="mx-auto text-gray-500 mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Inquiries Found</h3>
            <p className="text-xs text-gray-400">
              When clients submit contact messages or quote estimates from the portfolio, they will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => {
              const isQuote = inquiry.source === "quote_estimator" || inquiry.estimatedPrice > 0;
              const formattedDate = new Date(inquiry.createdAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              });

              return (
                <div
                  key={inquiry._id}
                  className={`p-6 rounded-2xl glass-card border transition-all ${
                    inquiry.status === "new"
                      ? "border-emerald-500/40 bg-slate-900/80 shadow-lg shadow-emerald-500/5"
                      : "border-white/10"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm shrink-0">
                        {inquiry.name ? inquiry.name[0].toUpperCase() : "C"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-bold text-white">{inquiry.name}</h4>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                              isQuote
                                ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            }`}
                          >
                            {isQuote ? "Interactive Quote Estimate" : "Contact Form Inquiry"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                          <Mail size={12} /> {inquiry.email}
                          {inquiry.phone && (
                            <>
                              <span>•</span>
                              <Phone size={12} /> {inquiry.phone}
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Status Changer Dropdown */}
                    <div className="flex items-center gap-3 w-full lg:w-auto justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                        <Clock size={13} />
                        <span>{formattedDate}</span>
                      </div>

                      <select
                        value={inquiry.status}
                        onChange={(e) => updateInquiryStatus(inquiry._id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none ${
                          inquiry.status === "new"
                            ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/40"
                            : inquiry.status === "in_discussion"
                            ? "bg-purple-950/60 text-purple-300 border-purple-500/40"
                            : inquiry.status === "completed"
                            ? "bg-blue-950/60 text-blue-300 border-blue-500/40"
                            : "bg-slate-800 text-gray-400 border-white/10"
                        }`}
                      >
                        <option value="new">🟢 New Lead</option>
                        <option value="in_discussion">🟣 In Discussion</option>
                        <option value="completed">🔵 Completed</option>
                        <option value="archived">⚪ Archived</option>
                      </select>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                      <span className="text-gray-500 block mb-0.5">Service Requested</span>
                      <span className="font-bold text-white text-sm">{inquiry.serviceType}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                      <span className="text-gray-500 block mb-0.5">Budget / Estimate</span>
                      <span className="font-bold text-emerald-400 text-sm">
                        {inquiry.estimatedPrice
                          ? `₹${inquiry.estimatedPrice.toLocaleString("en-IN")}`
                          : inquiry.budget || "Not Specified"}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                      <span className="text-gray-500 block mb-0.5">Target Timeline</span>
                      <span className="font-bold text-cyan-300 text-sm">
                        {inquiry.estimatedDays
                          ? `~${inquiry.estimatedDays} days`
                          : inquiry.timeline || "Standard"}
                      </span>
                    </div>
                  </div>

                  {/* Selected Features */}
                  {inquiry.features && inquiry.features.length > 0 && (
                    <div className="mb-4">
                      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Requested Modules & Features:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {inquiry.features.map((feat, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px]"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  {inquiry.message && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-white/5 mb-4 text-xs text-gray-300 leading-relaxed">
                      <span className="text-gray-500 block text-[10px] uppercase font-bold mb-1">
                        Client Message:
                      </span>
                      {inquiry.message}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleWhatsAppReply(inquiry)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition"
                      >
                        <MessageSquare size={14} /> Reply on WhatsApp
                      </button>

                      <button
                        onClick={() => handleEmailReply(inquiry)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
                      >
                        <Mail size={14} /> Send Email
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this client inquiry?")) {
                          deleteInquiry(inquiry._id);
                        }
                      }}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-white text-xs font-semibold border border-red-500/20 transition"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inquiries;
