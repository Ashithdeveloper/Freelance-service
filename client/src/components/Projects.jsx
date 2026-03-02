import { useNavigate } from "react-router-dom";

const Projects = ({ projects }) => {
  const navigate = useNavigate();

  return (
    <section id="projects" className="py-16 sm:py-20 bg-gray-100 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">
          Featured Projects
        </h2>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.isArray(projects) &&
            projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/project/${project._id}`)}
                className="
                  group cursor-pointer 
                  bg-white rounded-2xl overflow-hidden 
                  shadow-md hover:shadow-2xl 
                  transition duration-300
                  hover:-translate-y-2
                "
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={
                      project.images?.[0]?.url ||
                      "https://via.placeholder.com/400"
                    }
                    alt={project.title}
                    className="
                      w-full 
                      h-56 sm:h-64 
                      object-cover 
                      transition duration-500 
                      group-hover:scale-105
                    "
                  />

                  {/* Overlay */}
                  <div
                    className="
                    absolute inset-0 
                    bg-black/40 opacity-0 
                    group-hover:opacity-100 
                    transition 
                    flex items-center justify-center
                  "
                  >
                    <span className="text-white text-lg font-semibold">
                      View Project
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                    {project.description}
                  </p>

                  <p className="text-green-600 font-semibold text-sm">
                    ₹{project.amount}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
