import React, { useState } from 'react'

const WebContent = () => {
     const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setImage(file);

    // Create preview URL
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };
  return (
    <div className="space-y-4">
      <div className="">
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Title WebContent
        </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-[50%] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div className="">
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Image WebContent
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-[50%] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="w-[20%] h-[20%] object-cover rounded-lg shadow"
            />
          </div>
        )}
      </div>
      <div className="">
        <label className="block mb-2 text-sm font-medium text-gray-600">
          About Title WebContent
        </label>
        <input
          type="text"
          name="title"
          placeholder="About Title"
          className="w-[50%] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div className="">
        <label className="block mb-2 text-sm font-medium text-gray-600">
          About Content WebContent
        </label>
        <input
          type="text"
          name="title"
          placeholder="About Content"
          className="w-[50%] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
    </div>
  );
}

export default WebContent