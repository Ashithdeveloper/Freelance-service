import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";

const View = ({ projects }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const project = projects.find((p) => p._id === id);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading project...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10 sm:py-14 lg:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 sm:mb-8 transition text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT: IMAGE GALLERY */}
          <div>
            {/* Main Image */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg bg-white p-3 sm:p-4">
              <div className="flex items-center justify-center bg-gray-100 rounded-xl">
                <img
                  src={
                    project.images?.[selectedImageIndex]?.url ||
                    "https://via.placeholder.com/800"
                  }
                  alt={project.title}
                  className="
        w-full
        h-[280px]
        sm:h-[380px]
        md:h-[450px]
        lg:h-[500px]
        object-contain
        transition-all duration-300
      "
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6 overflow-x-auto pb-2">
              {project.images.map((img, index) => (
                <img
                  key={img._id}
                  src={img.url}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`
        h-16 w-24
        sm:h-20 sm:w-28
        md:h-24 md:w-32
        object-cover
        rounded-xl
        cursor-pointer
        border-2
        shadow-sm
        transition-all duration-200
        hover:scale-105
        ${
          selectedImageIndex === index
            ? "border-blue-600 ring-2 ring-blue-200"
            : "border-gray-200"
        }
      `}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: PROJECT DETAILS */}
          <div className="flex flex-col justify-center">
            <h1
              className="
              text-2xl 
              sm:text-3xl 
              md:text-4xl 
              lg:text-5xl 
              font-bold 
              mb-4 sm:mb-6 
              leading-tight
            "
            >
              {project.title}
            </h1>

            <p
              className="
              text-gray-600 
              text-base 
              sm:text-lg 
              leading-relaxed 
              mb-6 sm:mb-8
            "
            >
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {project.techStack?.map((tech, index) => (
                  <span
                    key={index}
                    className="
                      bg-gray-100 border border-gray-200 
                      px-3 py-1.5 sm:px-4 sm:py-2 
                      rounded-full 
                      text-xs sm:text-sm 
                      font-medium 
                      hover:bg-gray-200 transition
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-green-50 border border-green-200 p-4 sm:p-6 rounded-xl sm:rounded-2xl mb-6 sm:mb-8">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">
                Project Starting Price
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                ₹{project.amount}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex items-center justify-center gap-3
                    bg-blue-600 hover:bg-blue-700
                    text-white 
                    px-6 py-3 sm:px-8 sm:py-4
                    rounded-xl sm:rounded-2xl
                    transition shadow-md
                    text-sm sm:text-base
                  "
                >
                  <ExternalLink size={20} />
                  View Live Demo
                </a>
              )}

              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex items-center justify-center gap-3
                    bg-gray-900 hover:bg-black
                    text-white 
                    px-6 py-3 sm:px-8 sm:py-4
                    rounded-xl sm:rounded-2xl
                    transition shadow-md
                    text-sm sm:text-base
                  "
                >
                  <Github size={20} />
                  View Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default View;
