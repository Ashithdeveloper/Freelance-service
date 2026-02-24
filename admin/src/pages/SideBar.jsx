import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useAuthStore from "../../Zustand/user.store";

const SideBar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthStore((state) => state);

  const handleLogout = () => {
    logout();
    
    setIsOpen(false);
  };

  return (
    <>
      {/* 🔹 Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-black text-white fixed w-full top-0 z-40">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
        <button onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* 🔹 Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          w-64 h-screen
          bg-black text-white
          flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:flex
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">
            {role?.toUpperCase()}
          </h1>

          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-6 text-sm font-medium flex-1">
          <NavItem to="/" label="WebContent" close={() => setIsOpen(false)} />
          <NavItem
            to="/services"
            label="Services"
            close={() => setIsOpen(false)}
          />
          <NavItem
            to="/projects"
            label="Projects"
            close={() => setIsOpen(false)}
          />
          <NavItem
            to="/contact"
            label="Contact"
            close={() => setIsOpen(false)}
          />

          {role === "superadmin" && (
            <NavItem
              to="/managers"
              label="Managers"
              close={() => setIsOpen(false)}
            />
          )}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-red-600 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

const NavItem = ({ to, label, close }) => {
  return (
    <NavLink
      to={to}
      onClick={close}
      className={({ isActive }) =>
        `px-4 py-2 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-gray-800 text-white"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      {label}
    </NavLink>
  );
};

export default SideBar;
