import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Send, Code2 } from "lucide-react";

const Navbar = ({ onOpenEstimator }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "services", "projects", "reviews", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-8 pt-3 sm:pt-4">
      <div
        className={`max-w-7xl mx-auto rounded-2xl sm:rounded-full transition-all duration-300 px-5 sm:px-8 py-3 flex justify-between items-center ${
          scrolled
            ? "glass-panel-glow bg-slate-950/80 shadow-2xl backdrop-blur-xl border border-white/10"
            : "bg-slate-950/40 backdrop-blur-md border border-white/5"
        }`}
      >
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition">
            <Code2 className="text-white w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-black text-lg sm:text-xl tracking-tight text-white">
              <span>A4</span>
              <span className="text-gradient">TechSentinels</span>
            </div>
            <p className="text-[10px] text-gray-400 tracking-wider uppercase font-medium">
              Full-Stack & 3D Engineering
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenEstimator}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/40 transition hover:scale-105"
          >
            <Sparkles size={14} className="text-cyan-400" />
            Cost Estimator
          </button>

          <a
            href="#contact"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 transition hover:scale-105"
          >
            <Send size={13} />
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onOpenEstimator}
            className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs"
            title="Cost Estimator"
          >
            <Sparkles size={16} />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-slate-800/80 text-gray-200 border border-white/10 hover:text-white"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-3 mx-auto max-w-lg glass-panel-glow bg-slate-950/95 border border-white/10 rounded-2xl p-5 shadow-2xl animate-fade-in">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-blue-600/20 hover:border-l-4 hover:border-blue-500 transition"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenEstimator?.();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold"
            >
              <Sparkles size={15} /> Open Cost Estimator
            </button>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-blue-500/30"
            >
              <Send size={14} /> Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
