import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-800">A4-TechSentinels</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium text-gray-700">
          {navLinks.map((link, i) => (
            <li key={i}>
              <a href={link.href} className="hover:text-blue-600 transition">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Icon */}
        <div className="md:hidden">
          {isOpen ? (
            <X
              size={28}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            />
          ) : (
            <Menu
              size={28}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 font-medium text-gray-700">
          {navLinks.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-600 transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
