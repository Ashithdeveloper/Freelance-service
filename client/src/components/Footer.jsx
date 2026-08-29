import { ArrowUp, Code2, Heart, Github, Linkedin, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-white/10 pt-16 pb-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Code2 className="text-white w-5 h-5" />
              </div>
              <span className="font-black text-xl text-white">
                A4<span className="text-gradient">TechSentinels</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Custom full-stack web and mobile applications engineered with modern technologies, scalable architecture, and cutting-edge 3D interactive design.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a href="#hero" className="hover:text-blue-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition">
                  About & Skills
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition">
                  Services & Pricing
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-400 transition">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition">
                  Contact & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Direct Connect */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-white">
              Get in Touch
            </h4>
            <p className="text-xs text-gray-400">
              Direct: +91 6379351328 • ashithashith593@gmail.com
            </p>
            <div className="flex gap-2 pt-2">
              <a
                href="https://linkedin.com/in/ashith-s-f-141612359"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-white/5 hover:border-blue-500 text-gray-400 hover:text-white transition"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://github.com/Ashithdeveloper"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-white/5 hover:border-blue-500 text-gray-400 hover:text-white transition"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.instagram.com/a4_tech_sentinels"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-white/5 hover:border-blue-500 text-gray-400 hover:text-white transition"
              >
                <Instagram size={16} />
              </a>
              <a
                href="mailto:ashithashith593@gmail.com"
                className="p-2.5 rounded-xl bg-slate-900 border border-white/5 hover:border-blue-500 text-gray-400 hover:text-white transition"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} A4-TechSentinels. Handcrafted with</span>
            <Heart size={12} className="text-red-500 fill-red-500" />
            <span>in Tamil Nadu, India.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-blue-500/40 text-gray-300 hover:text-white transition text-xs"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
