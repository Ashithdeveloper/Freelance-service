import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Code, Cpu, ShieldCheck, Zap, Layers } from "lucide-react";
import ThreeHeroCanvas from "./3d/ThreeHeroCanvas";
import TiltCard from "./3d/TiltCard";

const ROLES = [
  "Full-Stack MERN Developer",
  "Next.js 15 & Cloud Architect",
  "React Native Mobile Engineer",
  "High-Scale SaaS & CRM Builder",
  "Interactive 3D & WebGL Designer",
];

const Hero = ({ hero, onOpenEstimator }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText === currentRole) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden cyber-grid"
    >
      {/* 3D Three.js Interactive WebGL Background */}
      <ThreeHeroCanvas />

      {/* Ambient Radial Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Core Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-glow border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 shadow-lg shadow-emerald-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 absolute" />
          <span>Available for Freelance & Contract Projects</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
          Architecting{" "}
          <span className="text-gradient">Scalable Web Apps</span>
          <br className="hidden sm:inline" /> & High-Impact Digital Products
        </h1>

        {/* Dynamic Typewriter Subtitle */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-6">
          <span className="text-lg sm:text-2xl font-semibold text-gray-300">
            Specializing in{" "}
            <span className="text-cyan-400 font-mono font-bold underline decoration-blue-500/50">
              {displayedText}
            </span>
            <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 animate-pulse" />
          </span>
        </div>

        <p className="max-w-2xl text-gray-400 text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
          Transforming complex business requirements into sleek, lightning-fast
          applications with robust architecture, modern 3D UI, and seamless user experiences.
        </p>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none mb-12">
          <a
            href="#projects"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore Projects
            <ArrowRight size={18} />
          </a>

          <button
            onClick={onOpenEstimator}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl glass-panel border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-950/50 font-bold text-sm sm:text-base shadow-lg transition duration-300 transform hover:-translate-y-0.5"
          >
            <Sparkles size={18} className="text-cyan-400" />
            Estimate Project Cost
          </button>
        </div>

        {/* Live Key Stats Banner with 3D Tilt */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
          <TiltCard maxTilt={8} scale={1.03}>
            <div className="p-4 rounded-2xl glass-card text-center border border-white/5 h-full flex flex-col justify-center items-center">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2">
                <Code size={18} />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-white">20+</span>
              <span className="text-xs text-gray-400 font-medium mt-1">Delivered Projects</span>
            </div>
          </TiltCard>

          <TiltCard maxTilt={8} scale={1.03}>
            <div className="p-4 rounded-2xl glass-card text-center border border-white/5 h-full flex flex-col justify-center items-center">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                <ShieldCheck size={18} />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-white">100%</span>
              <span className="text-xs text-gray-400 font-medium mt-1">Client Satisfaction</span>
            </div>
          </TiltCard>

          <TiltCard maxTilt={8} scale={1.03}>
            <div className="p-4 rounded-2xl glass-card text-center border border-white/5 h-full flex flex-col justify-center items-center">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2">
                <Zap size={18} />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-white">99.9%</span>
              <span className="text-xs text-gray-400 font-medium mt-1">Uptime & Performance</span>
            </div>
          </TiltCard>

          <TiltCard maxTilt={8} scale={1.03}>
            <div className="p-4 rounded-2xl glass-card text-center border border-white/5 h-full flex flex-col justify-center items-center">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2">
                <Layers size={18} />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-white">24/7</span>
              <span className="text-xs text-gray-400 font-medium mt-1">Dedicated Support</span>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default Hero;
