import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = ({ role }) => {
  return (
    <aside
      className="
      hidden md:flex
      md:w-64
      min-h-screen
      bg-black
      text-white
      p-6
      flex-col
      border-r
    "
    >
      <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>

      <nav className="flex flex-col gap-4 text-sm font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-gray-800 px-3 py-2 rounded-md"
              : "text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md"
          }
        >
          WebContent
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-gray-800 px-3 py-2 rounded-md"
              : "text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md"
          }
        >
          Services
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-gray-800 px-3 py-2 rounded-md"
              : "text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md"
          }
        >
          Projects
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-gray-800 px-3 py-2 rounded-md"
              : "text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md"
          }
        >
          Contact
        </NavLink>

        {role === "superadmin" && (
          <NavLink
            to="/managers"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-gray-800 px-3 py-2 rounded-md"
                : "text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md"
            }
          >
            Managers
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default SideBar;
