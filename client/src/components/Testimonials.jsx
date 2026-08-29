import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, CheckCircle2 } from "lucide-react";
import TiltCard from "./3d/TiltCard";

const TESTIMONIALS = [
  {
    name: "Alex Morgan",
    role: "Founder & CEO, SaaSScale",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    content:
      "Ashith exceeded our expectations building our multi-tenant SaaS dashboard. His grasp of Next.js, 3D animations, and clean architecture allowed us to launch our MVP 2 weeks ahead of schedule!",
    rating: 5,
    project: "SaaS Platform",
  },
  {
    name: "David Chen",
    role: "Director of Ops, EduTech Global",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    content:
      "The School Management ERP built by Ashith revolutionized how our institution handles admissions and attendance. Incredible performance, secure database design, and 24/7 responsiveness.",
    rating: 5,
    project: "School ERP System",
  },
  {
    name: "Sarah Jenkins",
    role: "Product Lead, LuxeCommerce",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
    content:
      "Superb work on our e-commerce platform with Razorpay and Stripe integration. The 3D product previews and ultra-fast page load times increased our conversion rates by 38%. Highly recommended!",
    rating: 5,
    project: "Advanced E-Commerce",
  },
  {
    name: "Vikram Rathore",
    role: "Managing Director, PropVibe Real Estate",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    content:
      "Ashith delivered our Real Estate portal with real-time property listings and admin approval workflows. Very professional developer with clear communication throughout all milestones.",
    rating: 5,
    project: "Real Estate Portal",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 relative bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            <span>Client Feedback & Trust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            What Clients Say About <span className="text-gradient">Our Work</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4">
            Honest feedback from founders and technical leaders across web and mobile projects.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <TiltCard maxTilt={6} scale={1.01}>
            <div className="p-8 sm:p-12 rounded-3xl glass-panel-glow border border-white/10 relative overflow-hidden">
              <Quote
                size={90}
                className="absolute top-4 right-6 text-blue-500/10 pointer-events-none"
              />

              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
                <span className="ml-2 text-xs font-bold text-gray-300">5.0 Star Rating</span>
              </div>

              <p className="text-lg sm:text-2xl text-gray-200 font-medium italic leading-relaxed mb-8">
                "{TESTIMONIALS[currentIndex].content}"
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <img
                    src={TESTIMONIALS[currentIndex].avatar}
                    alt={TESTIMONIALS[currentIndex].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/40"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">
                        {TESTIMONIALS[currentIndex].name}
                      </h4>
                      <CheckCircle2 size={16} className="text-blue-400" />
                    </div>
                    <p className="text-xs text-gray-400">
                      {TESTIMONIALS[currentIndex].role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium">
                    {TESTIMONIALS[currentIndex].project}
                  </span>

                  <div className="flex items-center gap-1.5 ml-2">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white transition border border-white/10"
                      aria-label="Previous review"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white transition border border-white/10"
                      aria-label="Next review"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i
                    ? "w-8 bg-blue-500 shadow-md shadow-blue-500/50"
                    : "w-2 bg-slate-700 hover:bg-slate-600"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
