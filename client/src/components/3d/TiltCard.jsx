import { useState, useRef } from "react";

const TiltCard = ({
  children,
  className = "",
  glare = true,
  maxTilt = 12,
  scale = 1.02,
  ...props
}) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (-1 to 1)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Invert X for natural tilt feel
    const rotateY = mouseX * (maxTilt * 2);
    const rotateX = -mouseY * (maxTilt * 2);

    setTilt({ x: rotateX, y: rotateY });

    if (glare) {
      const glareX = ((e.clientX - rect.left) / width) * 100;
      const glareY = ((e.clientY - rect.top) / height) * 100;
      setGlarePos({ x: glareX, y: glareY, opacity: 0.25 });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      <div
        className="w-full h-full transition-transform duration-200 ease-out preserve-3d"
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(
                2
              )}deg) scale(${scale})`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
        }}
      >
        {children}

        {/* Dynamic Specular Glare Reflection */}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-30"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TiltCard;
