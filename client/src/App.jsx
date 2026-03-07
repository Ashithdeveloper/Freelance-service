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

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API}/api/getall`);
      console.log(res.data);
      setData(res.data);
    };
    fetchData();
  }, []);

 

  return (
    <Router>
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
    </Router>
  );
}

export default App;