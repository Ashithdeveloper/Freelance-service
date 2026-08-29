import { useState } from "react";
import webData from "../Data/webData";
import {
  Code,
  LayoutDashboard,
  ShoppingCart,
  Smartphone,
  Settings,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import TiltCard from "./3d/TiltCard";

const ICON_MAP = {
  Code: Code,
  LayoutDashboard: LayoutDashboard,
  ShoppingCart: ShoppingCart,
  Smartphone: Smartphone,
  Settings: Settings,
};

const SERVICE_EXTRAS = {
  "1": {
    features: ["Responsive Mobile-First UI", "SEO & Meta Tags Setup", "Fast CDN & Hosting Integration"],
    starting: "₹15,000",
    badge: "Popular",
  },
  "2": {
    features: ["Role-Based Access Control", "Custom Analytics Charts", "REST API & Real-time WebSockets"],
    starting: "₹25,000",
    badge: "Enterprise",
  },
  "3": {
    features: ["Payment Gateway (Razorpay/Stripe)", "Cart & Order Tracking", "Admin Inventory Dashboard"],
    starting: "₹30,000",
    badge: "High Demand",
  },
  "4": {
    features: ["Cross-Platform iOS & Android", "Offline Data Sync", "Push Notifications & Biometrics"],
    starting: "₹30,000",
    badge: "Mobile",
  },
  "5": {
    features: ["Tailored Business Logic", "Third-Party API Integration", "Dedicated Database Tuning"],
    starting: "₹20,000",
    badge: "Custom",
  },
};

const Services = ({ onOpenEstimator }) => {
  const [selectedService, setSelectedService] = useState(null);

  const services = webData.services || [];

  return (
    <section id="services" className="py-24 px-4 sm:px-6 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            <span>Capabilities & Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            High-Impact <span className="text-gradient">Freelance Services</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4">
            From initial wireframes to production deployment, I provide turnkey development services tailored to your exact product vision.
          </p>
        </div>

        {/* Services Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services
            .filter((s) => s.isActive !== false)
            .map((service) => {
              const Icon = ICON_MAP[service.icon] || Code;
              const extra = SERVICE_EXTRAS[service._id] || {
                features: ["Modern UI/UX", "High Performance", "Clean Architecture"],
                starting: "₹20,000",
                badge: "Custom",
              };

              return (
                <TiltCard key={service._id} maxTilt={8} scale={1.02}>
                  <div className="h-full p-6 sm:p-8 rounded-3xl glass-card border border-white/10 flex flex-col justify-between group hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden">
                    {/* Top Glow Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/15 transition duration-500" />

                    <div>
                      {/* Icon & Badge */}
                      <div className="flex justify-between items-center mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition duration-300 shadow-lg shadow-blue-500/10">
                          <Icon size={26} />
                        </div>
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-blue-300 border border-white/10">
                          {extra.badge}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Feature Checklist */}
                      <ul className="space-y-2 mb-6 text-xs text-gray-300">
                        {extra.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-semibold">
                          Starting From
                        </p>
                        <p className="text-base font-extrabold text-emerald-400">
                          {extra.starting}
                        </p>
                      </div>

                      <button
                        onClick={onOpenEstimator}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-semibold border border-blue-500/30 transition-all duration-200"
                      >
                        <span>Estimate</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
        </div>

        {/* Bottom Banner for Custom Inquiries */}
        <div className="mt-14 p-8 rounded-3xl glass-panel-glow border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Need a Custom Architecture or Tech Consultation?</h4>
              <p className="text-xs sm:text-sm text-gray-400">
                Let's discuss requirements, choose the right tech stack, and structure a custom milestone plan.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenEstimator}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/30 whitespace-nowrap transition transform hover:scale-105"
          >
            Launch Interactive Estimator
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
