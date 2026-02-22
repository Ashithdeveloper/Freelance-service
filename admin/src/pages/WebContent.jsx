import React, { useState, useRef } from "react";

const WebContent = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);

  // Handle Image Change
  const handleImageChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setImage(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  // Remove Image
  const handleRemoveImage = () => {
    setImage(null);
    setPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-10 space-y-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Web Content Management
        </h2>

        {/* HERO SECTION */}
        <div className="space-y-6 border-b pb-8">
          <h3 className="text-xl font-semibold text-gray-700">Hero Section</h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Hero Title */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Hero Title
              </label>
              <input
                type="text"
                placeholder="Enter hero title"
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Hero Image
              </label>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-black transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                  id="heroImage"
                />
                <label
                  htmlFor="heroImage"
                  className="cursor-pointer text-gray-500"
                >
                  Click to upload image
                </label>
              </div>

              {/* Image Preview */}
              {preview && (
                <div className="mt-4 space-y-3">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl shadow"
                  />

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700">About Section</h3>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              About Title
            </label>
            <input
              type="text"
              placeholder="Enter about title"
              className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              About Content
            </label>
            <textarea
              rows="4"
              placeholder="Enter about content"
              className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-black outline-none resize-none"
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="pt-6 border-t">
          <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition font-medium">
            Save Web Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebContent;
