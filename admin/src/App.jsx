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
import { useEffect, useState } from "react";
import axiosInstance from "../axois";


function App() {
  
const { user } = useAuthStore((state) => state);
const [first, setFirst] = useState(true);

useEffect(() => {
  const getall = async () => {
    try {
      const res = await axiosInstance.post("/getall");
      console.log(res);

      
      setFirst(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFirst(true);
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
                    first={first}
                  />
                  <div className="flex-1 md:ml-64 overflow-y-auto bg-gray-50 pt-16 md:pt-0">
                    <div className="p-6 md:p-8">
                      <Routes>
                        <Route
                          path="/"
                          element={<WebContent first={first} />}
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
                          element={<Projects first={first} />}
                        />
                        <Route
                          path="/services"
                          element={<Service first={first} />}
                        />
                        <Route
                          path="/contact"
                          element={<Contact first={first} />}
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
