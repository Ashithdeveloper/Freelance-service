import { useState } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Send,
  User,
  Mail,
  Phone,
} from "lucide-react";
import confetti from "canvas-confetti";
import axios from "axios";
import { API } from "../Data/webData";

const PROJECT_TYPES = [
  { id: "webapp", name: "Custom Web Application", basePrice: 25000, baseDays: 14 },
  { id: "ecommerce", name: "E-Commerce Store & Admin", basePrice: 30000, baseDays: 18 },
  { id: "saas", name: "SaaS / Subscription Platform", basePrice: 35000, baseDays: 21 },
  { id: "mobile", name: "Mobile App (React Native)", basePrice: 30000, baseDays: 16 },
  { id: "crm", name: "Custom CRM / ERP Portal", basePrice: 40000, baseDays: 25 },
  { id: "landing", name: "Modern High-Converting Website", basePrice: 15000, baseDays: 7 },
];

const FEATURES = [
  { id: "auth", name: "Authentication & Role-Based Access", price: 4000, days: 2 },
  { id: "payment", name: "Payment Gateway (Razorpay/Stripe)", price: 5000, days: 3 },
  { id: "dashboard", name: "Advanced Admin Analytics Dashboard", price: 7000, days: 4 },
  { id: "ai", name: "AI Assistant / LLM Integration", price: 9000, days: 4 },
  { id: "three_d", name: "3D Animations & Interactive Three.js", price: 6000, days: 3 },
  { id: "chat", name: "Real-time Messaging / WebSockets", price: 6000, days: 3 },
  { id: "seo", name: "SEO Optimization & Performance 99+", price: 3000, days: 1 },
];

