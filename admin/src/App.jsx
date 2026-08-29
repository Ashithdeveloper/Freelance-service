import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SideBar from "./pages/SideBar";
import ProtectedRoute from "./ProtectedRoute";
import Manager from "./pages/Manager";
import useAuthStore from "../Zustand/user.store";
import Projects from "./pages/Projects";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import WebContent from "./pages/WebContent";
import Inquiries from "./pages/Inquiries";
import { useEffect } from "react";
import axiosInstance from "../axois";
import useDataStore from "../Zustand/datahandle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useAuthStore((state) => state);
  const { setProjects, setService, setWebcontent, setWebContact, fetchInquiries } = useDataStore();

  useEffect(() => {
    const getall = async () => {
      try {
        const res = await axiosInstance.get("/getall");
        if (res.data) {
          setProjects(res.data.projects || []);
          setService(res.data.services || []);
          setWebcontent(res.data.webContent || null);
          setWebContact(res.data.webContact || null);
        }
      } catch (error) {
        console.warn("Could not fetch data from backend:", error?.message);
      }
    };

    getall();

    if (user) {
      fetchInquiries();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 selection:bg-blue-600 selection:text-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastClassName="bg-slate-900 border border-white/10 text-white"
      />

      {!user ? (
        <Login />
      ) : (
        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="flex h-screen overflow-hidden bg-slate-950">
                  <SideBar role={user?.role} username={user?.username} />

                  <div className="flex-1 md:ml-64 overflow-y-auto bg-slate-950 pt-16 md:pt-0 cyber-grid">
                    <div className="p-6 md:p-10 max-w-7xl mx-auto">
                      <Routes>
                        <Route path="/" element={<WebContent />} />
                        <Route path="/inquiries" element={<Inquiries />} />
                        <Route
                          path="/managers"
                          element={
                            <ProtectedRoute allowedRoles={["superadmin"]}>
                              <Manager />
                            </ProtectedRoute>
                          }
                        />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/services" element={<Service />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                          path="/*"
                          element={
                            <div className="h-[70vh] flex flex-col items-center justify-center text-center">
                              <h2 className="text-6xl font-black text-blue-500 mb-2">
                                404
                              </h2>
                              <p className="text-gray-400 text-sm">
                                The requested admin panel page does not exist.
                              </p>
                            </div>
                          }
                        />
                      </Routes>
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
