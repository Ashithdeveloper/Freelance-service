import { Navigate, Route, Routes } from "react-router-dom";
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
import { useEffect} from "react";
import axiosInstance from "../axois";
import useDataStore from "../Zustand/datahandle";


function App() {
  
const { user } = useAuthStore((state) => state);
const { setProjects, setService, setWebcontent, setWebContact } = useDataStore();



useEffect(() => {
  const getall = async () => {
    try {
     const res = await axiosInstance.get("/getall");
     console.log("res", res.data);
     console.log("Setting projects:", res.data.projects);
      setProjects(res.data.projects);
      setService(res.data.services);
      setWebcontent(res.data.webContent);
      setWebContact(res.data.webContact);
      


    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  };

  getall();
}, []);




console.log(user);
  return (
    <>
      {!user && <Login />}
      {user && (
        <Routes>
          {/* Protected Layout */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="flex h-screen overflow-hidden">
                  <SideBar
                    role={user?.role}
                    username={user?.username}
                  />
                  <div className="flex-1 md:ml-64 overflow-y-auto bg-gray-50 pt-16 md:pt-0">
                    <div className="p-6 md:p-8">
                      <Routes>
                        <Route
                          path="/"
                          element={<WebContent  />}
                        />
                        <Route
                          path="/managers"
                          element={
                            <ProtectedRoute allowedRoles={["superadmin"]}>
                              <Manager />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/projects"
                          element={<Projects />}
                        />
                        <Route
                          path="/services"
                          element={<Service  />}
                        />
                        <Route
                          path="/contact"
                          element={<Contact  />}
                        />
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
      )}
    </>
  );
}

export default App;
