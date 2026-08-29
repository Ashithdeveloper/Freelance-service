import { useState } from "react";
import { X, ExternalLink, Github, CheckCircle2, MessageSquare, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const QuickViewModal = ({ project, isOpen, onClose }) => {
  const [selectedImg, setSelectedImg] = useState(0);

  if (!isOpen || !project) return null;

  const images = project.images || [];
  const activeImage =
    typeof images[selectedImg] === "object"
      ? images[selectedImg]?.url
      : images[selectedImg] || "https://images.unsplash.com/photo-1551288049-bebda4e38f71";

  const handleInquire = () => {
    const text = encodeURIComponent(
      `Hi Ashith! I saw your project "${project.title}" on your portfolio and I would love to build a similar solution for my business. Can we discuss?`
    );
    window.open(`https://wa.me/916379351328?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8 bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden glass-panel">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950/40">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
              Project Preview
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[75vh] overflow-y-auto">
          {/* Left: Image Carousel & Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-white/10 aspect-video flex items-center justify-center">
              <img
                src={activeImage}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                Starting ₹{project.amount?.toLocaleString("en-IN") || "Custom"}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => {
                  const url = typeof img === "object" ? img.url : img;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition ${
                        selectedImg === idx
                          ? "border-blue-500 ring-2 ring-blue-500/30"
                          : "border-white/10 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={url}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Info & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-4">
                <h4 className="text-xs uppercase font-semibold text-gray-400 mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div>
                <h4 className="text-xs uppercase font-semibold text-gray-400 mb-2">
                  Key Highlights
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
                    <span>Responsive & High-Performance Architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
                    <span>Secure Authentication & API Integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
                    <span>Production Ready with Deployment Support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <div className="grid grid-cols-2 gap-2">
                {project.liveLink && project.liveLink !== "#" ? (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 text-gray-500 text-xs font-semibold cursor-not-allowed"
                  >
                    Private Client Demo
                  </button>
                )}

                {project.githubLink && project.githubLink !== "#" ? (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 transition"
                  >
                    <Github size={14} /> Source
                  </a>
                ) : (
                  <Link
                    to={`/project/${project._id}`}
                    onClick={onClose}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 transition"
                  >
                    Full View <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>

              <button
                onClick={handleInquire}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition"
              >
                <MessageSquare size={16} /> Inquire About Similar Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
