import useDataStore from "../../Zustand/datahandle";
import { ExternalLink, Github, Edit3, Trash2, Layers, CheckCircle2, XCircle } from "lucide-react";

const ProjectViews = ({ selectedproject }) => {
  const projects = useDataStore((state) => state.projects);
  const deleteProject = useDataStore((state) => state.deleteProject);

  if (!Array.isArray(projects) || projects.length === 0) {
    return (
      <div className="text-center py-16 p-8 rounded-3xl glass-panel border border-white/10">
        <Layers size={40} className="mx-auto text-gray-500 mb-3" />
        <h3 className="text-lg font-bold text-white mb-1">No Projects in Database</h3>
        <p className="text-xs text-gray-400">
          Use the form above to add your first portfolio project.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Live Project Catalog</h3>
          <p className="text-xs text-gray-400">
            Manage existing projects ({projects.length} total)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects
          .filter((p) => p && p._id)
          .map((project) => {
            const firstImg =
              project.images?.[0]?.url ||
              (typeof project.images?.[0] === "string" ? project.images[0] : null) ||
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71";

            return (
              <div
                key={project._id}
                className="rounded-2xl overflow-hidden glass-card border border-white/10 flex flex-col justify-between group hover:border-blue-500/40 shadow-xl transition"
              >
                {/* Image */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden">
                  <img
                    src={firstImg}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-emerald-400 border border-emerald-500/30">
                    ₹{project.amount?.toLocaleString("en-IN") || "0"}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md ${
                        project.isActive
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-red-500/20 text-red-300 border-red-500/30"
                      }`}
                    >
                      {project.isActive ? (
                        <>
                          <CheckCircle2 size={10} /> Active
                        </>
                      ) : (
                        <>
                          <XCircle size={10} /> Inactive
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="text-base font-bold text-white mb-1.5 line-clamp-1">
                      {project.title || "Untitled Project"}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                      {project.description || "No description provided"}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {Array.isArray(project.techStack) &&
                        project.techStack.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-blue-300 font-medium border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Links & Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex gap-1.5">
                      {project.liveLink && project.liveLink !== "#" && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-gray-300 hover:text-white border border-white/5 transition"
                          title="Live Demo"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      {project.githubLink && project.githubLink !== "#" && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-gray-300 hover:text-white border border-white/5 transition"
                          title="GitHub Repository"
                        >
                          <Github size={14} />
                        </a>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => selectedproject(project._id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-semibold border border-blue-500/30 transition"
                      >
                        <Edit3 size={13} /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this project?")) {
                            deleteProject(project._id);
                          }
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-semibold border border-red-500/30 transition"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProjectViews;
