import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import View from "./components/View";
import { API } from "./Data/webData";


function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

     
useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API}/api/getall`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  fetchData();
}, []);

 

  return (
    <Router>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <svg class="pl" width="240" height="240" viewBox="0 0 240 240">
            <circle
              class="pl__ring pl__ring--a"
              cx="120"
              cy="120"
              r="105"
              fill="none"
              stroke="#000"
              stroke-width="20"
              stroke-dasharray="0 660"
              stroke-dashoffset="-330"
              stroke-linecap="round"
            ></circle>
            <circle
              class="pl__ring pl__ring--b"
              cx="120"
              cy="120"
              r="35"
              fill="none"
              stroke="#000"
              stroke-width="20"
              stroke-dasharray="0 220"
              stroke-dashoffset="-110"
              stroke-linecap="round"
            ></circle>
            <circle
              class="pl__ring pl__ring--c"
              cx="85"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              stroke-width="20"
              stroke-dasharray="0 440"
              stroke-linecap="round"
            ></circle>
            <circle
              class="pl__ring pl__ring--d"
              cx="155"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              stroke-width="20"
              stroke-dasharray="0 440"
              stroke-linecap="round"
            ></circle>
          </svg>
        </div>
      ) : (
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <div className="min-h-screen">
                <Navbar />
                <Hero hero={data?.webContent.heroSection} />
                <About />
                <Services />
                <Projects projects={data?.projects || []} />
                <Contact />
                <Footer />
              </div>
            }
          />

          <Route
            path="/project/:id"
            element={<View projects={data?.projects || []} />}
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;