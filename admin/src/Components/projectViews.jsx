import useDataStore from "../../Zustand/datahandle";

const ProjectViews = () => {
    const projects = useDataStore((state) => state.projects);
    const deleteProject = useDataStore((state) => state.deleteProject);
  console.log("Projects", projects);
  
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No Projects Available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14 text-gray-800">
          My Projects
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
            >
              {/* Project Image */}
              {project.images?.length > 0 && (
                <img
                  src={project.images[0].url || project.images[0]}
                  alt={project.title}
                  className="h-52 w-full object-cover"
                />
              )}

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack?.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-black text-white px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Price + Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-gray-800">
                    ₹{project.amount}
                  </span>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      project.isActive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {project.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Buttons */}
                <div className="mt-auto flex gap-3">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition"
                    >
                      Live
                    </a>
                  )}

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center border border-black text-black py-2 rounded-lg text-sm hover:bg-black hover:text-white transition"
                    >
                      GitHub
                    </a>
                  )}
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this project?",
                        )
                      ) {
                        deleteProject(project._id);
                      }
                    }}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectViews;
