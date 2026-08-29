import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, ExternalLink, Eye, ArrowUpRight, Filter, Layers } from "lucide-react";
import TiltCard from "./3d/TiltCard";
import QuickViewModal from "./QuickViewModal";
import webData from "../Data/webData";

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "saas", label: "SaaS & Subscriptions" },
  { id: "crm", label: "CRM & ERP" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "realestate", label: "Real Estate & Portals" },
];

const Projects = ({ projects: propProjects }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [quickViewProject, setQuickViewProject] = useState(null);

  // Use props projects if available and non-empty, otherwise fallback to webData
  const baseProjects =
    Array.isArray(propProjects) && propProjects.length > 0
      ? propProjects
      : webData.projects;

  // Filter & Search Logic
  const filteredProjects = useMemo(() => {
    return baseProjects
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "all") {
          const type = (p.type || "").toLowerCase();
          if (selectedCategory === "crm" && !["crm", "erp", "healthcare"].includes(type)) return false;
          if (selectedCategory !== "crm" && type !== selectedCategory) return false;
        }

        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const title = (p.title || "").toLowerCase();
          const desc = (p.description || "").toLowerCase();
          const tech = (p.techStack || []).join(" ").toLowerCase();
          return title.includes(q) || desc.includes(q) || tech.includes(q);
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return (a.amount || 0) - (b.amount || 0);
        if (sortBy === "price-high") return (b.amount || 0) - (a.amount || 0);
        if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
        return 0; // default featured order
      });
  }, [baseProjects, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 relative bg-slate-950/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Proven <span className="text-gradient">Production Work</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4">
            Explore a curated selection of full-stack web applications, SaaS dashboards, and mobile backends delivered for real clients.
          </p>
        </div>

        {/* Filter Bar & Search Controls */}
        <div className="mb-10 space-y-4">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border
                    ${
                      isSelected
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105"
                        : "bg-slate-900/60 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                    }
                  `}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by title, React, Next.js, MERN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/70 border border-white/10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results Count & Sort Dropdown */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-gray-400 font-medium">
                Showing <strong className="text-white">{filteredProjects.length}</strong> projects
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 border border-white/10 text-gray-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Project 3D Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl glass-panel border border-white/10">
            <Layers size={40} className="mx-auto text-gray-500 mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Projects Found</h3>
            <p className="text-xs text-gray-400 mb-4">
              Try adjusting your search query or switching to another category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => {
              const imageSrc =
                project.images?.[0]?.url ||
                (typeof project.images?.[0] === "string" ? project.images[0] : null) ||
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71";

              return (
                <TiltCard key={project._id} maxTilt={9} scale={1.02}>
                  <div className="h-full rounded-3xl overflow-hidden glass-card border border-white/10 flex flex-col justify-between group hover:border-blue-500/50 shadow-xl transition-all duration-300">
                    {/* Image Area with Zoom & Badges */}
                    <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-950">
                      <img
                        src={imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-60 transition duration-300" />

                      {/* Price Badge */}
                      <div className="absolute top-3.5 right-3.5 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-400 border border-emerald-500/30 shadow-lg">
                        ₹{project.amount?.toLocaleString("en-IN") || "Custom"}
                      </div>

                      {/* Floating Action Buttons on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] bg-black/40">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProject(project);
                          }}
                          className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/40 transition transform hover:scale-110"
                          title="Quick View Modal"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => navigate(`/project/${project._id}`)}
                          className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-white/20 shadow-xl transition transform hover:scale-110"
                          title="Full Details Page"
                        >
                          <ArrowUpRight size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        {/* Title */}
                        <h3
                          onClick={() => navigate(`/project/${project._id}`)}
                          className="text-lg sm:text-xl font-bold text-white mb-2 cursor-pointer group-hover:text-blue-300 transition line-clamp-1"
                        >
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {(project.techStack || []).slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-800/80 border border-white/5 text-blue-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {(project.techStack || []).length > 3 && (
                            <span className="px-2 py-0.5 rounded-md text-[11px] bg-slate-800 text-gray-400">
                              +{(project.techStack || []).length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <button
                          onClick={() => setQuickViewProject(project)}
                          className="text-xs font-semibold text-gray-300 hover:text-blue-400 flex items-center gap-1 transition"
                        >
                          <Eye size={14} /> Quick Preview
                        </button>

                        <button
                          onClick={() => navigate(`/project/${project._id}`)}
                          className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 group-hover:translate-x-0.5 transition"
                        >
                          <span>Details</span>
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick View Interactive Modal */}
      <QuickViewModal
        project={quickViewProject}
        isOpen={Boolean(quickViewProject)}
        onClose={() => setQuickViewProject(null)}
      />
    </section>
  );
};

export default Projects;
