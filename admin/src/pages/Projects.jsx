import React, { useState } from "react";

const Projects = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    images: [], // store files here
    liveLink: "",
    githubLink: "",
    amount: "",
    isActive: true,
  });
  console.log(formData.images);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Handle Multiple Image Upload
const handleImageChange = (e) => {
  const newFiles = Array.from(e.target.files);

  setFormData((prev) => ({
    ...prev,
    images: [...prev.images, ...newFiles], // append instead of replace
  }));

  // Add preview for new images
  const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

  setPreviewImages((prev) => [...prev, ...newPreviews]);
};
  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append(
      "techStack",
      JSON.stringify(formData.techStack.split(",").map((tech) => tech.trim())),
    );
    formDataToSend.append("liveLink", formData.liveLink);
    formDataToSend.append("githubLink", formData.githubLink);
    formDataToSend.append("amount", formData.amount);
    formDataToSend.append("isActive", formData.isActive);

    // append multiple images
    formData.images.forEach((file) => {
      formDataToSend.append("images", file);
    });

    console.log("Ready to send:", formDataToSend);

    // 🔥 axios.post("/api/projects", formDataToSend)
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Add New Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2 text-gray-700">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2 text-gray-700">
                Project Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium mb-2 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="text-sm font-medium mb-2 text-gray-700">
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* Image Upload Section */}
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

          {/* Preview Grid */}
          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previewImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
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

          {/* Links Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 text-gray-700">
                Live Link
              </label>
              <input
                type="text"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 text-gray-700">
                GitHub Link
              </label>
              <input
                type="text"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between border-t pt-6">
            <span className="text-sm font-medium text-gray-700">
              Active Project
            </span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-black transition"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition font-medium text-lg"
          >
            Save Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default Projects;
