import React, { useState, useEffect } from "react";
import useDataStore from "../../Zustand/datahandle";
import {
  PhoneCall,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Github,
  Youtube,
  Plus,
  Trash2,
  Save,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const Contact = () => {
  const webContact = useDataStore((state) => state.webContact);
  const updateWebContact = useDataStore((state) => state.updateWebContact);

  const [formData, setFormData] = useState({
    phoneNumbers: [{ label: "Freelance", number: "+91 6379351328" }],
    emails: [{ label: "Business", email: "ashithashith593@gmail.com" }],
    address: "kanniyakumari tamil nadu, India",
    socialMedia: {
      instagram: "https://www.instagram.com/a4_tech_sentinels",
      linkedin: "linkedin.com/in/ashith-s-f-141612359",
      twitter: "",
      github: "https://github.com/Ashithdeveloper",
      youtube: "",
    },
    mapLink: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (webContact) {
      setFormData({
        phoneNumbers:
          webContact.phoneNumbers && webContact.phoneNumbers.length > 0
            ? webContact.phoneNumbers
            : [{ label: "Freelance", number: "+91 6379351328" }],
        emails:
          webContact.emails && webContact.emails.length > 0
            ? webContact.emails
            : [{ label: "Business", email: "ashithashith593@gmail.com" }],
        address: webContact.address || "kanniyakumari tamil nadu, India",
        socialMedia: {
          instagram: webContact.socialMedia?.instagram || "",
          linkedin: webContact.socialMedia?.linkedin || "",
          twitter: webContact.socialMedia?.twitter || "",
          github: webContact.socialMedia?.github || "",
          youtube: webContact.socialMedia?.youtube || "",
        },
        mapLink: webContact.mapLink || "",
      });
    }
  }, [webContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value,
      },
    }));
  };

  // Phone Handlers
  const handlePhoneChange = (index, field, value) => {
    const updated = [...formData.phoneNumbers];
    updated[index][field] = value;
    setFormData({ ...formData, phoneNumbers: updated });
  };

  const addPhone = () => {
    setFormData({
      ...formData,
      phoneNumbers: [...formData.phoneNumbers, { label: "Support", number: "" }],
    });
  };

  const removePhone = (index) => {
    setFormData({
      ...formData,
      phoneNumbers: formData.phoneNumbers.filter((_, i) => i !== index),
    });
  };

  // Email Handlers
  const handleEmailChange = (index, field, value) => {
    const updated = [...formData.emails];
    updated[index][field] = value;
    setFormData({ ...formData, emails: updated });
  };

  const addEmail = () => {
    setFormData({
      ...formData,
      emails: [...formData.emails, { label: "General", email: "" }],
    });
  };

  const removeEmail = (index) => {
    setFormData({
      ...formData,
      emails: formData.emails.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateWebContact(formData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div className="rounded-3xl glass-panel-glow border border-white/10 p-6 sm:p-10 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Sparkles size={14} />
              <span>Contact Channels</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Public Contact & Social Channels
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
              <MapPin size={14} className="text-emerald-400" />
              <span>Office / Freelance Location</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. Kanniyakumari, Tamil Nadu, India"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 transition"
              required
            />
          </div>

          {/* Phone Numbers */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                <PhoneCall size={14} className="text-emerald-400" />
                <span>Phone Numbers & WhatsApp</span>
              </label>
              <button
                type="button"
                onClick={addPhone}
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <Plus size={14} /> Add Phone
              </button>
            </div>

            <div className="space-y-2">
              {formData.phoneNumbers.map((phone, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={phone.label}
                    onChange={(e) => handlePhoneChange(idx, "label", e.target.value)}
                    placeholder="Label (e.g. WhatsApp, Office)"
                    className="w-1/3 px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={phone.number}
                    onChange={(e) => handlePhoneChange(idx, "number", e.target.value)}
                    placeholder="Phone number with country code"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs"
                    required
                  />
                  {formData.phoneNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePhone(idx)}
                      className="p-2.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Emails */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                <Mail size={14} className="text-blue-400" />
                <span>Email Addresses</span>
              </label>
              <button
                type="button"
                onClick={addEmail}
                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold"
              >
                <Plus size={14} /> Add Email
              </button>
            </div>

            <div className="space-y-2">
              {formData.emails.map((em, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={em.label}
                    onChange={(e) => handleEmailChange(idx, "label", e.target.value)}
                    placeholder="Label (e.g. Business, Support)"
                    className="w-1/3 px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="email"
                    value={em.email}
                    onChange={(e) => handleEmailChange(idx, "email", e.target.value)}
                    placeholder="name@domain.com"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs"
                    required
                  />
                  {formData.emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmail(idx)}
                      className="p-2.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <label className="block text-xs font-semibold text-gray-300">
              Social Media Handles & Links
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0">
                  <Instagram size={16} />
                </div>
                <input
                  type="text"
                  name="instagram"
                  value={formData.socialMedia.instagram}
                  onChange={handleSocialChange}
                  placeholder="Instagram URL"
                  className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                  <Linkedin size={16} />
                </div>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={handleSocialChange}
                  placeholder="LinkedIn URL"
                  className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-slate-700/50 text-gray-300 flex items-center justify-center shrink-0">
                  <Github size={16} />
                </div>
                <input
                  type="text"
                  name="github"
                  value={formData.socialMedia.github}
                  onChange={handleSocialChange}
                  placeholder="GitHub URL"
                  className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                  <Twitter size={16} />
                </div>
                <input
                  type="text"
                  name="twitter"
                  value={formData.socialMedia.twitter}
                  onChange={handleSocialChange}
                  placeholder="Twitter URL"
                  className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/25 transition transform hover:scale-[1.01]"
            >
              <Save size={16} />
              <span>{isSaving ? "Updating Contact..." : "Save Contact Info"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
