import React, { useState, useRef, useEffect } from "react";
import { uploadToCloudinary } from "../service/imageservice";
import useDataStore from "../../Zustand/datahandle";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import {
  Globe,
  Image as ImageIcon,
  Sparkles,
  Eye,
  CheckCircle2,
  Layers,
  Briefcase,
  FolderKanban,
  Save,
  Trash2,
} from "lucide-react";

const WebContent = () => {
  const addWebContent = useDataStore((state) => state.addWebContent);
  const webContent = useDataStore((state) => state.webcontent);
  const projects = useDataStore((state) => state.projects);
  const services = useDataStore((state) => state.services);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const fileInputRef = useRef(null);

  const existingImages = webContent?.heroSection?.images || [];

  const [title, setTitle] = useState(
    () => webContent?.heroSection?.title || "I Build Modern Web Applications"
  );
  const [aboutTitle, setAboutTitle] = useState(
    () => webContent?.aboutSection?.aboutTitle || "Full Stack Developer"
  );
  const [aboutDescription, setAboutDescription] = useState(
    () =>
      webContent?.aboutSection?.aboutDescription ||
      "We design and develop scalable web and mobile applications, admin dashboards, and custom business solutions using the MERN stack."
  );

  const [images, setImages] = useState(existingImages);
  const [previews, setPreviews] = useState(
    existingImages.map((img) => img.url)
  );

  useEffect(() => {
    if (webContent) {
      if (webContent.heroSection?.title) setTitle(webContent.heroSection.title);
      if (webContent.aboutSection?.aboutTitle) setAboutTitle(webContent.aboutSection.aboutTitle);
      if (webContent.aboutSection?.aboutDescription)
        setAboutDescription(webContent.aboutSection.aboutDescription);

      const existingImgs = webContent.heroSection?.images || [];
      setImages(existingImgs);
      setPreviews(existingImgs.map((img) => img.url));
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
          newFiles.map((file) => uploadToCloudinary(file))
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

      await addWebContent(finalData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Web Content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Welcome & Analytics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-blue-500/20 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">Active Projects</p>
            <h4 className="text-2xl font-black text-white mt-1">
              {Array.isArray(projects) ? projects.length : 8}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <FolderKanban size={20} />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-purple-500/20 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">Services Offered</p>
            <h4 className="text-2xl font-black text-white mt-1">
              {Array.isArray(services) ? services.length : 5}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Briefcase size={20} />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-emerald-500/20 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">Hero Slides</p>
            <h4 className="text-2xl font-black text-white mt-1">
              {previews.length > 0 ? previews.length : 1}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ImageIcon size={20} />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">System Status</p>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Online & Synced
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Globe size={20} />
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="rounded-3xl glass-panel-glow border border-white/10 overflow-hidden">
        {/* Header & Tabs */}
        <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950/40">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Sparkles size={14} />
              <span>Landing Page Configuration</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              Hero & About Section Manager
            </h2>
          </div>

          <div className="flex p-1 rounded-xl bg-slate-900 border border-white/10">
            <button
              onClick={() => setActiveTab("editor")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === "editor"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === "preview"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Eye size={13} />
              Live Preview
            </button>
          </div>
        </div>

        {activeTab === "editor" ? (
          <form onSubmit={onSubmit} className="p-6 sm:p-8 space-y-8">
            {/* HERO SECTION SETTINGS */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                <Globe size={18} className="text-blue-400" />
                <span>Hero Section Headline & Backgrounds</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Main Hero Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. I Build Modern Web & Mobile Applications"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                {/* Hero Images Upload */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Hero Slide Images
                  </label>

                  <div className="border-2 border-dashed border-white/10 hover:border-blue-500/50 rounded-2xl p-6 text-center bg-slate-900/40 transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      className="hidden"
                      id="heroImageUpload"
                    />
                    <label
                      htmlFor="heroImageUpload"
                      className="cursor-pointer flex flex-col items-center gap-2 text-gray-400 hover:text-blue-300"
                    >
                      <ImageIcon size={28} className="text-blue-400" />
                      <span className="text-xs font-semibold">
                        Click to upload slide images (JPG, PNG, WebP)
                      </span>
                    </label>
                  </div>

                  {/* Previews Grid */}
                  {previews.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {previews.map((img, index) => (
                        <div
                          key={index}
                          className="relative group rounded-xl overflow-hidden aspect-video border border-white/10 bg-slate-900"
                        >
                          <img
                            src={img}
                            alt="slide preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white opacity-0 group-hover:opacity-100 transition shadow-lg"
                            title="Remove image"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ABOUT SECTION SETTINGS */}
            <div className="space-y-5 pt-4 border-t border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                <Layers size={18} className="text-purple-400" />
                <span>About Me Section</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    About Subtitle / Role Heading
                  </label>
                  <input
                    type="text"
                    required
                    value={aboutTitle}
                    onChange={(e) => setAboutTitle(e.target.value)}
                    placeholder="e.g. Full Stack Developer & Cloud Architect"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    About Bio & Summary Description
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={aboutDescription}
                    onChange={(e) => setAboutDescription(e.target.value)}
                    placeholder="Describe your freelance background, strengths, technologies..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/25 transition transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <BeatLoader size={6} color="#fff" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Web Content</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* LIVE PREVIEW MOCKUP */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-950 border border-white/10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-slate-950 pointer-events-none" />
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                  Live Hero Mockup
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                  {title}
                </h1>
                <p className="text-gray-400 text-sm">{aboutDescription}</p>
                <div className="flex justify-center gap-3 pt-2">
                  <span className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-500/30">
                    Explore Projects
                  </span>
                  <span className="px-5 py-2 rounded-xl bg-slate-800 text-gray-300 text-xs font-bold border border-white/10">
                    Cost Estimator
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebContent;
