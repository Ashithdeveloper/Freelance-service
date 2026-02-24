import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">A4-TechSentinels</h1>

        <ul className="hidden md:flex gap-8 font-medium">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        <Menu className="md:hidden" />
      </div>
    </nav>
  );
};

export default Navbar;
