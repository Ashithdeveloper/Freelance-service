import React, { useState, useRef, useEffect } from "react";
import { uploadToCloudinary } from "../service/imageservice";
import useDataStore from "../../Zustand/datahandle";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

const WebContent = () => {
  const addWebContent = useDataStore((state) => state.addWebContent);
  const webContent = useDataStore((state) => state.webcontent);
  const [ loading, setLoading ] = useState(false);
  const [ isEditing, setIsEditing ] = useState( webContent?._id ? true : false );
  const fileInputRef = useRef(null);

  const existingImages = webContent?.heroSection?.images || [];

  const [title, setTitle] = useState(
    () => webContent?.heroSection?.title || "",
  );
  const [aboutTitle, setAboutTitle] = useState(
    () => webContent?.aboutSection?.aboutTitle || "",
  );
  const [aboutDescription, setAboutDescription] = useState(
    () => webContent?.aboutSection?.aboutDescription || "",
  );

  const [images, setImages] = useState(existingImages);
  const [previews, setPreviews] = useState(
    existingImages.map((img) => img.url),
  );
  useEffect(() => {
    if (webContent) {
      setTitle(webContent?.heroSection?.title || "");
      setAboutTitle(webContent?.aboutSection?.aboutTitle || "");
      setAboutDescription(webContent?.aboutSection?.aboutDescription || "");

      const existingImages = webContent?.heroSection?.images || [];

      setImages(existingImages);
      setPreviews(existingImages.map((img) => img.url));
      setIsEditing(!!webContent?._id);
    }
  }, [webContent]);

  // IMAGE SELECT
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // REMOVE IMAGE
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));

    if (fileInputRef.current && images.length === 0) {
      fileInputRef.current.value = "";
    }
  };

  // SUBMIT
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let uploadedImages = [];

      const newFiles = images.filter((img) => img instanceof File);
      const existingFiles = images.filter((img) => !(img instanceof File));

      if (newFiles.length > 0) {
        const uploaded = await Promise.all(
          newFiles.map((file) => uploadToCloudinary(file)),
        );

        uploadedImages = [...existingFiles, ...uploaded];
      } else {
        uploadedImages = existingFiles;
      }

      const finalData = {
        id: webContent?._id,
        title,
        aboutTitle,
        aboutDescription,
        images: uploadedImages,
      };

      addWebContent(finalData);
      setLoading(false);
      if(isEditing){
        toast.success("Web Content updated successfully");
        setIsEditing(false);
      }else{
        toast.success("Web Content created successfully");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
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
            {/* HERO TITLE */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Hero Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Hero Images
              </label>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-black transition">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  id="heroImage"
                />

                <label
                  htmlFor="heroImage"
                  className="cursor-pointer text-gray-500"
                >
                  Click to upload images
                </label>
              </div>

              {/* IMAGE PREVIEW */}
              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {previews.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt="preview"
                        className="w-full h-32 object-cover rounded-xl shadow"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
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
              value={aboutTitle}
              onChange={(e) => setAboutTitle(e.target.value)}
              className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              About Content
            </label>

            <textarea
              rows="4"
              value={aboutDescription}
              onChange={(e) => setAboutDescription(e.target.value)}
              className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-black outline-none resize-none"
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="pt-6 border-t">
        { loading ? < BeatLoader/> : <button
          onClick={onSubmit}
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition font-medium"
        >
          {webContent  ? "Update Web Content" : "Save Web Content"}
          
        </button>}
        </div>
      </div>
    </div>
  );
};

export default WebContent;
