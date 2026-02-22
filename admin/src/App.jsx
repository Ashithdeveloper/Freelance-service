import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import SideBar from "./pages/SideBar";
import ProtectedRoute from "./ProtectedRoute";
import Manager from "./pages/Manager";
import useAuthStore from "../Zustand/user.store";
import Projects from "./pages/Projects";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import WebContent from "./pages/WebContent";

function App() {
  
const { user } = useAuthStore((state) => state);
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Layout */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="flex h-screen overflow-hidden">
              <SideBar role={user.role} />
              <div className="flex-1 md:ml-64 overflow-y-auto bg-gray-50 pt-16 md:pt-0">
                <div className="p-6 md:p-8">
                  <Routes>
                    <Route path="/" element={<WebContent />} />
                    {user.role === "superadmin" && (
                      <Route path="/managers" element={<Manager />} />
                    )}
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/services" element={<Service />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                      path="/*"
                      element={<div className="text-4xl">404</div>}
                    />
                  </Routes>
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
