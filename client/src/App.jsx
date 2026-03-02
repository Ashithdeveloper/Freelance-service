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

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/getall");
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
              <Hero />
              <About />
              <Services />
              <Projects projects={data?.projects || []} />
              <Contact />
              <Footer />
            </div>
          }
        />

        {/* Project View Page */}
        <Route
          path="/project/:id"
          element={<View projects={data?.projects || []} />}
        />
      </Routes>
    </Router>
  );
}

export default App;