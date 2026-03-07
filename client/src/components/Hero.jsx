import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const Hero = ({ hero }) => {
  const images =
    hero?.images?.length > 0
      ? hero.images.map((img) => img.url)
      : ["https://images.unsplash.com/photo-1492724441997-5dc865305da7"];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide effect
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Background Images */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Hero Background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          {hero?.title || "I Build Modern Web Applications"}
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-8">
          Bringing new ideas to life with clean, efficient code and innovative
          solutions — always focused on quality.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="#contact"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold transition duration-300 shadow-lg hover:shadow-blue-500/40"
          >
            Get Started <ArrowRight size={18} />
          </a>

          <a
            href="#projects"
            className="border border-white px-7 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition duration-300"
          >
            View Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
