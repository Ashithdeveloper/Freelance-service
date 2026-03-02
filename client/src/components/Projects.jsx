import { useState } from "react";
// import webData from "../Data/webData";
import { ExternalLink, Github, X } from "lucide-react";

const Projects = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  console.log("projects", projects);
  ;

  return (
    <section id="projects" className="py-20 bg-gray-100">
      <h2 className="text-4xl text-center font-bold mb-12">Sample Design</h2>

      {/* Project Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {Array.isArray(projects) &&
          projects.map((project) => (
            <div
              key={project._id}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="relative group">
                <img
                  src={
                    project.images?.[0]?.url ||
                    "https://via.placeholder.com/400"
                  }
                  alt={project.title}
                  className="h-64 w-full object-cover"
                />
              </div>
            </div>
          ))}
      </div>

      {/* Modal */}
      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedProject(null);
                setSelectedImageIndex(0);
              }}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            {/* Main Image */}
            <img
              src={
                selectedProject.images?.[selectedImageIndex]?.url ||
                "https://via.placeholder.com/600"
              }
              alt={selectedProject.title}
              className="h-80 w-full object-cover transition-all duration-300"
            />

            {/* Thumbnails */}
            {selectedProject.images?.length > 1 && (
              <div className="flex gap-3 p-4 overflow-x-auto">
                {selectedProject.images.map((img, index) => (
                  <img
                    key={img._id}
                    src={img.url}
                    alt="thumbnail"
                    onClick={() => setSelectedImageIndex(index)}
                    className={`h-20 w-28 object-cover rounded-lg cursor-pointer border-2 transition ${
                      selectedImageIndex === index
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                {selectedProject.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {selectedProject.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.techStack?.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Price */}
              <p className="font-semibold text-green-600 mb-6">
                Starting from ₹{selectedProject.amount}
              </p>

              {/* Links */}
              <div className="flex gap-6">
                {selectedProject.liveLink && (
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-blue-600"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                )}

                {selectedProject.githubLink && (
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-gray-800"
                  >
                    <Github size={18} />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
