import React, { useState } from "react";
import { uploadToCloudinary } from "../service/imageservice";
import ProjectViews from "../Components/projectViews";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import useDataStore from "../../Zustand/datahandle";
import {
  FolderPlus,
  Image as ImageIcon,
  Link as LinkIcon,
  Github,
  CheckCircle2,
  Trash2,
  Sparkles,
  X,
} from "lucide-react";

const Projects = () => {
  const projects = useDataStore((state) => state.projects);
  const editProject = useDataStore((state) => state.editProject);
  const addProject = useDataStore((state) => state.addProject);

  const [isEditingProject, setIsEditingProject] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    images: [],
    liveLink: "",
    githubLink: "",
    amount: "",
    type: "webapp",
    isActive: true,
  });

  const [previewImages, setPreviewImages] = useState([]);

  // SELECT PROJECT FOR EDIT
  const selectedproject = (id) => {
    setIsEditingProject(id);
    const editing = projects.find((p) => p._id === id);
    if (!editing) return;

    setPreviewImages(editing.images || []);
    setFormData({
      title: editing.title || "",
      description: editing.description || "",
      techStack: Array.isArray(editing.techStack) ? editing.techStack.join(", ") : "",
      images: [],
      liveLink: editing.liveLink || "",
      githubLink: editing.githubLink || "",
      amount: editing.amount || "",
      type: editing.type || "webapp",
      isActive: editing.isActive !== undefined ? editing.isActive : true,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // CANCEL EDIT
  const cancel = () => {
    setIsEditingProject("");
    setFormData({
      title: "",
      description: "",
      techStack: "",
      images: [],
      liveLink: "",
      githubLink: "",
      amount: "",
      type: "webapp",
      isActive: true,
    });
    setPreviewImages([]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles],
    }));

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImages = [];

      if (formData.images.length > 0) {
        uploadedImages = await Promise.all(
          formData.images.map((file) => uploadToCloudinary(file))
        );
      }

      const existingKept = previewImages
        .filter((img) => typeof img !== "string" && img?.url)
        .map((img) => ({ url: img.url, _id: img._id }));

      const finalImages = [...existingKept, ...uploadedImages];

      const dataToSend = {
        title: formData.title,
        description: formData.description,
        techStack: formData.techStack
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
        liveLink: formData.liveLink,
        githubLink: formData.githubLink,
        amount: Number(formData.amount) || 0,
        type: formData.type,
        isActive: formData.isActive,
        images: finalImages.length > 0 ? finalImages : previewImages,
      };

      if (isEditingProject) {
        await editProject(isEditingProject, dataToSend);
      } else {
        await addProject(dataToSend);
      }

      cancel();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong saving the project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Project Form Card */}
      <div className="rounded-3xl glass-panel-glow border border-white/10 p-6 sm:p-10 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Sparkles size={14} />
              <span>Portfolio Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {isEditingProject ? "Edit Project Details" : "Publish New Project"}
            </h2>
          </div>
          {isEditingProject && (
            <button
              onClick={cancel}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 text-gray-300 hover:text-white text-xs border border-white/10"
            >
              <X size={14} /> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. AI-Powered CRM Dashboard"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* Category / Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Category
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="webapp">Web Application</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="saas">SaaS Platform</option>
                <option value="crm">CRM & ERP System</option>
                <option value="mobile">Mobile App</option>
                <option value="realestate">Real Estate & Portals</option>
                <option value="healthcare">Healthcare & Hospital</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Project Base Price (₹)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="e.g. 35000"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Tech Stack (Comma Separated)
              </label>
              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                placeholder="React, Next.js, Node.js, Tailwind, MongoDB"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Project Description *
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Detailed description of features, architecture, problems solved..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Screenshots & Mockups
            </label>

            <div className="border-2 border-dashed border-white/10 hover:border-blue-500/50 rounded-2xl p-6 text-center bg-slate-900/40 transition">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer flex flex-col items-center gap-2 text-gray-400 hover:text-blue-300"
              >
                <ImageIcon size={28} className="text-blue-400" />
                <span className="text-xs font-semibold">
                  Click to upload project screenshots (Multiple allowed)
                </span>
              </label>
            </div>

            {/* Preview Thumbnails */}
            {previewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {previewImages.map((img, index) => {
                  const url = typeof img === "object" ? img.url : img;
                  return (
                    <div
                      key={index}
                      className="relative group rounded-xl overflow-hidden aspect-video border border-white/10 bg-slate-900"
                    >
                      <img
                        src={url}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white opacity-0 group-hover:opacity-100 transition shadow-lg"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* External Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Live Deployment URL
              </label>
              <input
                type="text"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
                placeholder="https://myproject.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                GitHub Repository URL
              </label>
              <input
                type="text"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                placeholder="https://github.com/user/repo"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Active Status Checkbox */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <input
              type="checkbox"
              id="isActiveToggle"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-white/20 focus:ring-blue-500"
            />
            <label htmlFor="isActiveToggle" className="text-xs font-medium text-gray-200 cursor-pointer">
              Visible on Public Portfolio
            </label>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-white/10 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/30 transition transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <BeatLoader size={6} color="#fff" />
              ) : isEditingProject ? (
                "Update Project"
              ) : (
                "Publish Project"
              )}
            </button>

            {isEditingProject && (
              <button
                type="button"
                onClick={cancel}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 font-semibold text-xs transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Project Views List */}
      <ProjectViews selectedproject={selectedproject} />
    </div>
  );
};

export default Projects;
