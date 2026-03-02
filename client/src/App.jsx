import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [ data , setData ] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/getall");
        console.log(res);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[])

  console.log(data);
  return (
    <>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Projects projects={data?.projects || []} />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
