import React, { useState } from "react";

import { uploadToCloudinary } from "../service/imageservice";
import ProjectViews from "../Components/projectViews";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import useDataStore from "../../Zustand/datahandle";

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
    isActive: true,
  });

  const [previewImages, setPreviewImages] = useState([]);

  // ===============================
  // SELECT PROJECT FOR EDIT
  // ===============================
  const selectedproject = (id) => {
    setIsEditingProject(id);

    const editing = projects.find((p) => p._id === id);
    if (!editing) return;

  setPreviewImages(editing.images || []);

  setFormData({
    title: editing.title,
    description: editing.description,
    techStack: editing.techStack.join(","),
    images: [], // only new images here
    liveLink: editing.liveLink,
    githubLink: editing.githubLink,
    amount: editing.amount,
    isActive: editing.isActive,
  });
  };

  // ===============================
  // CANCEL EDIT
  // ===============================
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
      isActive: true,
    });
    setPreviewImages([]);
  };

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ===============================
  // HANDLE IMAGE UPLOAD
  // ===============================
  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles],
    }));

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  // ===============================
  // REMOVE IMAGE
  // ===============================
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ===============================
  // HANDLE SUBMIT (CREATE / UPDATE)
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImages = [];

      
      if (formData.images.length > 0) {
        uploadedImages = await Promise.all(
          formData.images.map((file) => uploadToCloudinary(file)),
        );
      }
      const finalImages = [
        ...previewImages.filter((img) => typeof img !== "string"),
        ...uploadedImages,
      ];

      const dataToSend = {
        title: formData.title,
        description: formData.description,
        techStack: formData.techStack.split(",").map((tech) => tech.trim()),
        liveLink: formData.liveLink,
        githubLink: formData.githubLink,
        amount: formData.amount,
        isActive: formData.isActive,
        images: finalImages,
      };

      if (isEditingProject) {
        editProject(isEditingProject, dataToSend);
      } else {
        addProject(dataToSend);
      }

      cancel();
    } catch (error) {
      console.log("Upload error:", error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          {isEditingProject ? "Edit Project" : "Add New Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Project Title"
            className="w-full border rounded-lg px-4 py-2"
          />

          {/* Amount */}
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Project Amount (₹)"
            className="w-full border rounded-lg px-4 py-2"
          />

          {/* Description */}
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Project Description"
            className="w-full border rounded-lg px-4 py-2"
          />

          {/* Tech Stack */}
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full border rounded-lg px-4 py-2"
          />

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium mb-3 text-gray-700">
              Upload Images
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-black transition">
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer text-gray-600"
              >
                Click to upload or drag images here
              </label>
            </div>
          </div>

          {/* Preview */}
          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previewImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img?.url || img}
                    alt="preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 text-xs opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
              placeholder="Live Link"
              className="w-full border rounded-lg px-4 py-2"
            />

            <input
              type="text"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              placeholder="GitHub Link"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            <label>Active Project</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            {loading ? (
              <BeatLoader size={8} color="#fff" />
            ) : isEditingProject ? (
              "Update Project"
            ) : (
              "Save Project"
            )}
          </button>

          {/* Cancel */}
          {isEditingProject && (
            <button
              type="button"
              onClick={cancel}
              className="w-full bg-red-500 text-white py-3 rounded-xl"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="mt-6">
        <ProjectViews selectedproject={selectedproject} />
      </div>
    </div>
  );
};

export default Projects;
