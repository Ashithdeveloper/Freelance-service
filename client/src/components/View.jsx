import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import TiltCard from "./3d/TiltCard";
import webData from "../Data/webData";

const View = ({ projects: propProjects }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const allProjects =
    Array.isArray(propProjects) && propProjects.length > 0
      ? propProjects
      : webData.projects;

  const project = allProjects.find((p) => String(p._id) === String(id));

  // Scroll to top when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white px-4">
        <div className="p-8 rounded-3xl glass-panel text-center max-w-md border border-white/10">
          <Layers size={48} className="mx-auto text-blue-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="text-sm text-gray-400 mb-6">
            The requested project could not be found or has been updated.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const rawImages = project.images || [];
  const images = rawImages.map((img) =>
    typeof img === "object" ? img.url : img
  );
  if (images.length === 0) {
    images.push("https://images.unsplash.com/photo-1551288049-bebda4e38f71");
  }

  const handleWhatsAppInquire = () => {
    const text = encodeURIComponent(
      `Hello Ashith! I am interested in building a solution similar to your project "${project.title}". Can you give me more details on pricing and timeline?`
    );
    window.open(`https://wa.me/916379351328?text=${text}`, "_blank");
  };

  // Related projects
  const relatedProjects = allProjects
    .filter((p) => String(p._id) !== String(id))
    .slice(0, 3);

  return (
    <section className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 relative cyber-grid">
      {/* Glow Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Back Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 hover:border-blue-500/40 text-gray-300 hover:text-white mb-8 transition text-xs sm:text-sm font-semibold shadow-lg"
        >
          <ArrowLeft size={16} />
          <span>Back to All Projects</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-20">
          {/* LEFT: 3D Image Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <TiltCard maxTilt={5} scale={1.01}>
              <div className="rounded-3xl overflow-hidden glass-panel border border-white/10 p-3 sm:p-4 shadow-2xl bg-slate-900/80">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img
                    src={images[selectedImageIndex] || images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-400 border border-emerald-500/30">
                    Starting ₹{project.amount?.toLocaleString("en-IN") || "Custom"}
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Thumbnails Slider */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === index
                        ? "border-blue-500 ring-2 ring-blue-500/40 scale-105"
                        : "border-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Project Information */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Sparkles size={13} />
                  <span>Production Project</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {project.title}
                </h1>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack Chips */}
              <div>
                <h3 className="text-xs uppercase font-bold text-gray-400 mb-2.5 tracking-wider">
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-medium text-blue-300 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="p-4 sm:p-5 rounded-2xl glass-card border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle2 size={15} className="text-blue-400 shrink-0" />
                  <span>End-to-end responsive UI with mobile-first approach</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle2 size={15} className="text-blue-400 shrink-0" />
                  <span>High-speed API responses and database optimization</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
                  <span>Tested across browsers and security standards</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-gray-400 uppercase font-semibold">
                    Starting Development Price
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-400">
                    ₹{project.amount?.toLocaleString("en-IN") || "25,000"}
                  </p>
                </div>
                <span className="text-xs text-emerald-300/80 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Full Source Included
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.liveLink && project.liveLink !== "#" ? (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 text-gray-500 font-semibold text-xs sm:text-sm border border-white/5 cursor-not-allowed"
                  >
                    Private Client Demo
                  </button>
                )}

                {project.githubLink && project.githubLink !== "#" ? (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-white/10 transition"
                  >
                    <Github size={16} /> GitHub Repository
                  </a>
                ) : (
                  <button
                    onClick={handleWhatsAppInquire}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-white/10 transition"
                  >
                    <MessageSquare size={16} /> Request Code Walkthrough
                  </button>
                )}
              </div>

              <button
                onClick={handleWhatsAppInquire}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 transition transform hover:scale-[1.01]"
              >
                <MessageSquare size={18} /> Inquire to Build a Similar System
              </button>
            </div>
          </div>
        </div>

        {/* RELATED PROJECTS SECTION */}
        {relatedProjects.length > 0 && (
          <div className="pt-12 border-t border-white/10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Other Featured Projects
                </h3>
                <p className="text-xs text-gray-400">
                  Explore more production applications developed by Ashith
                </p>
              </div>
              <Link
                to="/"
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => {
                const relImg =
                  rel.images?.[0]?.url ||
                  (typeof rel.images?.[0] === "string" ? rel.images[0] : null) ||
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71";

                return (
                  <TiltCard key={rel._id} maxTilt={8} scale={1.02}>
                    <div
                      onClick={() => navigate(`/project/${rel._id}`)}
                      className="rounded-2xl overflow-hidden glass-card border border-white/10 cursor-pointer group hover:border-blue-500/50 transition"
                    >
                      <div className="h-44 overflow-hidden bg-slate-950">
                        <img
                          src={relImg}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-white text-sm line-clamp-1 mb-1 group-hover:text-blue-300 transition">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-emerald-400 font-semibold">
                          ₹{rel.amount?.toLocaleString("en-IN") || "Custom"}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default View;
