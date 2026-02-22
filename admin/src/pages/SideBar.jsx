import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = ({ role}) => {
  return (
    <aside className="w-[18%] min-h-screen bg-black text-white p-6 border-r">
      <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>

      <nav className="flex flex-col gap-4">
        <NavLink to="/">WebContent</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/contact">Contact</NavLink>
       { role === "superadmin" && <NavLink to="/managers">Managers</NavLink>}
      </nav>
    </aside>
  );
};

export default SideBar;
