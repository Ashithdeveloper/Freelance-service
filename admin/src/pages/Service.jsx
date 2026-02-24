import React, { useState } from "react";

const serviceOptions = [
  "E-Commerce",
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "SEO Optimization",
  "Cloud Services",
  "Other",
];

const Service = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    type: "",
    customType: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalType =
      formData.type === "Other" ? formData.customType : formData.type;

    const finalData = {
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      type: finalType,
      isActive: formData.isActive,
    };

    console.log("Service Data:", finalData);

    // 👉 Call your API here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Add New Service</h2>

        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Service Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter service title"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter service description"
            rows="4"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            required
          />
        </div>

        {/* Service Type */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Service Category
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            required
          >
            <option value="">Select Service Type</option>
            {serviceOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Service Type */}
        {formData.type === "Other" && (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Custom Service Name
            </label>
            <input
              type="text"
              name="customType"
              value={formData.customType}
              onChange={handleChange}
              placeholder="Enter custom service type"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>
        )}

        {/* Icon URL */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Icon URL
          </label>
          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="Enter icon URL"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
          />
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

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition font-medium"
        >
          Save Service
        </button>
      </form>
    </div>
  );
};

export default Service;