const CostEstimatorModal = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]);
  const [selectedFeatures, setSelectedFeatures] = useState(["auth", "dashboard"]);
  const [isRush, setIsRush] = useState(false);

  // Client Details Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleFeature = (id) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculations
  const featuresTotal = selectedFeatures.reduce((acc, fId) => {
    const feat = FEATURES.find((f) => f.id === fId);
    return acc + (feat ? feat.price : 0);
  }, 0);

  const featuresDays = selectedFeatures.reduce((acc, fId) => {
    const feat = FEATURES.find((f) => f.id === fId);
    return acc + (feat ? feat.days : 0);
  }, 0);

  const rawTotal = selectedType.basePrice + featuresTotal;
  const rawDays = selectedType.baseDays + featuresDays;

  const estimatedPrice = isRush ? Math.round(rawTotal * 1.25) : rawTotal;
  const estimatedDays = isRush ? Math.max(5, Math.round(rawDays * 0.65)) : rawDays;

  const featureNames = selectedFeatures
    .map((id) => FEATURES.find((f) => f.id === id)?.name)
    .filter(Boolean);

  // Save Quote to Backend Database
  const saveQuoteToBackend = async (actionType = "whatsapp") => {
    if (!clientName || !clientEmail) {
      alert("Please enter your Name and Email so we can save your quote estimate!");
      return false;
    }

    setIsSubmitting(true);

    try {
      if (API) {
        await axios.post(`${API}/api/inquiry`, {
          name: clientName,
          email: clientEmail,
          phone: clientPhone || "",
          serviceType: selectedType.name,
          features: featureNames,
          budget: `₹${estimatedPrice.toLocaleString("en-IN")}`,
          timeline: `${estimatedDays} days ${isRush ? "(Priority Express)" : ""}`,
          estimatedPrice,
          estimatedDays,
          source: actionType === "whatsapp" ? "quote_estimator_whatsapp" : "quote_estimator_direct",
          message: `Calculated quote estimate for ${selectedType.name} with features: ${featureNames.join(", ")}.`,
        });
      }
    } catch (error) {
      console.warn("Could not reach backend API, proceeding:", error.message);
    } finally {
      setIsSubmitting(false);
    }

    return true;
  };

  const handleInquireWhatsApp = async () => {
    const saved = await saveQuoteToBackend("whatsapp");
    if (!saved) return;

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
    });

    const text = encodeURIComponent(
      `Hello Ashith! I used your Interactive Cost Estimator on your portfolio:\n\n` +
      `👤 *Name:* ${clientName}\n` +
      `📧 *Email:* ${clientEmail}\n` +
      (clientPhone ? `📞 *Phone:* ${clientPhone}\n` : "") +
      `📌 *Project Type:* ${selectedType.name}\n` +
      `⚡ *Features:* ${featureNames.join(", ") || "Core setup"}\n` +
      `⏱ *Timeline:* ~${estimatedDays} days ${isRush ? "(Priority Express)" : ""}\n` +
      `💰 *Estimated Budget:* ₹${estimatedPrice.toLocaleString("en-IN")}\n\n` +
      `I'd love to discuss kicking off this project!`
    );

    window.open(`https://wa.me/916379351328?text=${text}`, "_blank");
    setIsSubmitted(true);
  };

  const handleDirectSubmit = async () => {
    const saved = await saveQuoteToBackend("direct");
    if (!saved) return;

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
    });

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden glass-panel">
        {/* Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-blue-950/60 via-purple-950/40 to-slate-950/60 border-b border-white/10 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Sparkles size={15} />
              <span>Interactive Quote Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Configure Your Project
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <X size={22} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Quote Estimate Recorded!
            </h3>
            <p className="text-gray-300 text-sm max-w-md mx-auto">
              Your customized project specifications (Estimated: ₹{estimatedPrice.toLocaleString("en-IN")}) have been saved to Ashith's admin dashboard.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-gray-300 text-xs font-semibold hover:text-white"
              >
                Recalculate Estimate
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-500/30"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Step 1: Select Project Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
                1. Select Project Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type)}
                      className={`
                        text-left p-4 rounded-2xl border transition-all flex justify-between items-center
                        ${
                          isSelected
                            ? "bg-blue-600/20 border-blue-500 ring-1 ring-blue-500/50 text-white shadow-lg shadow-blue-500/10"
                            : "bg-slate-800/40 border-white/5 text-gray-300 hover:bg-slate-800 hover:border-white/20"
                        }
                      `}
                    >
                      <div>
                        <p className="font-semibold text-sm">{type.name}</p>
                        <p className="text-xs text-gray-400">
                          Base: ~{type.baseDays} days
                        </p>
                      </div>
                      <span className="text-xs font-bold text-cyan-400">
                        ₹{type.basePrice.toLocaleString("en-IN")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Add-on Features */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
                2. Select Key Modules & Features
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FEATURES.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`
                        cursor-pointer p-3 rounded-xl border transition-all flex items-center justify-between
                        ${
                          isChecked
                            ? "bg-purple-600/20 border-purple-500/80 text-white"
                            : "bg-slate-800/30 border-white/5 text-gray-400 hover:bg-slate-800"
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? "bg-purple-500 border-purple-400 text-white"
                              : "border-gray-500"
                          }`}
                        >
                          {isChecked && <CheckCircle2 size={12} />}
                        </div>
                        <span className="text-xs font-medium">{feat.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-purple-300">
                        +₹{feat.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Priority Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-white/5">
              <div>
                <p className="text-xs font-semibold text-white">
                  🚀 Priority Express Delivery Mode
                </p>
                <p className="text-[11px] text-gray-400">
                  Compressed delivery timeline with dedicated sprint priority.
                </p>
              </div>
              <button
                onClick={() => setIsRush(!isRush)}
                className={`
                  px-4 py-1.5 rounded-full text-xs font-bold transition
                  ${
                    isRush
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/30"
                      : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                  }
                `}
              >
                {isRush ? "Enabled (+25%)" : "Standard Speed"}
              </button>
            </div>

            {/* Step 4: Client Contact Details for Quote Save */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/10 space-y-3">
              <span className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                3. Your Details (To Save Your Quote Estimate)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="Your Email *"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="WhatsApp Number (Optional)"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Price & Action Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/80 to-purple-950/80 border border-blue-500/30 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  Estimated Investment
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
                    ₹{estimatedPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    (Approx. {estimatedDays} business days)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400">
                  <ShieldCheck size={14} />
                  <span>Includes source code, deployment, & 30 days warranty</span>
                </div>
              </div>

              {/* Dual Contact Options */}
              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleInquireWhatsApp}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-5 py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition transform hover:scale-105 text-xs whitespace-nowrap disabled:opacity-50"
                >
                  <MessageSquare size={16} />
                  <span>Book on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectSubmit}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-gray-200 hover:text-white font-bold px-5 py-3 rounded-xl border border-white/10 transition text-xs whitespace-nowrap disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>Send to Admin</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CostEstimatorModal;
