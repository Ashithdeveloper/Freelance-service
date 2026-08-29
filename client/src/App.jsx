import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import View from "./components/View";
import CostEstimatorModal from "./components/CostEstimatorModal";
import webData, { API } from "./Data/webData";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (API) {
          const res = await axios.get(`${API}/api/getall`, { timeout: 3500 });
          if (res.data) {
            setData(res.data);
          }
        }
      } catch (error) {
        console.warn("Backend API not reachable, loading localized high-fidelity dataset:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const projectsList =
    data?.projects && data.projects.length > 0
      ? data.projects
      : webData.projects;

  const heroContent = data?.webContent?.heroSection || webData.heroSection;

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-gray-100 selection:bg-blue-600 selection:text-white">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-screen bg-slate-950 gap-4">
            <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
              <circle
                className="pl__ring pl__ring--a"
                cx="120"
                cy="120"
                r="105"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="20"
                strokeDasharray="0 660"
                strokeDashoffset="-330"
                strokeLinecap="round"
              />
              <circle
                className="pl__ring pl__ring--b"
                cx="120"
                cy="120"
                r="35"
                fill="none"
                stroke="#818cf8"
                strokeWidth="20"
                strokeDasharray="0 220"
                strokeDashoffset="-110"
                strokeLinecap="round"
              />
              <circle
                className="pl__ring pl__ring--c"
                cx="85"
                cy="120"
                r="70"
                fill="none"
                stroke="#c084fc"
                strokeWidth="20"
                strokeDasharray="0 440"
                strokeLinecap="round"
              />
              <circle
                className="pl__ring pl__ring--d"
                cx="155"
                cy="120"
                r="70"
                fill="none"
                stroke="#f472b6"
                strokeWidth="20"
                strokeDasharray="0 440"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-xs font-mono text-cyan-400 animate-pulse tracking-wider uppercase">
              Loading 3D Portfolio...
            </p>
          </div>
        ) : (
          <>
            <Routes>
              {/* Home Page */}
              <Route
                path="/"
                element={
                  <div className="min-h-screen flex flex-col">
                    <Navbar onOpenEstimator={() => setIsEstimatorOpen(true)} />
                    <main className="flex-grow">
                      <Hero
                        hero={heroContent}
                        onOpenEstimator={() => setIsEstimatorOpen(true)}
                      />
                      <About />
                      <Services
                        onOpenEstimator={() => setIsEstimatorOpen(true)}
                      />
                      <Projects projects={projectsList} />
                      <Testimonials />
                      <Contact />
                    </main>
                    <Footer />
                  </div>
                }
              />

              {/* Project Detail Route */}
              <Route
                path="/project/:id"
                element={<View projects={projectsList} />}
              />
            </Routes>

            {/* Interactive Cost Estimator & Quote Calculator Modal */}
            <CostEstimatorModal
              isOpen={isEstimatorOpen}
              onClose={() => setIsEstimatorOpen(false)}
            />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;