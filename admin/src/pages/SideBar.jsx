import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Globe,
  Briefcase,
  FolderKanban,
  PhoneCall,
  Users,
  LogOut,
  Shield,
  Code2,
  ExternalLink,
  Inbox,
} from "lucide-react";
import useAuthStore from "../../Zustand/user.store";
import useDataStore from "../../Zustand/datahandle";

const SideBar = ({ role, username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthStore((state) => state);
  const inquiryStats = useDataStore((state) => state.inquiryStats);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const navLinks = [
    { to: "/inquiries", label: "Client Inquiries", icon: Inbox, badge: inquiryStats?.new || 0 },
    { to: "/", label: "Web Content", icon: Globe },
    { to: "/services", label: "Services", icon: Briefcase },
    { to: "/projects", label: "Projects", icon: FolderKanban },
    { to: "/contact", label: "Contact Info", icon: PhoneCall },
  ];

  if (role === "superadmin") {
    navLinks.push({ to: "/managers", label: "Managers", icon: Users });
  }

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between px-5 py-3.5 bg-slate-950/90 border-b border-white/10 text-white fixed w-full top-0 z-40 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center">
            <Code2 className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-white">Admin Console</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg bg-slate-800 text-gray-300 hover:text-white"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          w-64 h-screen
          bg-slate-950 border-r border-white/10
          flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Code2 className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-black text-white tracking-tight">
                  A4 <span className="text-gradient">Control</span>
                </h1>
                <p className="text-[10px] text-gray-400 uppercase font-mono">
                  Freelance Admin
                </p>
              </div>
            </div>
            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="mx-4 my-4 p-3 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
              {username ? username[0].toUpperCase() : "A"}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-bold text-white truncate">
                {username || "Administrator"}
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold uppercase">
                <Shield size={10} />
                {role || "Admin"}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 px-4 text-xs font-medium">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/25 border border-blue-400/30"
                        : "text-gray-400 hover:bg-slate-900 hover:text-gray-200"
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon size={17} />
                    <span>{link.label}</span>
                  </div>

                  {Boolean(link.badge) && link.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-slate-950 shadow-md animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer / Quick Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-gray-300 hover:text-white text-xs font-medium border border-white/5 transition"
          >
            <ExternalLink size={13} />
            <span>Open Public Site</span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-white text-xs font-bold border border-red-500/30 transition shadow-md"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
