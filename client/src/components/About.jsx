import { useState } from "react";
import { User, CheckCircle2, Award, Terminal, Rocket, Cpu, Sparkles } from "lucide-react";
import TechSphere from "./3d/TechSphere";
import TiltCard from "./3d/TiltCard";

const CORE_STRENGTHS = [
  {
    icon: Terminal,
    title: "Full-Stack Mastery",
    desc: "Seamless end-to-end development combining reactive frontends with robust Node.js/Express and MongoDB backends.",
  },
  {
    icon: Rocket,
    title: "Lightning Performance",
    desc: "Optimized SSR, lazy loading, lightweight WebGL shaders, and caching for 95+ Google Lighthouse scores.",
  },
  {
    icon: Cpu,
    title: "Modern 3D & Interactions",
    desc: "Crafting captivating user experiences with Three.js, WebGL shaders, and smooth Framer Motion interactions.",
  },
  {
    icon: Award,
    title: "Production Reliability",
    desc: "Clean modular architecture, comprehensive validation, REST/GraphQL APIs, and enterprise-grade security.",
  },
];

const SKILL_METRICS = [
  { name: "Frontend (React / Next.js / Tailwind)", pct: 95, color: "from-blue-500 to-cyan-400" },
  { name: "Backend (Node.js / Express / REST APIs)", pct: 90, color: "from-emerald-500 to-teal-400" },
  { name: "Databases (MongoDB / PostgreSQL)", pct: 88, color: "from-indigo-500 to-purple-400" },
  { name: "3D & Animations (Three.js / WebGL / Canvas)", pct: 85, color: "from-purple-500 to-pink-500" },
  { name: "Mobile Development (React Native)", pct: 82, color: "from-amber-500 to-orange-400" },
];

const About = () => {
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative bg-slate-950/60 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            <span>Developer Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Crafting Exceptional <span className="text-gradient">Digital Experiences</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4">
            Passionate full-stack developer dedicated to helping startups and enterprises build
            scalable web applications, powerful admin dashboards, and custom software systems.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl glass-panel border border-white/10">
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "skills"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              3D Tech Cloud & Skills
            </button>
            <button
              onClick={() => setActiveTab("strengths")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "strengths"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Core Strengths
            </button>
            <button
              onClick={() => setActiveTab("story")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "story"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Background & Workflow
            </button>
          </div>
        </div>

        {/* Tab Content 1: 3D Skills & Metrics */}
        {activeTab === "skills" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: 3D Tech Sphere */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-3xl glass-card border border-white/5 relative">
              <div className="text-center mb-2">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Interactive 3D Tag Cloud
                </span>
                <p className="text-xs text-gray-400">
                  Hover or drag to rotate • Click any badge to inspect
                </p>
              </div>
              <TechSphere radius={150} />
            </div>

            {/* Right: Detailed Skill Bars */}
            <div className="lg:col-span-6 space-y-5">
              <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Cpu className="text-blue-400" size={20} />
                  <span>Technical Proficiency</span>
                </h3>

                <div className="space-y-4">
                  {SKILL_METRICS.map((skill, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-blue-400 font-mono">{skill.pct}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                          style={{ width: `${skill.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span>🚀 Always staying updated with modern web standards</span>
                  <span className="text-emerald-400 font-semibold">Ready for New Projects</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Core Strengths */}
        {activeTab === "strengths" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_STRENGTHS.map((item, index) => {
              const Icon = item.icon;
              return (
                <TiltCard key={index} maxTilt={10} scale={1.03}>
                  <div className="p-6 rounded-3xl glass-card border border-white/5 h-full flex flex-col justify-between group hover:border-blue-500/40 transition-all">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                        <Icon size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-blue-400 font-semibold">
                      <CheckCircle2 size={14} />
                      <span>Verified Standard</span>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        )}

        {/* Tab Content 3: Story & Background */}
        {activeTab === "story" && (
          <div className="max-w-4xl mx-auto p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Ashith S F</h3>
                <p className="text-xs text-purple-300 font-mono">
                  Full Stack Engineer & Founder of A4-TechSentinels
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Based in Kanniyakumari, Tamil Nadu, India, I specialize in building end-to-end web and mobile applications with clean architecture and modern user interfaces. My journey covers everything from high-converting landing pages to multi-tenant SaaS dashboards, e-commerce marketplaces, hospital & school ERP systems, and REST API services.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <p className="text-xs text-gray-400">Location</p>
                <p className="text-sm font-semibold text-white mt-1">Tamil Nadu, India</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <p className="text-xs text-gray-400">Collaboration</p>
                <p className="text-sm font-semibold text-white mt-1">Remote Worldwide</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <p className="text-xs text-gray-400">Turnaround</p>
                <p className="text-sm font-semibold text-white mt-1">Fast & Milestone-driven</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
