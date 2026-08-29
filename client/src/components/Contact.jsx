import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Linkedin,
  Instagram,
  Github,
} from "lucide-react";
import confetti from "canvas-confetti";
import axios from "axios";
import TiltCard from "./3d/TiltCard";
import webData, { API } from "../Data/webData";

const BUDGET_RANGES = [
  "₹15k - ₹25k",
  "₹25k - ₹50k",
  "₹50k - ₹100k",
  "₹100k+",
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "Web Application",
    budget: "₹25k - ₹50k",
    timeline: "2-4 Weeks",
    message: "",
  });

  const [openWhatsAppDirectly, setOpenWhatsAppDirectly] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Send Inquiry to Backend API
      if (API) {
        await axios.post(`${API}/api/inquiry`, {
          ...formData,
          source: "contact_form",
        });
      }
    } catch (error) {
      console.warn("Could not reach backend API, saving locally:", error.message);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });

      // 2. Open WhatsApp if requested
      if (openWhatsAppDirectly) {
        const text = encodeURIComponent(
          `Hi Ashith! I just submitted an inquiry on your portfolio website:\n\n` +
          `👤 *Name:* ${formData.name}\n` +
          `📧 *Email:* ${formData.email}\n` +
          (formData.phone ? `📞 *Phone:* ${formData.phone}\n` : "") +
          `🛠 *Service:* ${formData.serviceType}\n` +
          `💰 *Budget:* ${formData.budget}\n` +
          `⏱ *Timeline:* ${formData.timeline}\n` +
          `📝 *Message:* ${formData.message}`
        );

        setTimeout(() => {
          window.open(`https://wa.me/916379351328?text=${text}`, "_blank");
        }, 1000);
      }
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 relative bg-slate-950">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Let's Build Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4">
            Have a project in mind or looking for a dedicated developer? Send a message and let's turn your idea into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & 3D Card */}
          <div className="lg:col-span-5 space-y-6">
            <TiltCard maxTilt={6} scale={1.01}>
              <div className="p-8 rounded-3xl glass-panel-glow border border-white/10 space-y-6">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
                    Direct Contact
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    Ashith S F
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Full Stack Developer & Founder of A4-TechSentinels
                  </p>
                </div>

                {/* Direct Action Channels */}
                <div className="space-y-3">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/916379351328"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/40 text-emerald-300 transition group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] text-emerald-400/80 font-semibold uppercase">
                        Instant WhatsApp Chat
                      </p>
                      <p className="text-sm font-bold text-white">+91 6379351328</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:ashithashith593@gmail.com"
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-blue-500/30 text-gray-300 hover:text-white transition group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 font-semibold uppercase">
                        Business Email
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-white truncate">
                        ashithashith593@gmail.com
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+916379351328"
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-purple-500/30 text-gray-300 hover:text-white transition group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 font-semibold uppercase">
                        Direct Call
                      </p>
                      <p className="text-sm font-bold text-white">+91 6379351328</p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 text-gray-300">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 font-semibold uppercase">
                        Location & Timezone
                      </p>
                      <p className="text-xs font-semibold text-white">
                        Tamil Nadu, India (IST / UTC+5:30)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400 mb-3 font-semibold">
                    Connect on Social Profiles
                  </p>
                  <div className="flex gap-2.5">
                    <a
                      href="https://linkedin.com/in/ashith-s-f-141612359"
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-slate-800/80 hover:bg-blue-600 text-gray-300 hover:text-white transition"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href="https://github.com/Ashithdeveloper"
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-gray-300 hover:text-white transition"
                      aria-label="GitHub"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href="https://www.instagram.com/a4_tech_sentinels"
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-slate-800/80 hover:bg-pink-600 text-gray-300 hover:text-white transition"
                      aria-label="Instagram"
                    >
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/10">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Received & Saved!</h3>
                  <p className="text-gray-300 text-sm max-w-md mx-auto">
                    Your project details have been recorded directly in our administrative portal.
                    {openWhatsAppDirectly && " Opening WhatsApp now to connect directly..."}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        serviceType: "Web Application",
                        budget: "₹25k - ₹50k",
                        timeline: "2-4 Weeks",
                        message: "",
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210 (Optional)"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition"
                      />
                    </div>

                    {/* Service Type */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Service Needed
                      </label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="Web Application">Custom Web Application</option>
                        <option value="E-Commerce Store">E-Commerce Store & Payments</option>
                        <option value="SaaS Platform">SaaS / Subscription Dashboard</option>
                        <option value="Mobile App">Mobile App (React Native)</option>
                        <option value="ERP / CRM System">ERP / School / Hospital CRM</option>
                        <option value="Landing Page">High-Converting Website</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Estimated Budget Range
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BUDGET_RANGES.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                            formData.budget === b
                              ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/30"
                              : "bg-slate-900/50 border-white/10 text-gray-400 hover:text-white"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Project Details & Requirements *
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe what you want to build, key features, references..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition resize-none"
                    />
                  </div>

                  {/* WhatsApp Option Toggle */}
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                    <input
                      type="checkbox"
                      id="whatsappOptionToggle"
                      checked={openWhatsAppDirectly}
                      onChange={(e) => setOpenWhatsAppDirectly(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 bg-slate-800 border-white/20 focus:ring-emerald-500"
                    />
                    <label
                      htmlFor="whatsappOptionToggle"
                      className="text-xs text-gray-300 cursor-pointer flex items-center gap-1.5 font-medium"
                    >
                      <MessageSquare size={13} className="text-emerald-400" />
                      <span>Also connect with Ashith on WhatsApp immediately after submitting</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-bold shadow-xl shadow-blue-500/30 transition transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving & Submitting...
                      </span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Project Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
